export interface GestronRequest {
  status: string;
  data: Data;
}

export interface Data {
  mensaje?: string;
  centro?: Centro;
  centros?: Centro[];
  precio?: Precio;
  precios?: Precio[];
  perfil?: Perfil;
  perfiles?: Perfil[];
  cliente?: Cliente;
  clientes?: Cliente[];
  familia?: Familia;
  familias?: Familia[];
  articulo?: Articulo;
  articulos?: Articulo[];
  impuesto?: Impuesto;
  impuestos?: Impuesto[];
  ticket?: Ticket;
  tickets?: Ticket[];
}


export interface Articulo {
  id: number;
  estado: string;
  nombre: string;
  nombre_corto: string;
  color: string;
  codBarras?: string;
  familia_id?: number;
  familia?: number;
  created_at?: null;
  updated_at?: null;
}

export interface Centro {
  id?: number;
  nombre: string;
  nombre_legal: string;
  nif: string;
  telefono: string;
  direccion: string;
  updated_at?: Date;
  created_at?: Date;
}


export interface Precio {
  id: number;
  precio: number;
  impuesto: Impuesto;
  articulo_id?: number;
  articulo: Articulo;
  created_at?: Date;
  updated_at?: Date;
}

export interface Impuesto {
  id?: number;
  nombre: string;
  nombre_corto: string;
  porcentaje: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface Familia {
  id: number;
  nombre: string;
  centro?: number | Centro;
  centro_id?: number | Centro;
  articulos?: Articulo[];
  created_at?: null;
  updated_at?: null;
}

export interface Perfil {
  id: number;
  nombre: string;
  clave?: number;
  activo?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export interface Cliente {
  id: number;
  nombre: string;
  direccion: string;
  nif: string;
  telefono: string;
  correo: string;
  centro_id?: number;
  nombre_fiscal: string;
  ticketCorreo?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export interface Ticket {
  id: number;
  cliente_id?: number;
  cliente?: Cliente;
  trabajador_id?: number;
  trabajador?: Perfil;
  estado: string;
  tipo: string;
  items: Linea[];
  updated_at?: Date;
  created_at?: Date;
}

export interface Linea {
  id: number;
  estado: string;
  ticket_id?: number;
  trabajador_id?: number;
  precio_id: number;
  precio: number;
}
