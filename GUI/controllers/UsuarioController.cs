using System.Collections.Generic;
using System.Linq;
using Entity;
using Logica;
using Microsoft.AspNetCore.Mvc;
using GUI.Models;
using Dal;

namespace GUI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController: ControllerBase
    {
        private readonly UsuarioService _usuarioService;
        public UsuarioController( CarniceriaContext context ){
            _usuarioService = new UsuarioService( context );
        }

        [HttpGet]
        public IEnumerable<UsuarioViewModel> Get() {
            var clientes = _usuarioService.consultarTodos().Select(u => new UsuarioViewModel(u));
            return clientes;
        }
      
        [HttpPost]
        public ActionResult<UsuarioViewModel> Post(UsuarioInputModel usuarioInput) {
            
            Usuario usuario = mapearCliente(usuarioInput);
            var respuesta = _usuarioService.guardar(usuario);
            if (respuesta.Error)
            {
                return BadRequest(respuesta.Mensaje);
            }
            return Ok(respuesta.Usuario);
        }

        [HttpGet("{id}")]
        public ActionResult<UsuarioViewModel> Get(string id) {
            var usuario = _usuarioService.BuscarxIdentificacion( id );
            if (usuario == null) return NotFound();
            var usuarioViewModel = new UsuarioViewModel(usuario);
            return usuarioViewModel;
        }


        private Usuario mapearCliente(UsuarioInputModel usuarioInput){
            Usuario usuario = new Usuario();
            usuario.Id = usuarioInput.id;
            usuario.Nombre = usuarioInput.nombre;
            usuario.Direccion = usuarioInput.direccion;
            usuario.Telefono = usuarioInput.telefono;
            
            return usuario;
        }
    }
}