import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pedido-vendedor',
  templateUrl: './pedido-vendedor.component.html',
  styleUrls: ['./pedido-vendedor.component.css']
})
export class PedidoVendedorComponent implements OnInit {

  envio = false;
  pendiente = false;
  estado : string;

  constructor() { }

  ngOnInit(): void {
    
  }

  estadoPedido(){
    if(this.estado === 'pendiente'){
      this.envio = false;
      this.pendiente = true;
    }else if (this.estado === 'enviado'){
      this.envio = true;
      this.pendiente = true; 
    }else if (this.estado === 'finalizado'){
      this.envio = true;
      this.pendiente = false;
    }else if(this.estado == 'cancelado'){
      this.envio=false;
      this.pendiente = false;
    }
  }
}
