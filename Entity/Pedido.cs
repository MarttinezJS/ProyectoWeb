using System.Collections.Generic;
using System;
using System.ComponentModel.DataAnnotations;

namespace Entity
{
    public class Pedido
    {
        [Key]
        public string Id { get; set; }
        public string Fecha { get; set; }
        public float Total { get; set; }
        public List<DetallePedido> DetallePedido { get; set; }
        public string IdCliente { get; set; }
        
    }
}