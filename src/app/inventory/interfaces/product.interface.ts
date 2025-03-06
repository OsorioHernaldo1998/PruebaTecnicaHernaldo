export interface Product {
    id:          string;
    nombre:      string;
    descripcion: string;
    precio:      number;
    categoriaId: number;
    estado:      Estado;
}

export enum Estado {
    Deshabilitado = "deshabilitado",
    Habilitado = "habilitado",
}
