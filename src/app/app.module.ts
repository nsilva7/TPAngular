import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './login/auth.service';
import { FormsModule }   from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { ProductosComponent } from './productos/productos.component';
import { CrearProductoComponent } from './crear-producto/crear-producto.component';
import { ProductoService } from './productos/producto.service';
import { Producto } from './productos/producto';
import {ColorPickerModule} from 'angular4-color-picker';
import { UploadService } from './uploads/shared/upload.service'
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyD2qjKQxPbLWtI2tnb4U8azGrm_aBrT6C4",
    authDomain: "tarea-fe.firebaseapp.com",
    databaseURL: "https://tarea-fe.firebaseio.com",
    projectId: "tarea-fe",
    storageBucket: "tarea-fe.appspot.com",
    messagingSenderId: "840459743682"
  }
};

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'productos/crear',component: CrearProductoComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'catalogo', component: CatalogoComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductosComponent,
    CrearProductoComponent,
    CatalogoComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot(appRoutes),
    ColorPickerModule,
    AngularFireDatabaseModule,
    Ng2SmartTableModule 
  ],
  providers: [AuthService,AngularFireAuth,ProductoService,UploadService,],
  bootstrap: [AppComponent],

})
export class AppModule { }
