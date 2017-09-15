import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { Usuario } from '../usuario';
import { CarritoService } from '../carrito/carrito.service';


@Injectable()
export class AuthService {
  user: Observable<firebase.User>;
  constructor(public firebaseAuth:AngularFireAuth,public cs:CarritoService) {
    this.user = firebaseAuth.authState;
  }

  registro(email:string,password:string) {
    this
    .firebaseAuth
    .auth
    .createUserWithEmailAndPassword(email,password)
    .then(value => {

    })
    .catch(err => {
      console.log('Something went wrong:',err.message);
    })
  }

  login(email: string, password: string) {
    this
    .firebaseAuth
    .auth
    .signInWithEmailAndPassword(email, password)
    .then(value => {
      var uid = this.firebaseAuth.auth.currentUser.uid;
      this.cs.tieneCarrito(uid);

    })
    .catch(err => {
      console.log('Something went wrong:',err.message);
    });
  }

  logout() {
    this.firebaseAuth
      .auth
      .signOut();
  }


}
