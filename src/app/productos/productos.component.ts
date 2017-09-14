import { Component} from '@angular/core';
import { ProductoService } from '../productos/producto.service';
import { Producto, Data } from '../productos/producto';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent{
  private producto:Producto;
  private data = [];
  private lista=[];
  public source: LocalDataSource;

  settings = { columns: {
    nombre: {
      title:'Nombre',
      type:'text',
      filter: true
    },
    descripcion: {
      title:'Descripcion',
      type:'text',
      filter: true
    },
    precio: {
      title:'Precio',
      type:'text',
      filter: true
      }
    },
    actions: {
      add:false,
      edit:false,
      delete:false
    },
    attr: {
      class: "elementos"
    }
  }
  constructor(public ps:ProductoService) {
    this.producto = new Producto;
    this.source = new LocalDataSource();

  }
  ngOnInit(){
    this.source.load(this.ps.listarProductos());
  }
}
