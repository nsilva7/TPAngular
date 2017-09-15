import { Component, OnInit,Input } from '@angular/core';
import { ProductoService } from '../productos/producto.service';
import { Producto } from '../productos/producto';
import { CarritoService } from '../carrito/carrito.service';
import { Item } from '../carrito/carrito';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})

export class CatalogoComponent implements OnInit {
  private producto:Producto;
  private lista = [];
  private productoActual:Producto;
  private fotoActualModal:string;
  private cantidad:number;

  constructor(public ps:ProductoService,private cs: CarritoService) {
    this.producto = new Producto;
    this.productoActual = new Producto;
  }

  ngOnInit() {
    this.lista = this.ps.listarProductos();
  }
  seleccionarProducto(p:Producto){
    this.productoActual = p;
    this.fotoActualModal = p.foto[0];
  }
  seleccionarFoto(foto: string){
    this.fotoActualModal = foto;
  }

  agregarAlCarrito(p:Producto,cantidad:number) {
    var item = new Item;
    item.producto=p;
    item.cantidad = cantidad;
    this.cs.agregarAlCarrito(item);
  }
}
