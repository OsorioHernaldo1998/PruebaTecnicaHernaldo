import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'; // Importamos Toastr
import { Estado, Product } from '../../../interfaces/product.interface';
import { ProductService } from '../../../services/product.service';
import { CategoriaElement } from '../../../interfaces/category.interface';
import { CategoryService } from '../../../services/cateogory.service';

@Component({
  standalone: false,
  selector: 'new-product-component',
  templateUrl: 'new-product.component.html'
})
export class NewProductComponent implements OnInit {

  public Estado = Estado;
  public categories: CategoriaElement[] = [];

  public productForm = new FormGroup({
    id:          new FormControl('', { nonNullable: true }),
    nombre:      new FormControl(''),
    descripcion: new FormControl(''),
    precio:      new FormControl(''),
    categoriaId: new FormControl('', [Validators.required]),
    estado:      new FormControl<Estado>(Estado.Habilitado),
  });

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router,
    private toastr: ToastrService // Inyectamos Toastr
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategory().subscribe({
      next: (categories: any) => {
        this.categories = categories;
      },
      error: (err: any) => {
        console.error('Error al cargar las categorías', err);
        this.toastr.error('Error al cargar categorías', 'Error');
      }
    });
  }

  onSubmit() {
    if (this.productForm.invalid) {
      this.toastr.warning('Completa los campos obligatorios', 'Formulario inválido');
      return;
    }

    const newProduct: Product = {
      id: this.productForm.get('id')?.value || '',
      nombre: this.productForm.get('nombre')?.value || '',
      descripcion: this.productForm.get('descripcion')?.value || '',
      precio: +this.productForm.get('precio')?.value! || 0,
      categoriaId: +this.productForm.get('categoriaId')?.value! || 0,
      estado: this.productForm.get('estado')?.value || Estado.Habilitado
    };

    // Verificar si el producto ya existe
    this.productService.searchProductByName(newProduct.nombre).subscribe((products) => {
      if (products.length > 0) {
        // Si ya existe un producto con el mismo nombre
        this.toastr.error('Ya existe un producto con ese nombre', 'Error');
      } else {
        // Si no existe, proceder a crear el producto
        this.productService.postProduct(newProduct).subscribe({
          next: (response) => {
            console.log('Producto creado:', response);
            this.toastr.success('Producto guardado correctamente', 'Éxito');
            this.productForm.reset();
            this.router.navigate(['/inventory/byproduct']);
          },
          error: (err) => {
            console.error('Error al guardar el producto:', err);
            this.toastr.error('No se pudo guardar el producto', 'Error');
          }
        });
      }
    });
  }

  cancelar() {
    this.toastr.info('Creación de producto cancelada', 'Cancelado');
    this.router.navigate(['/inventory/byproduct']);
  }
}
