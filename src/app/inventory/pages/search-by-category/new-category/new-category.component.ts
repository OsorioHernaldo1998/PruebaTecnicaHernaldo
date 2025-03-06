import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../../services/cateogory.service';
import { Estado, CategoriaElement } from '../../../interfaces/category.interface';
import { ToastrService } from 'ngx-toastr';  // Importa ToastrService
import { Router } from '@angular/router'; // Importa Router para redirigir

@Component({
  standalone: false,
  selector: 'new-category-name',
  templateUrl: './new-category.component.html'
})
export class NewCategoryComponent implements OnInit {

  public Estado = Estado; // Enum Estado
  // FormGroup para el formulario de categoría
  public categoryForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
    estado: new FormControl(Estado.Habilitado, [Validators.required])
  });

  constructor(
    private categoryService: CategoryService,
    private toastr: ToastrService,  // Inyecta el servicio de Toastr
    private router: Router  // Inyecta el servicio Router
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.categoryForm.invalid) {
      this.toastr.error('Por favor, completa todos los campos obligatorios.', 'Formulario Inválido'); // Muestra un mensaje de error
      return;
    }

    const newCategory: CategoriaElement = {
      id: this.categoryForm.get('nombre')?.value?.toLowerCase().replace(/\s+/g, '-')!, // Genera el id a partir del nombre
      nombre: this.categoryForm.get('nombre')?.value || '',
      descripcion: this.categoryForm.get('descripcion')?.value || '',
      estado: this.categoryForm.get('estado')?.value || Estado.Habilitado
    };

    // Verificar si la categoría ya existe
    this.categoryService.searchCategoryByName(newCategory.nombre).subscribe((categories) => {
      if (categories.length > 0) {
        // Si ya existe una categoría con el mismo nombre
        this.toastr.error('Ya existe una categoría con ese nombre', 'Error');
      } else {
        // Si no existe, proceder a crear la categoría
        this.categoryService.postCategory(newCategory).subscribe({
          next: (response) => {
            this.toastr.success('Categoría guardada exitosamente', 'Éxito'); // Muestra un mensaje de éxito
            this.categoryForm.reset();
            this.router.navigate(['/inventory/bycategory']); // Redirige a /inventory/bycategory después de guardar
          },
          error: (err) => {
            this.toastr.error('Error al guardar la categoría', 'Error'); // Muestra un mensaje de error
            console.error('Error al guardar la categoría:', err);
          }
        });
      }
    });
  }

  onCancel(): void {
    this.toastr.info('Creación de la categoría cancelada', 'Cancelado'); // Muestra un mensaje de cancelación
    this.router.navigate(['/inventory/bycategory']); // Redirige a la ruta /inventory/bycategory
  }
}
