using System.Collections.Generic;
using System;
using Entity;

namespace GUI.Models
{
    public class PedidoInputModel
    {
        public string id { get; set; }
        public string fecha { get; set; }
        public float total { get; set; }
        public DetallePedido[] detallesPedido { get; set; }
        public string idCliente { get; set; }
    }

    public class PedidoViewModel: PedidoInputModel
    {
        public PedidoViewModel()
        {
        }

        public PedidoViewModel( Pedido pedido )
        {
            id = pedido.Id;
            fecha = pedido.Fecha;
            total = pedido.Total;
            detallesPedido = pedido.DetallePedido;
            idCliente = pedido.IdCliente;
        }
    }
}