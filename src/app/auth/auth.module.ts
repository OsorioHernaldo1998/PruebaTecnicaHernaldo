import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

import { AuthRoutingModule } from './auth-routing.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from "../shared/shared.module";
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [LayoutPageComponent ,LoginPageComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    RouterModule,
    SharedModule,
    FormsModule
]
})
export class AuthModule { }
