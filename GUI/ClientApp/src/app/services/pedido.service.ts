import { Injectable, Inject } from '@angular/core';
import { Pedido } from '../components/models/Pedido';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HandleHttpErrorService } from '../@base/handle-http-error.service';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  pedido: Pedido;
  baseUrl: string;

  constructor(private http: HttpClient,
              @Inject('BASE_URL') baseUrl: string,
              private handleErrorService: HandleHttpErrorService) {
    this.baseUrl = baseUrl;
  }

  getPedido() {
    return this.pedido;
  }

  setPedido( pedido: Pedido ) {
    this.pedido = pedido;
  }

  calcularSubtotal() {
    this.pedido.detallePedido.forEach( dPedido => {
      let kilo = 0;
      switch ( dPedido.presentacion ) {
        case 'gramos': kilo = dPedido.cantidad / 1000; break;
        case 'libra': kilo = dPedido.cantidad / 2; break;
        default: break;
      }
      console.log(kilo);
      dPedido.subTotal = kilo * dPedido.producto.precio;
    });

  }

  calcularTotal() {
    let total = 0;
    this.pedido.detallePedido.forEach( dPedido => {
      total += dPedido.subTotal;
    });
    console.log(total);
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
