import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { Admin } from '../components/models/Admin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  administradores: Admin[] = [];

  constructor(private afAuth: AngularFireAuth,
              private db: AngularFirestore) {
    this.traerAdmins();
  }

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

  traerId() {
    return sessionStorage.getItem('id');
  }

  borrarSesion() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('id');
  }

  guardaSesion(token: string, id: string) {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('id', id);
  }

  traerAdmins() {
    this.db.collection('Administradores').valueChanges().subscribe( (rest: Admin[]) => {
      this.administradores = rest;
    });
  }

  verificarAdmin() {
    let isAdmin = false;
    const idUser = this.traerId();
    this.administradores.forEach( admin => {
      if (admin.idUsuario === idUser) {
        return isAdmin = true;
      }
    });
    return isAdmin;
  }
}
