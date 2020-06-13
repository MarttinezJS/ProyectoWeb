using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Entity
{
    public class DetallePedido
    {
        [Key]
        public string Id {get; set;}
        public int Cantidad { get; set; }
        public string Presentacion { get; set; }
        public float SubTotal { get; set; }
        public string IdProducto { get; set; }
        [NotMapped]
        public Producto Producto { get; set; }
        public string PedidoId { get; set; }
    }
}
