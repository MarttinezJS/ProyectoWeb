using System.Collections.Generic;
using System;
using Entity;

namespace GUI.Models
{
    public class PedidoInputModel
    {
        public PedidoInputModel()
        {
            detallePedido = new List<DetallePedido>();
        }
        public string id { get; set; }
        public string fechaInicio { get; set; }
        public string fechaFin { get; set; }
        public float total { get; set; }
        public List<DetallePedido> detallePedido { get; set; }
        public string idCliente { get; set; }
        public Usuario cliente { get; set; }
        public string estado { get; set; }
    }

    public class PedidoViewModel: PedidoInputModel
    {
        public PedidoViewModel()
        {
        }

        public PedidoViewModel( Pedido pedido )
        {
            id = pedido.Id;
            fechaInicio = pedido.FechaInicio;
            fechaFin = pedido.FechaFin;
            total = pedido.Total;
            detallePedido = pedido.DetallePedido;
            idCliente = pedido.IdCliente;
            estado = pedido.Estado;
            cliente = pedido.Cliente;
        }
    }
}