using System;
using Entity;
using System.Collections.Generic;
using Dal;
using System.Linq;

namespace Logica
{
    public class UsuarioService
    {
        private readonly CarniceriaContext _context;
        public UsuarioService( CarniceriaContext context ) {
           _context = context;
        }

        public List<Usuario> consultarTodos() {
            List<Usuario> usuarios = _context.Usuarios.ToList();
            return usuarios;
        }

        public GuardarUsuarioResponse guardar(Usuario usuario) {
            try
            {
                if (_context.Usuarios.Find( usuario.Id ) != null)
                {
                    return new GuardarUsuarioResponse( "Error, el correo ya es utilizado" );
                }
                _context.Usuarios.Add( usuario );
                _context.SaveChanges();
                return new GuardarUsuarioResponse(usuario);
            }catch (Exception e) {
                return new GuardarUsuarioResponse($"Error de la aplicacion: {e.Message}");
            }
        }
        public string eliminar(string correo) {
            try
            {
                var usuario = _context.Usuarios.Find( correo );
                if (usuario == null)
                {
                    return "Error, el usuario no se encuentra registrado";
                }
                _context.Usuarios.Remove( usuario );
                _context.SaveChanges();
                return "La cuenta está eliminada";
            }
            catch (Exception e)
            {
                return ($"Error de la aplicacion: {e.Message}");
            }
        }

        public string modificar( Usuario usuarioNuevo ) {
            var usuario = _context.Usuarios.Find( usuarioNuevo.Id );
            if (usuario == null)
            {
                return "El usuario no se encuentra registrado";
            }
            usuario.Direccion = usuarioNuevo.Direccion;
            usuario.Nombre = usuarioNuevo.Nombre;
            usuario.Telefono = usuarioNuevo.Telefono;

            _context.Usuarios.Update( usuario );
            _context.SaveChanges();

            return "El usuario se actualizó";
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
