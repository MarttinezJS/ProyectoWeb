using System;
using Entity;
using System.Collections.Generic;
using Datos;

namespace Logica
{
    public class UsuarioService
    {
        private readonly ConnectionManager _conexion;
        private readonly UsuarioRepository usuarioRepository;
       public UsuarioService(string cadena) {
           _conexion = new ConnectionManager(cadena);
           usuarioRepository = new UsuarioRepository(_conexion);
       }
        public List<Usuario> consultarTodos() {
            List<Usuario> usuarios = new List<Usuario>();

            _conexion.open();
            usuarios = usuarioRepository.ConsultarTodos();
            _conexion.close();

            return usuarios;
        }
        public GuardarUsuarioResponse guardar(Usuario usuario) {
            try
            {
                _conexion.open();
                usuarioRepository.Guardar(usuario);
                _conexion.close();
                return new GuardarUsuarioResponse(usuario);
            }catch (Exception e) {
                return new GuardarUsuarioResponse($"Error de la aplicacion: {e.Message}");
            }
            finally
            {
                _conexion.close();
            }
        }
        public string eliminar(string id) {
            return "";
        }
    }
    public class GuardarUsuarioResponse{
        public bool Error { get; set; }
        public string Mensaje { get; set; }
        public Usuario Usuario { get; set; }

        public GuardarUsuarioResponse(Usuario usuario){
            Error = false;
            Usuario = usuario;
        }
        public GuardarUsuarioResponse(string mensaje)
        {
            Error = true;
            Mensaje = mensaje;
        }

    }
}
