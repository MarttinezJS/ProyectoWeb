import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/usuario/login/login.component';
import { SigninComponent } from './components/usuario/signin/signin.component';

export const ROUTES: Routes = [
    { path: 'inicio', component: InicioComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signin', component: SigninComponent },
    { path: '', pathMatch: 'full', component: InicioComponent }
];
