import { Pipe, PipeTransform } from '@angular/core';
import { Producto } from '../components/models/Producto';

@Pipe({
  name: 'busqueda'
})
export class BusquedaPipe implements PipeTransform {

  transform(productos: Producto[], termino: string): Producto[] {
      if (termino == null) { return productos; }
      return productos.filter(p => p.nombre.toLowerCase().indexOf(termino.toLowerCase()) !== -1) ;
      }
}
