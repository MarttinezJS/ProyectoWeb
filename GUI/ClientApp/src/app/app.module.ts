// Modulos
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AngularFireModule } from 'angularfire2';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { AngularFireStorageModule } from 'angularfire2/storage';

// Providers
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';

// Pipes
import { BusquedaPipe } from './pipes/busqueda.pipe';

// Rutas
import { ROUTES } from './app.routes';

// Componentes
import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { MenuComponent } from './components/shared/menu/menu.component';
import { LoginComponent } from './components/usuario/login/login.component';
import { SigninComponent } from './components/usuario/signin/signin.component';
import { ProductoComponent } from './components/produtos/producto/producto.component';
import { RegistrarProductoComponent } from './components/produtos/registrar-producto/registrar-producto.component';
import { TarjetasComponent } from './components/tarjetas/tarjetas.component';
import { environment } from '../environments/environment';
import { ConfiguracionComponent } from './components/usuario/configuracion/configuracion.component';
import { NoImagePipe } from './pipes/no-image.pipe';
import { DetalleProductoComponent } from './components/produtos/detalle-producto/detalle-producto.component';




@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    MenuComponent,
    LoginComponent,
    SigninComponent,
    ProductoComponent,
    RegistrarProductoComponent,
    TarjetasComponent,
    BusquedaPipe,
    ConfiguracionComponent,
    NoImagePipe,
    DetalleProductoComponent
  ],
  imports: [
    TooltipModule.forRoot(),
    ProgressbarModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    RouterModule.forRoot(ROUTES, { useHash: false }),
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgxSpinnerModule,
    AngularFireStorageModule
  ],
  providers: [
    AngularFireAuth,
    AngularFirestore
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
