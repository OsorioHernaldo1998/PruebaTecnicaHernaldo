import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estado, Product } from '../interfaces/product.interface';
import { environments } from '../../../environments/environments';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) {}

  // Obtener todos los productos
  getProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/productos`);
  }

  // Buscar productos por nombre
  searchProductByName(name: string): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/productos?nombre=${name}`;
    return this.http.get<Product[]>(searchUrl);
  }

  postProduct(producto: Product): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}/productos`, producto);
  }

  updateProduct(producto: Product): Observable<Product> {
    if (!producto.id) throw Error('El id es obligatorio');
    return this.http.patch<Product>(`${this.baseUrl}/productos/${producto.id}`, producto);
  }

  updateProductState(id: string, estado: Estado): Observable<Product> {
    const productUpdate = { estado }; // Solo actualiza el estado
    return this.http.patch<Product>(`${this.baseUrl}/productos/${id}`, productUpdate);
  }
}
