import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../auth/pages/services/auth.service";

@Component({
  standalone: false,
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SideBarComponent implements OnInit {
  isAdminUser: boolean = false;
  menuOpen: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isAdminUser = this.authService.getUserRole() === 'admin';
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  onLogout(): void {
    this.authService.logout();
  }

  closeMenu(): void {
    this.menuOpen = false; // Esto cierra el menú
  }
}
