import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  standalone: false,
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  login() {
    if (this.email && this.password) {
      this.authService.login(this.email, this.password).subscribe(
        (response) => {
          console.log('Login exitoso', response);
          // Mostrar notificación de éxito
          this.toastr.success('Inicio de sesión exitoso', '¡Bienvenido!');
        },
        (error) => {
          this.errorMessage = 'Error al intentar iniciar sesión. Verifica tus credenciales.';
          // Mostrar notificación de error
          this.toastr.error('Error al intentar iniciar sesión. Verifica tus credenciales.', 'Error');
        }
      );
    } else {
      this.errorMessage = 'Por favor ingresa tu correo y contraseña.';
      // Mostrar notificación de advertencia
      this.toastr.warning('Por favor ingresa tu correo y contraseña.', 'Advertencia');
    }
  }
}
