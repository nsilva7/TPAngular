import { Injectable } from '@angular/core';
import { Producto,} from '../productos/producto';
import { Carrito, Item } from './carrito';
import { HttpClient } from '@angular/common/http';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class CarritoService {
   private carritosUrl = "https://tarea-fe.firebaseio.com/api/carritos.json";
   private carrito = new Carrito();
   private agregarProductoSource = new Subject<Item>();
   private asignarDueñoSource = new Subject<string>();
   private cambiosSource = new Subject<string>();
   private checkoutSource = new Subject<string>();

   agregarProducto$ = this.agregarProductoSource.asObservable();
   asignarDueño$ = this.asignarDueñoSource.asObservable();
   cambios$ = this.cambiosSource.asObservable();
   checkout$ = this.cambiosSource.asObservable();


  constructor(private http: HttpClient) {
    this.carrito.items = [];
  }

  agregarAlCarrito(item:Item) {
    if(item.producto.stock >= item.cantidad){
      this.agregarProductoSource.next(item);
      this.cambiosSource.next("carrito modificado");
    }else {
      throw new Error('No hay stock suficiente');
    }
  }

  asignarDueño(uid:string) {
    this.asignarDueñoSource.next(uid);
    this.cambiosSource.next("usuario");
  }
  crearCarrito(uid:string) {
      this.carrito.cantidadItems = 0;
      this.carrito.montoTotal= 0;
      this.carrito.usuario = uid;
      this.http.post(this.carritosUrl,this.carrito).subscribe(data => {
        localStorage.setItem("carritoId",JSON.stringify(data));
        localStorage.setItem("carrito",JSON.stringify(this.carrito));
      }
      );
    }

    checkout() {
        this.checkoutSource.next("checkout");
    }

  tieneCarrito(uid:string) {
    this.http.get(this.carritosUrl).subscribe(data => {
      let tiene = false;
      for(let key in data){
        if(data[key].usuario == uid){
          this.carrito = data[key];
          tiene = true;
          localStorage.setItem("carritoId", key);
          localStorage.setItem("carrito",JSON.stringify(this.carrito));
        }
      }
      if(!tiene) {
        this.crearCarrito(uid);
      }
    })

  }

  actualizarCarrito() {
    let key = localStorage.getItem("carritoId");
    let carrito = JSON.parse(localStorage.getItem("carrito"));
    console.log(`https://tarea-fe.firebaseio.com/api/carritos/${key}`);
    this.http.put(`https://tarea-fe.firebaseio.com/api/carritos/${key}.json`,carrito).subscribe();
  }

  vaciarCarrito(carrito:Carrito){
    carrito.cantidadItems= 0;
    while( carrito.items.length != 0) {
      carrito.items.pop();
    }
    carrito.montoTotal = 0;
    console.log(carrito);
    localStorage.setItem("carrito",JSON.stringify(carrito));
      let key = localStorage.getItem("carritoId");
    console.log(`https://tarea-fe.firebaseio.com/api/carritos/${key}`);
    this.http.put(`https://tarea-fe.firebaseio.com/api/carritos/${key}.json`,carrito).subscribe();
  }

}
