import { Component, Input, OnInit, OnChanges } from "@angular/core";
import { Router } from "@angular/router";
import { Estado } from "../../inventory/interfaces/product.interface";
import { AuthService } from "../../auth/pages/services/auth.service";
import { CategoriaElement } from "../../inventory/interfaces/category.interface";
import { CategoryService } from "../../inventory/services/cateogory.service";

@Component({
  selector: 'table-category',
  standalone: false,
  templateUrl: './sharedtable2.component.html'
})
export class SharedTable2Component implements OnInit, OnChanges {

  isAdmin: boolean = false; // Variable para saber si el usuario es admin
  filteredItems: CategoriaElement[] = []; // Aquí guardaremos los productos filtrados

  @Input()
  items: CategoriaElement[] = []; // Los categorias que llegan desde el componente padre

  constructor(
    private router: Router,
    private categoryService: CategoryService, // Servicio de productos
    private authService: AuthService // Servicio de autenticación
  ) {}

  ngOnInit() {
    // Verificamos si el usuario es admin
    this.isAdmin = this.authService.getUserRole() === 'admin';
    // Filtramos los productos al inicializar el componente
    this.filterCategories();
  }

  ngOnChanges() {
    // Filtramos los categorias cada vez que cambian los datos
    this.filterCategories();
  }

  filterCategories() {
    // Si no es admin, filtramos los categors deshabilitados
    this.filteredItems = this.isAdmin
      ? this.items
      : this.items.filter(item => item.estado !== Estado.Deshabilitado);
  }

  goEditCategory(category: CategoriaElement) {
    console.log(category); // Verifica que el
    this.router.navigate(['/inventory/editcategory'], { state: { category } });
  }

  toggleCategoryState(id: string, currentState: Estado, nombre: string) {
    const confirmAction = window.confirm(`¿Estás seguro de deshabilitar la categoria "${nombre}"? Esta acción cambiará su estado.`);

    if (confirmAction) {
      const newState = currentState === Estado.Habilitado ? Estado.Deshabilitado : Estado.Habilitado;

      this.categoryService.updateCategoryState(id, newState).subscribe(
        (updatedcategory) => {
          const product = this.items.find((item) => item.id === id);
          if (product) {
            product.estado = newState;
          }
          this.filterCategories(); // Reaplicamos el filtro después de modificar una categoria
        },
        (error) => {
          console.error('Hubo un error al cambiar el estado de la categoria', error);
        }
      );
    }
  }
}
