import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private route: Router,
              private authService: AuthService) {}

  canActivate(): boolean {
    if ( this.authService.usuarioAutenticado() ) {
      return true;
    } else {
      this.route.navigateByUrl('/Login');
      return false;
    }
  }


}
