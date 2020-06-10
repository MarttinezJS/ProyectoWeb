import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../../../services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {

  logeado: boolean;
  id: string;
  constructor(private router: Router,
              private afAuth: AngularFireAuth,
              private authService: AuthService,
              private spinner: NgxSpinnerService) {
    this.verificarSesion();
    spinner.show();
  }

  ngOnInit() {
  }

  registrarse() {
    this.router.navigateByUrl('/signin');
  }

  logout() {
    this.logeado = false;
    this.afAuth.auth.signOut();
    this.authService.borrarSesion();
    this.router.navigateByUrl('/');
  }

  verificarSesion() {
    this.afAuth.authState.subscribe( rest => {
      this.spinner.hide();
      if ( rest ) {
        this.logeado = true;
        this.id = rest.uid;
      } else {
        this.logeado = false;
      }
    });
  }

}
