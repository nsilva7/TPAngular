import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProductoService {
  private tipos = ['comestibles', 'vestimenta', 'hogar', 'vehiculo'];
  private productosUrl = "https://tarea-fe.firebaseio.com/api/productos.json";

  constructor(private http: HttpClient) {

   }

  crearProducto(codigo:string,nombre:string,descripcion:string, precio:number, foto:string,tipo:number,stock:number) {
    const body = {
                  codigo:codigo,
                  nombre:nombre,
                  descripcion:descripcion,
                  precio:precio,
                  foto:foto,
                  tipo:this.tipos[0],
                  stock:stock
                }
    this.http.post(this.productosUrl,body).subscribe();
  }

}
