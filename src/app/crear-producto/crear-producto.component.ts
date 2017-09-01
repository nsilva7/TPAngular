import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../productos/producto.service';
import { Producto } from '../productos/producto';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css'],
})
export class CrearProductoComponent {
  producto:Producto;
  lista:any;

  constructor(public ps: ProductoService) {
    this.producto = new Producto;
  }

  crear() {
    this.ps.crearProducto(this.producto);
  }



}
