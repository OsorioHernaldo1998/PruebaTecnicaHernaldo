import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { map, take, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.isAuthenticated().pipe(
      take(1),
      map(isAuthenticated => {
        if (!isAuthenticated) {
          this.router.navigate(['/auth/login']);
          return false;
        }

        const userRole = this.authService.getUserRole();  // Obtener el rol del usuario
        console.log('Rol en AuthGuard:', userRole);  // Imprimir el rol en el guard

        // Verifica si la ruta es /inventory/editproduct o /inventory/editcategory y el rol no es admin
        if (next.url.length > 0 && (next.url[0].path === 'editproduct' || next.url[0].path === 'editcategory') && userRole !== 'admin') {
          this.router.navigate(['/inventory']);  // Redirigir a /inventory si no es admin
          return false;
        }

        // Si es una ruta dentro de /inventory que no es editproduct ni editcategory, permitir acceso
        if (next.url.length > 0 && next.url[0].path === 'inventory' && userRole === 'user') {
          return true; // Permite acceso solo a la vista principal de inventory
        }

        return true; // Permite acceso a todas las demás rutas
      }),
      catchError(() => {
        this.router.navigate(['/auth/login']);
        return of(false);
      })
    );
  }
}
