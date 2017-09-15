import { Component, OnInit } from '@angular/core';
import { Carrito, Item} from '../carrito/carrito';
import { AuthService } from '../login/auth.service';
import * as firebase from 'firebase/app';
import { HttpClient } from '@angular/common/http';
import { CarritoService } from '../carrito/carrito.service';
import { Detalle} from './detalle';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  private carrito:Carrito;
  private detalleProducto = new Detalle();
  private ventasUrl = "https://tarea-fe.firebaseio.com/api/ventas.json";
  constructor(public as:AuthService,private http: HttpClient,private cs: CarritoService) {
    this.carrito = JSON.parse(localStorage.getItem("carrito"));
  }

  ngOnInit() {

  }

  checkout( carrito: Carrito){
    let cabecera = {
      fecha: Date().toLocaleLowerCase(),
    }

    var detalles = [];
    for( let item of this.carrito.items) {

      this.detalleProducto.codigo = item.producto.codigo;
      this.detalleProducto.producto = item.producto.nombre;
      this.detalleProducto.precioUnitario = item.producto.precio;
      this.detalleProducto.cantidad = item.cantidad;
      detalles.push(this.detalleProducto);
    }

    let cuerpo = {
      cabecera: cabecera,
      detalles: detalles,
      total: this.carrito.montoTotal
    }
    this.http.post(this.ventasUrl,cuerpo).subscribe( key => {
      this.cs.vaciarCarrito(this.carrito);
    }
    );
  }

}
