import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environments } from '../../../environments/environments';
import { CategoriaElement, Estado } from '../interfaces/category.interface'; // Asegúrate de importar Estado

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) {}

  // Obtener todos los productos
  getCategory(): Observable<CategoriaElement[]> {
    return this.http.get<CategoriaElement[]>(`${this.baseUrl}/categorias`);
  }

  // Buscar productos por nombre
  searchCategoryByName(name: string): Observable<CategoriaElement[]> {
    const searchUrl = `${this.baseUrl}/categorias?nombre=${name}`; // Cambié el query para buscar por nombre
    return this.http.get<CategoriaElement[]>(searchUrl);
  }

  postCategory(categoria: CategoriaElement): Observable<CategoriaElement> {
    return this.http.post<CategoriaElement>(`${this.baseUrl}/categorias`, categoria);
  }

  updateCategory(categoria: CategoriaElement): Observable<CategoriaElement> {
    if (!categoria.id) throw Error('El id es obligatorio');
    return this.http.patch<CategoriaElement>(`${this.baseUrl}/categorias/${categoria.id}`, categoria);
  }

  // Actualizar solo el estado de la categoría
  updateCategoryState(id: string, estado: Estado): Observable<CategoriaElement> {
    const categoriaUpdate = { estado }; // Solo actualiza el estado
    return this.http.patch<CategoriaElement>(`${this.baseUrl}/categorias/${id}`, categoriaUpdate);
  }
}
