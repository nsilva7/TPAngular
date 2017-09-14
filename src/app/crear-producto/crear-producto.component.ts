import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../productos/producto.service';
import { Producto } from '../productos/producto';
import { UploadService} from '../uploads/shared/upload.service';
import { Upload } from '../uploads/shared/upload';
import * as _ from "lodash";

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css'],
})
export class CrearProductoComponent {
  producto:Producto;
  lista:any;
  selectedFiles: FileList;
  currentUpload: Upload;

  constructor(public ps: ProductoService, private upSvc: UploadService) {
    this.producto = new Producto;
    this.producto.foto = [];
  }

  crear() {

    this.ps.crearProducto(this.producto);
  }
  detectFiles(event) {
      this.selectedFiles = event.target.files;

      let files = this.selectedFiles
      if (_.isEmpty(files)) return;

      let filesIndex = _.range(files.length)
      _.each(filesIndex, (idx) => {
        this.currentUpload = new Upload(files[idx]);
        this.producto = this.upSvc.pushUpload(this.currentUpload,this.producto);
      }
      )

  }




}
