using System.Collections.Generic;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entity
{
    public class Pedido
    {
        public Pedido()
        {
            DetallePedido = new List<DetallePedido>();
        }
        [Key]
        public string Id { get; set; }
        public string Fecha { get; set; }
        public float Total { get; set; }
        public List<DetallePedido> DetallePedido { get; set; }
        public string IdCliente { get; set; }
        [NotMapped]
        public Usuario Cliente { get; set; }
        public string Estado { get; set; }
        
    }
}