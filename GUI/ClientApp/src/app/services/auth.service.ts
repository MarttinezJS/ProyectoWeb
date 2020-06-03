import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) { }

  usuarioAutenticado() {
    if (this.traerToken()) {
      return true;
    } else {
      return false;
    }
  }

  traerToken() {
    return sessionStorage.getItem('token');
  }

  borrarToken() {
    sessionStorage.removeItem('token');
  }

  guardaToken(token: string) {
    sessionStorage.setItem('token', token);
  }
}
