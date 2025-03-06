import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';  // Importar ToastrService
import { CategoriaElement } from '../../../interfaces/category.interface';
import { CategoryService } from '../../../services/cateogory.service';

@Component({
  standalone: false,
  selector: 'edit-category',
  templateUrl: 'edit-category.component.html'
})
export class EditCategoryComponent {
  category!: CategoriaElement;
  editForm!: FormGroup;

  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService  // Inyectar ToastrService
  ) {
    // Obtén la categoría pasada desde la navegación
    const navigation = this.router.getCurrentNavigation();
    this.category = navigation?.extras.state?.['category'];

    // Inicializamos el formulario solo si la categoría existe
    this.editForm = this.fb.group({
      nombre: [this.category?.nombre, [Validators.required, Validators.minLength(3)]],
      descripcion: [this.category?.descripcion, [Validators.required]],
      estado: [this.category?.estado === 'habilitado' ? 'habilitado' : 'deshabilitado', [Validators.required]]
    });
  }

  // Método para redirigir a la lista de categorías
  goToCategories() {
    this.router.navigate(['/inventory/bycategory']);
  }

  // Método para actualizar la categoría
  updateCategory() {
    if (this.editForm.invalid) return;

    const updatedCategory: CategoriaElement = {
      ...this.category,
      ...this.editForm.value
    };

    this.categoryService.updateCategory(updatedCategory).subscribe(
      () => {
        // Notificación de éxito
        this.toastr.success('Categoría actualizada con éxito', '¡Éxito!');
        this.router.navigate(['/inventory/bycategory']);
      },
      (error) => {
        // Notificación de error
        this.toastr.error('Hubo un error al actualizar la categoría', 'Error');
      }
    );
  }
}
