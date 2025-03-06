import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { catchError, map, Observable, of } from "rxjs";
import { environments } from "../../../../environments/environments";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environments.baseUrl}/usuarios`; // URL de los usuarios

  constructor(private http: HttpClient, private router: Router) {}

  // Método para hacer login
  login(email: string, password: string): Observable<any> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((usuarios) => {
        const usuario = usuarios.find(u => u.correo === email && u.password === password);
        if (usuario) {
          const token = this.generateJWT(usuario);
          this.setSession(token);  // Guardamos el token en el localStorage
          console.log('Token generado:', token);  // Imprimimos el token generado
          this.router.navigate(['/inventory']);  // Redirigimos a la ruta de 'inventory'
          return { token };
        } else {
          throw new Error('Credenciales incorrectas');
        }
      }),
      catchError(() => {
        throw new Error('Error en la autenticación');
      })
    );
  }


  private generateJWT(usuario: any): string {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({
      id: usuario.id,
      nombre: usuario.nombre,
      correo: usuario.correo,
      rol: usuario.rol
    }));
    const signature = btoa('firma-secreta');
    const token = `${header}.${payload}.${signature}`;

    // Mostrar el rol en el token generado
    console.log('Rol en el token:', usuario.rol);
    return token;
  }

  // Método para guardar el token en el localStorage
  setSession(token: string): void {
    localStorage.setItem('token', token);
  }

  // Método para obtener el token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Método para obtener el rol del usuario desde el token
  getUserRole(): string {
    const token = this.getToken();
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1])); // Decodificamos el payload
        return payload?.rol || '';  // Devuelve el rol si está presente
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        return '';
      }
    }
    return '';
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): Observable<boolean> {
    return of(!!this.getToken());
  }

  // Método para cerrar sesión
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }
}
