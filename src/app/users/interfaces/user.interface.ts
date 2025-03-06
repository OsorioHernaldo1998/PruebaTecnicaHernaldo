export interface UsuarioElement {
  id: number;
  nombre: string;
  correo: string;
  password: string;
  rol: 'admin' | 'usuario'; // Solo puede ser admin o usuario
}
