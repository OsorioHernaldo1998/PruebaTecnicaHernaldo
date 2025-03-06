import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product.interface';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'product',
  templateUrl: './search-by-product.component.html',
})
export class SearchByProductComponent implements OnInit {

  public products: Product[] = [];


  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    // Inicialmente se cargan todos los productos
    this.productService.getProduct().subscribe((m) => {
      this.products = m;
      console.log(this.products); // Ahora se imprimirá después de que los productos se hayan cargado
    });
  }

  goNewProduct( ){
    this.router.navigateByUrl('/inventory/newproduct')
  }

  public searchTerm( value: string){

     this.productService.searchProductByName( value ).subscribe((productos)=> this.products = productos )


  }


}
