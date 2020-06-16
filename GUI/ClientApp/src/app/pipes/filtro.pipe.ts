import { Pipe, PipeTransform } from '@angular/core';
import { Pedido } from '../components/models/Pedido';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform( pedidos: Pedido[], estado: string ): unknown {
    if (estado == null) { return pedidos; }
    return pedidos.filter(p => p.estado.indexOf(estado) !== -1) ;
  }
}
