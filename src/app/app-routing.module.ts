import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/pages/services/auth.guard';  // Importar el AuthGuard

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'inventory',
    loadChildren: () => import('./inventory/inventory.module').then(m => m.InventoryModule),
    canActivate: [AuthGuard],  // Protegiendo esta ruta con AuthGuard
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
    canActivate: [AuthGuard],  // Protegiendo esta ruta con AuthGuard
  },
  {
    path: '**',
    redirectTo: 'auth/login', // Redirige a la página de login si no está autenticado
    pathMatch: 'full'  // Asegura que el redireccionamiento se haga solo si no se encuentra la ruta
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
