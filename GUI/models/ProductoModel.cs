using System;
using Entity;

namespace GUI.Models
{
    public class ProductoInputModel{
        public string id { get; set; }
        public string nombre { get; set; }
        public string proveedor { get; set; }
        public int precio { get; set; }
        public string presentacion { get; set; }
        public string descripcion { get; set; }
    }
    public class ProductoViewModel: ProductoInputModel
    {
        public ProductoViewModel(){}
        public ProductoViewModel( Producto producto )
        {
            id = producto.Id;
            nombre = producto.Nombre;
            proveedor = producto.Proveedor;
            precio = producto.Precio;
            presentacion = producto.Presentacion;
            descripcion = producto.Descripcion;
        }
    }
}
