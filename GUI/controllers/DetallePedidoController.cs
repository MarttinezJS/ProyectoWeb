using System.Collections.Generic;
using System.Linq;
using Entity;
using Logica;
using Microsoft.AspNetCore.Mvc;
using GUI.Models;
using Dal;

namespace GUI.controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DetallePedidoController: ControllerBase
    {
        private readonly DetallePedidoService _detallePedidoService;

        public DetallePedidoController( CarniceriaContext context ){
            _detallePedidoService = new DetallePedidoService( context );
        }
        [HttpGet]
        public IEnumerable<DetallePedidoviewModel> Get() {
            var detallesPedido = _detallePedidoService.consultarTodos().Select(dp => new DetallePedidoviewModel(dp));
            return detallesPedido;
        }
        [HttpPost]
        public ActionResult<DetallePedidoviewModel> Post(DetallePedidoInputModel detallePedidoInput) {
            DetallePedido detallePedido = mapearProducto(detallePedidoInput);
            var respuesta = _detallePedidoService.guardar(detallePedido);
            if (respuesta.Error)
            {
                return BadRequest(respuesta.Mensaje);
            }
            return Ok(respuesta.DetallePedido);
        }
        
        private DetallePedido mapearProducto(DetallePedidoInputModel detallePedidoInput){
            DetallePedido detallePedido = new DetallePedido();
            detallePedido.Id = detallePedidoInput.id;
            detallePedido.Cantidad = detallePedidoInput.cantidad;
            detallePedido.Presentacion = detallePedidoInput.presentacion;
            detallePedido.Producto = detallePedidoInput.producto;
            detallePedido.SubTotal = detallePedidoInput.subtotal;
            
            return detallePedido;
        }
    }
}