using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Entity
{
    public class Usuario
    {
        [Key]
        public string Id { get; set; }
        public string Nombre { get; set; }
        public List<string> Direccion { get; set; }
        public List<string> Telefono { get; set; }
    }
}
