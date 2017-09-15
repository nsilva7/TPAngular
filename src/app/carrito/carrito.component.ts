import { Component, OnInit } from '@angular/core';
import { CarritoService } from './carrito.service';
import { Carrito } from './carrito';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  carrito:Carrito;
  constructor(private service: CarritoService) {
    this.carrito = JSON.parse(localStorage.getItem("carrito"));
  }

  ngOnInit() {
    this.service.asignarDueño$.subscribe(
      usuario => {
        this.carrito.usuario = usuario;
      }
    )

    this.service.agregarProducto$.subscribe(
      item => {
          var flag=false;
          let total = 0;
          let cantidad = 0;
          if(this.carrito.items == undefined) {
            this.carrito.items =[];
          }
          for(let itemCarrito of this.carrito.items){
              if(itemCarrito.producto.codigo == item.producto.codigo) {
                  itemCarrito.cantidad = itemCarrito.cantidad*1 + item.cantidad*1;
                  flag = true;
              }
            }
            if(!flag){
              this.carrito.items.push(item);
            }
          for(let itemCarrito of this.carrito.items){
            total += itemCarrito.producto.precio*itemCarrito.cantidad;
            cantidad += itemCarrito.cantidad*1;
          }
          this.carrito.montoTotal= total;
          this.carrito.cantidadItems= cantidad;
      },
      error => {console.log(error)}
    )

    this.service.cambios$.subscribe( mensaje => {
      console.log(mensaje);
      localStorage.setItem("carrito",JSON.stringify(this.carrito));
      this.service.actualizarCarrito();
    }

    )
  }

}
