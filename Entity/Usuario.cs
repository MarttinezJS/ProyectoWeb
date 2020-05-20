using System.ComponentModel.DataAnnotations;

namespace Entity
{
    public class Usuario
    {
        [Key]
        public string Correo { get; set; }
        public string Id { get; set; }
        public string Nombre { get; set; }
        public string Pass { get; set; }
        public string Direccion { get; set; }
        public string Telefono { get; set; }
    }
}
