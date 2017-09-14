import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../productos/producto.service'
@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {
  lista = [];
  constructor(public ps: ProductoService) { }

  ngOnInit() {
   
  }

}
