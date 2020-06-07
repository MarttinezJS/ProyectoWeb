using System.ComponentModel.DataAnnotations;

namespace Entity
{
    public class Producto
    {
        [Key]
        public string Id { get; set; }
        public string Nombre { get; set; }
        public string Proveedor { get; set; }
        public int Precio { get; set; }
        public string Presentacion { get; set; }
        public string Descripcion { get; set; }
        public string ImageUrl { get; set; }
    }
}