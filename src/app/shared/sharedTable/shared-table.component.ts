import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Product } from "../../inventory/interfaces/product.interface";
import { ProductService } from "../../inventory/services/product.service";
import { Estado } from "../../inventory/interfaces/product.interface";
import { AuthService } from "../../auth/pages/services/auth.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'table-product',
  standalone: false,
  templateUrl: './shared-table.component.html'
})
export class SharedTableComponent implements OnInit {

  isAdmin: boolean = false; // Variable para guardar si el usuario es admin
  filteredItems: Product[] = []; // Aquí guardaremos los productos filtrados

  @Input()
  items: Product[] = []; // Los productos que llegan desde el componente padre

  constructor(
    private router: Router,
    private productService: ProductService,
    private authService: AuthService, // El servicio de autenticación
    private toastr: ToastrService // Inyecta ToastrService
  ) {}

  ngOnInit() {
    // Verificamos si el rol del usuario es admin
    this.isAdmin = this.authService.getUserRole() === 'admin'; // Verificamos si el rol es 'admin'

    // Aseguramos que los productos se carguen en `filteredItems`
    this.filterProducts();
  }

  ngOnChanges() {
    // Cuando cambian los productos, también filtramos
    this.filterProducts();
  }

  filterProducts() {
    // Si no es admin, filtramos los productos deshabilitados
    this.filteredItems = this.isAdmin
      ? this.items
      : this.items.filter(item => item.estado !== Estado.Deshabilitado);
  }

  // Función para navegar a la página de edición del producto
  goEditProduct(product: Product) {
    this.router.navigate(['/inventory/editproduct'], { state: { product } });
  }

  // Función para cambiar el estado de un producto (habilitado/deshabilitado)
  toggleProductState(id: string, currentState: Estado, nombre: string) {
    // Usamos window.confirm para confirmar la acción
    const confirmAction = window.confirm(`¿Estás seguro de cambiar el estado del producto "${nombre}"?`);

    if (confirmAction) {
      const newState = currentState === Estado.Habilitado ? Estado.Deshabilitado : Estado.Habilitado;

      this.productService.updateProductState(id, newState).subscribe(
        (updatedProduct) => {
          const product = this.items.find((item) => item.id === id);
          if (product) {
            product.estado = newState;
          }
          this.filterProducts(); // Reaplicamos el filtro después de modificar un producto
          this.toastr.success('Estado del producto actualizado con éxito', 'Éxito');
        },
        (error) => {
          console.error('Hubo un error al cambiar el estado del producto', error);
          this.toastr.error('Error al cambiar el estado del producto', 'Error');
        }
      );
    } else {
      this.toastr.info('Acción cancelada', 'Cancelada');
    }
  }
}
