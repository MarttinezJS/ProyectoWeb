import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HandleHttpErrorService } from '../@base/handle-http-error.service';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Producto } from '../components/models/Producto';

const httpOptions = {
   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
   providedIn: 'root'
})

export class ProductoService {

   baseUrl: string;

   constructor(
      private http: HttpClient,
      @Inject('BASE_URL') baseUrl: string,
      private handleErrorService: HandleHttpErrorService
   ) {
      this.baseUrl = baseUrl;
   }

   get(): Observable<Producto[]> {
      return this.http.get<Producto[]>(this.baseUrl + 'api/Producto').pipe(
         tap(_ => this.handleErrorService.log('datos resibidos')),
         catchError(this.handleErrorService.handleError<Producto[]>('Consulta Producto', null))
      );
   }

   post(producto: Producto): Observable<Producto> {
      return this.http.post<Producto>(this.baseUrl + 'api/Producto', producto).pipe(
         tap(_ => this.handleErrorService.log('datos enviados')),
         catchError(this.handleErrorService.handleError<Producto>('Registrar Producto', null))
      );
   }

   put(producto: Producto): Observable<any> {
      const url = `${this.baseUrl}api/Producto/${producto.id}`;
      return this.http.put(url, producto, httpOptions)
      .pipe(
        tap(_ => this.handleErrorService.log('datos enviados')),
        catchError(this.handleErrorService.handleError<any>('Editar Producto'))
      );
   }

   delete(producto: Producto| string): Observable<string> {
      const id = typeof producto === 'string' ? producto : producto.id;
      return this.http.delete<string>(this.baseUrl + 'api/Producto/' + id)
      .pipe(
        tap(_ => this.handleErrorService.log('datos enviados')),
        catchError(this.handleErrorService.handleError<string>('Elimiar Producto', null))
      );
    }
}
