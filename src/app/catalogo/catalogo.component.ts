import { Component, OnInit, Input } from '@angular/core';
import { ProductoService } from '../productos/producto.service';
import { Producto } from '../productos/producto';
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
  constructor(public ps:ProductoService) {
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
}
