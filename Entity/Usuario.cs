using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Entity
{
    public class Usuario
    {
        [Key]
        public string Id { get; set; }
        public string Nombre { get; set; }
        public String ImageURL { get; set; }
        public string Direccion { get; set; }
        public string Telefono { get; set; }
    }
}
