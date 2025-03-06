import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LayoutPageUsersComponent } from "./pages/layout-page-users/layout-page-users.component";
import { ListUsersPageComponent } from './pages/list-users-page/list-users-page.component';
import { NewUsersPageComponent } from "./pages/new-users-page/new-users-page.component";
import { AuthGuard } from "../auth/pages/services/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: LayoutPageUsersComponent,
    canActivate: [AuthGuard],  // Protegemos la ruta principal
    children: [
      {
        path: 'list',
        component: ListUsersPageComponent,
        canActivate: [AuthGuard],  // Protegemos la ruta hija
      },
      {
        path: 'new',
        component: NewUsersPageComponent,
        canActivate: [AuthGuard],  // Protegemos la ruta hija
      },
      {
        path: '**',
        redirectTo: 'list',  // Redirige a 'list' si no se encuentra la ruta
        pathMatch: 'full'  // Asegura que se haga un match completo con la ruta
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
