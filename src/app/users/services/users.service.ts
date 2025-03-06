import { Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioElement } from '../interfaces/user.interface';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<UsuarioElement[]> {
    return this.http.get<UsuarioElement[]>(`${this.baseUrl}/usuarios`);
  }

  searchUserByName(name: string): Observable<UsuarioElement[]> {
    const searchUrl = `${this.baseUrl}/usuarios?nombre=${name}`;
    return this.http.get<UsuarioElement[]>(searchUrl);
  }

  // Nuevo método para buscar usuarios por correo
  searchUserByEmail(correo: string): Observable<UsuarioElement[]> {
    const searchUrl = `${this.baseUrl}/usuarios?correo=${correo}`;
    return this.http.get<UsuarioElement[]>(searchUrl);
  }

  updateUserRole(id: number, newRole: 'admin' | 'usuario'): Observable<UsuarioElement> {
    const url = `${this.baseUrl}/usuarios/${id}`;
    return this.http.patch<UsuarioElement>(url, { rol: newRole });
  }

  createUser(newUser: UsuarioElement): Observable<UsuarioElement> {
    const url = `${this.baseUrl}/usuarios`;
    return this.http.post<UsuarioElement>(url, newUser);
  }
}


