import { Pedido } from '../components/models/Pedido';
import { Injectable, Inject, EventEmitter } from '@angular/core';
import * as SignalR from '@aspnet/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  baseUrl: string;
  hubConnection: SignalR.HubConnection;
  signalRecived = new EventEmitter<Pedido>();

  constructor(@Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
    this.buildConnection();
    this.startConnection();
  }

  public buildConnection = () => {
    this.hubConnection = new SignalR.HubConnectionBuilder()
    .withUrl( this.baseUrl + 'signalhub')
    .build();
  }

  public startConnection = () => {
    this.hubConnection.start()
    .then( () => {
      console.log('Coneccion iniciada...');
      this.registerSignaEvents();
    })
    .catch( err => {
      console.log('Error en signal: ' + err);
      setTimeout(() => {
        this.startConnection();
      }, 4000);
    });
  }

  private registerSignaEvents = () => {
    this.hubConnection.on('GuardarPedido', (pedido: Pedido) => {
      this.signalRecived.emit(pedido);
    });
  }
}
