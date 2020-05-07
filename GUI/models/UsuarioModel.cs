using System;
using Entity;

namespace GUI.Models
{
    public class UsuarioInputModel{
        public string id { get; set; }
        public string nombre { get; set; }
        public string correo { get; set; }
        public string pass { get; set; }
        public string direccion { get; set; }
        public string telefono { get; set; }
    }
    public class UsuarioViewModel: UsuarioInputModel
    {
        public UsuarioViewModel(){}
        public UsuarioViewModel(Usuario usuario)
        {
            id = usuario.Id;
            nombre = usuario.Nombre;
            correo = usuario.Correo;
            pass = usuario.Pass;
            direccion = usuario.Direccion;
            telefono = usuario.Telefono;
        }
    }
}
