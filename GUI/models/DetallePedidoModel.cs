using Entity;

namespace GUI.Models
{
    public class DetallePedidoInputModel
    {
        public string id { get; set; }
        public Producto producto { get; set; }
        public int cantidad { get; set; }
        public string presentacion { get; set; }
        public float subtotal { get; set; }
    }

    public class DetallePedidoviewModel: DetallePedidoInputModel
    {
        public DetallePedidoviewModel()
        {
            
        }
        public DetallePedidoviewModel( DetallePedido detallePedido )
        {
            id = detallePedido.Id;
            producto = detallePedido.Producto;
            cantidad = detallePedido.Cantidad;
            presentacion = detallePedido.Presentacion;
            subtotal = detallePedido.SubTotal;
        }
    }
}