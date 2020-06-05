import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {

  desbloquear = false;

  constructor(private router: Router,
              private afAuth: AngularFireAuth,
              private authService: AuthService) { }

  ngOnInit() {
  }

  registrarse() {
    this.router.navigateByUrl('/signin');
  }

  logout() {
    this.afAuth.auth.signOut();
    this.authService.borrarToken();
  }

}
