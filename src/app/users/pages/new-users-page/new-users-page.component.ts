import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { UsuarioElement } from '../../interfaces/user.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  standalone: false,
  selector: 'app-create-user',
  templateUrl: './new-users-page.component.html',
})
export class NewUsersPageComponent implements OnInit {
  newUserForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private router: Router,
    private toastr: ToastrService  // Inyectamos el servicio de toastr
  ) {}

  ngOnInit(): void {
    this.newUserForm = this.fb.group({
      nombre: ['', [Validators.required]],  // Campo obligatorio
      correo: ['', [Validators.required, Validators.email]],  // Campo obligatorio y validación de email
      password: ['', [Validators.required]],  // Campo obligatorio
      rol: ['usuario', [Validators.required]],  // Valor por defecto 'usuario', campo obligatorio
    });
  }

  createUser(): void {
    if (this.newUserForm.valid) {
      const newUser: UsuarioElement = this.newUserForm.value;  // Obtener los valores del formulario

      // Verificar si el correo ya existe
      this.usersService.searchUserByEmail(newUser.correo).subscribe((users) => {
        if (users.length > 0) {
          // Si ya existe un usuario con ese correo
          this.toastr.error('Ya existe una cuenta vinculada a este correo', 'Error');
        } else {
          // Si no existe, proceder a crear el usuario
          this.usersService.createUser(newUser).subscribe(
            (user) => {
              this.toastr.success(`Usuario ${user.nombre} creado exitosamente!`, 'Éxito');
              this.router.navigateByUrl('/users/list'); // Redirige a la lista de usuarios
            },
            (error) => {
              console.error('Error al crear el usuario', error);
              this.toastr.error('Hubo un error al crear el usuario', 'Error');
            }
          );
        }
      });
    } else {
      this.toastr.warning('Por favor complete todos los campos correctamente', 'Advertencia');
    }
  }

  cancelar(): void {
    this.toastr.info('Acción cancelada', 'Cancelado');
    this.router.navigateByUrl('/users/list');
  }
}
