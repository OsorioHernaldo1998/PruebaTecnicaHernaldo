import { Component, OnInit } from "@angular/core";
import { UsersService } from "../../services/users.service";
import { Router } from "@angular/router";
import { UsuarioElement } from "../../interfaces/user.interface";
import { ToastrService } from "ngx-toastr"; // Importa ToastrService

@Component({
  selector: 'list-usuarios',
  standalone: false,
  templateUrl: './list-users-page.component.html'
})
export class ListUsersPageComponent implements OnInit {

  public users: UsuarioElement[] = [];
  public selectedRoles: { [key: number]: 'admin' | 'usuario' } = {};

  constructor(
    private usersService: UsersService,
    private router: Router,
    private toastr: ToastrService // Inyecta ToastrService
  ) { }

  ngOnInit(): void {
    this.usersService.getUsers().subscribe((users) => {
      // Filtrar para excluir el usuario con id = 1 (admin principal)
      this.users = users.filter(user => user.id !== 1);
      this.initSelectedRoles();
    });
  }

  // Inicializa los valores seleccionados con los roles actuales
  private initSelectedRoles(): void {
    this.users.forEach(user => {
      this.selectedRoles[user.id] = user.rol;
    });
  }

  goNewUser() {
    this.router.navigateByUrl('/users/new');
  }

  searchTerm(value: string): void {
    this.usersService.searchUserByName(value).subscribe((usuarios) => {
      this.users = usuarios.filter(user => user.id !== 1);
      this.initSelectedRoles();
    });
  }

  updateUserRole(user: UsuarioElement): void {
    const newRole = this.selectedRoles[user.id];

    if (newRole === user.rol) return; // Evita enviar si no hay cambios

    const confirmChange = window.confirm(`¿Estás seguro de cambiar el rol de ${user.nombre} a ${newRole}?`);

    if (confirmChange) {
      this.usersService.updateUserRole(user.id, newRole).subscribe({
        next: (updatedUser) => {
          this.toastr.success(`Rol actualizado con éxito a ${updatedUser.rol}`, 'Éxito'); // Toastr de éxito
          user.rol = updatedUser.rol; // Actualiza la UI inmediatamente
        },
        error: () => {
          this.toastr.error('Error al actualizar el rol', 'Error'); // Toastr de error
        }
      });
    }
  }
}
