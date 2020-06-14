import { Injectable, Inject } from '@angular/core';
import { Pedido } from '../components/models/Pedido';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HandleHttpErrorService } from '../@base/handle-http-error.service';
import { tap, catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  baseUrl: string;

  constructor(private http: HttpClient,
              @Inject('BASE_URL') baseUrl: string,
              private handleErrorService: HandleHttpErrorService) {
    this.baseUrl = baseUrl;
  }

  get(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.baseUrl + 'api/Pedido').pipe(
       tap(_ => this.handleErrorService.log('datos resibidos')),
       catchError(this.handleErrorService.handleError<Pedido[]>('Consulta Pedido', null))
    );
  }

  post(pedido: Pedido): Observable<Pedido> {
    console.log(JSON.stringify( pedido ));
    return this.http.post<Pedido>(this.baseUrl + 'api/Pedido', pedido).pipe(
      tap(_ => this.handleErrorService.log('datos enviados')),
      catchError(this.handleErrorService.handleError<Pedido>('Registrar Pedido', null))
    );
  }

  put(pedido: Pedido): Observable<any> {
    const url = `${this.baseUrl}api/Pedido/${pedido.id}`;
    return this.http.put(url, pedido, httpOptions)
    .pipe(
      tap(_ => this.handleErrorService.log('datos enviados')),
      catchError(this.handleErrorService.handleError<any>('Editar Pedido'))
    );
  }
}
