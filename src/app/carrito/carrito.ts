import { Producto} from '../productos/producto';

export class Carrito {
  items:Item[];
  cantidadItems: number;
  montoTotal: number;
  usuario: string;
}

export class Item {
  producto:Producto;
  cantidad: number;
}
