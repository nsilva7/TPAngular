import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../productos/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css'],
})
export class CrearProductoComponent {
  codigo:string;
  nombre:string;
  descripcion:string;
  precio:number;
  foto:string;
  tipo:number;
  stock:number;

  constructor(public ps: ProductoService) { }

  crear() {
    this.ps.crearProducto(this.codigo,this.nombre,this.descripcion,this.precio,this.foto,this.tipo,this.stock);
  }


}
