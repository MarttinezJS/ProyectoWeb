import { Injectable, Inject } from '@angular/core';
import { Pedido } from '../components/models/Pedido';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HandleHttpErrorService } from '../@base/handle-http-error.service';
import { tap, catchError } from 'rxjs/operators';
import { DetallePedido } from '../components/models/DetallePedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  detalles: DetallePedido[] = [];
  baseUrl: string;

  constructor(private http: HttpClient,
              @Inject('BASE_URL') baseUrl: string,
              private handleErrorService: HandleHttpErrorService) {
    this.baseUrl = baseUrl;
  }

  getdetalles() {
    return this.detalles;
  }

  setdetalles( detalles: DetallePedido[] ) {
    this.detalles = detalles;
    this.calcularSubtotal();
    this.calcularTotal();
    console.log(this.detalles);
  }

  calcularSubtotal() {
    this.detalles.forEach( dPedido => {
      let kilo = 0;
      switch ( dPedido.presentacion ) {
        case 'Gramos': kilo = dPedido.cantidad / 1000; break;
        case 'Libra': kilo = dPedido.cantidad / 2; break;
        default: break;
      }
      console.log('Kilos: ' + kilo);
      dPedido.subTotal = kilo * dPedido.producto.precio;
    });
  }

  calcularTotal() {
    let total = 0;
    this.detalles.forEach( dPedido => {
      total += dPedido.subTotal;
    });
    console.log('total:' + total);
  }

  get(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.baseUrl + 'api/Pedido').pipe(
       tap(_ => this.handleErrorService.log('datos resibidos')),
       catchError(this.handleErrorService.handleError<Pedido[]>('Consulta Pedido', null))
    );
 }

 post(pedido: Pedido): Observable<Pedido> {
    return this.http.post<Pedido>(this.baseUrl + 'api/Pedido', pedido).pipe(
       tap(_ => this.handleErrorService.log('datos enviados')),
       catchError(this.handleErrorService.handleError<Pedido>('Registrar Pedido', null))
    );
 }
}
