import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../../../interfaces/product.interface';
import { ProductService } from '../../../services/product.service';

@Component({
  standalone: false,
  selector: 'edit-product',
  templateUrl: 'edit-product.component.html'
})
export class EditProductComponent {
  product!: Product;
  editForm!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private productService: ProductService
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.product = navigation?.extras.state?.['product'];

    // Inicializamos el formulario con los valores del producto
    this.editForm = this.fb.group({
      nombre: [this.product?.nombre, [Validators.required, Validators.minLength(3)]],
      descripcion: [this.product?.descripcion, [Validators.required]],
      precio: [this.product?.precio, [Validators.required, Validators.min(0)]],
      // Aseguramos que el estado sea habilitado o deshabilitado
      estado: [this.product?.estado === 'habilitado' ? 'habilitado' : 'deshabilitado', [Validators.required]]
    });
  }

  goToInventory() {
    this.router.navigate(['/inventory']);
  }

  updateProduct() {
    if (this.editForm.invalid) return;

    // Actualizamos el producto con el valor del formulario
    const updatedProduct: Product = {
      ...this.product,
      ...this.editForm.value,
      // Convertimos el estado a 'habilitado' o 'deshabilitado'
      estado: this.editForm.value.estado === 'habilitado' ? 'habilitado' : 'deshabilitado'
    };

    this.productService.updateProduct(updatedProduct).subscribe(() => {
      alert('Producto actualizado con éxito');
      this.router.navigate(['/inventory']);
    });
  }
}
