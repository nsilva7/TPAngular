import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto, Data } from '../productos/producto';

@Injectable()
export class ProductoService {
  private tipos = ['comestibles', 'vestimenta', 'hogar', 'vehiculo'];
  private productosUrl = "https://tarea-fe.firebaseio.com/api/productos.json";
  private lista=[];

  constructor(private http: HttpClient) {

   }

  crearProducto(producto:Producto) {

    const body = {
                  codigo:producto.codigo,
                  nombre:producto.nombre,
                  descripcion:producto.descripcion,
                  precio:producto.precio,
                  fotos: producto.foto,
                  tipo:this.tipos[0],
                  stock:producto.stock
                }
        

    this.http.post(this.productosUrl,body).subscribe();
  }

  listarProductos() {
    this.http.get(this.productosUrl).subscribe(data => {
      let producto:Producto;
      let dat = new Data;
      for(let key in data){
        producto = data[key];
        this.lista.push(producto);
      }
    });
    return this.lista;

  }

}
