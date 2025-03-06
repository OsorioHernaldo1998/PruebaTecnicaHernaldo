export interface CategoriaElement {
    id:          string;
    nombre:      string;
    descripcion: string;
    estado:      Estado;
}

export enum Estado {
    Deshabilitado = "deshabilitado",
    Habilitado = "habilitado",
}

