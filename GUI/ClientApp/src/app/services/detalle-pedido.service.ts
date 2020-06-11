import { Injectable, Inject } from '@angular/core';
import { HandleHttpErrorService } from '../@base/handle-http-error.service';
import { HttpClient } from '@angular/common/http';
import { DetallePedido } from '../components/models/DetallePedido';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DetallePedidoService {

  detalles: DetallePedido[] = [];
  baseUrl: string;

  constructor(private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private handleErrorService: HandleHttpErrorService) {
    this.baseUrl = baseUrl;
  }

  get(): Observable<DetallePedido[]> {
    return this.http.get<DetallePedido[]>(this.baseUrl + 'api/DetallePedido').pipe(
       tap(_ => this.handleErrorService.log('datos resibidos')),
       catchError(this.handleErrorService.handleError<DetallePedido[]>('Consulta DetallePedido', null))
    );
  }

  post(pedido: DetallePedido): Observable<DetallePedido> {
    return this.http.post<DetallePedido>(this.baseUrl + 'api/DetallePedido', pedido).pipe(
      tap(_ => this.handleErrorService.log('datos enviados')),
      catchError(this.handleErrorService.handleError<DetallePedido>('Registrar DetallePedido', null))
    );
  }

  getdetalles() {
    return this.detalles;
  }

  setdetalles( detalles: DetallePedido[] ) {
    this.detalles = detalles;
    this.calcularSubtotal();
    this.calcularTotal();
  }

  calcularSubtotal() {
    this.detalles.forEach( dPedido => {
      let kilo = 0;
      switch ( dPedido.presentacion ) {
        case 'Gramo': kilo = dPedido.cantidad / 1000; break;
        case 'Libra': kilo = dPedido.cantidad / 2; break;
        default: kilo = dPedido.cantidad; break;
      }
      dPedido.subTotal = kilo * dPedido.producto.precio;
    });
  }

  calcularTotal() {
    let total = 0;
    this.detalles.forEach( dPedido => {
      total += dPedido.subTotal;
    });
  }
}
