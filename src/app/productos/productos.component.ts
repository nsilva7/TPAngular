import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../productos/producto.service';
import { Producto } from '../productos/producto';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
private producto:Producto;
private lista = [];
  constructor(public ps:ProductoService) {
    this.producto = new Producto;
  }

  ngOnInit(){
    this.lista = this.ps.listarProductos();
  }
}
