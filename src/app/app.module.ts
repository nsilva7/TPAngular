import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule }   from '@angular/router';
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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductosComponent,
    CrearProductoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot([
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'productos',
        component: CrearProductoComponent
      }
    ])
  ],
  providers: [AuthService,AngularFireAuth,ProductoService],
  bootstrap: [AppComponent],

})
export class AppModule { }
