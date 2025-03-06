import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './users-rounting.module';
import { LayoutPageUsersComponent } from './pages/layout-page-users/layout-page-users.component';
import { ListUsersPageComponent } from './pages/list-users-page/list-users-page.component';

import { RouterModule } from '@angular/router';
import { SharedModule } from "../shared/shared.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewUsersPageComponent } from './pages/new-users-page/new-users-page.component';



@NgModule({
  declarations: [LayoutPageUsersComponent,ListUsersPageComponent,NewUsersPageComponent],
  imports: [
    UserRoutingModule,
    CommonModule,
    RouterModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
]
})
export class UsersModule { }
