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
    public class PedidoController: ControllerBase
    {
        private readonly PedidoService _PedidoService;

        public PedidoController( CarniceriaContext context ){
            _PedidoService = new PedidoService( context );
        }
        [HttpGet]
        public IEnumerable<PedidoViewModel> Get() {
            var pedidos = _PedidoService.consultarTodos().Select(p => new PedidoViewModel(p));
            return pedidos;
        }
        [HttpPost]
        public ActionResult<PedidoViewModel> Post(PedidoInputModel pedidoInput) {
            Pedido pedido = mapearPedido(pedidoInput);
            var respuesta = _PedidoService.guardar(pedido);
            if (respuesta.Error)
            {
                return BadRequest(respuesta.Mensaje);
            }
            return Ok(respuesta.Pedido);
        }
        
        private Pedido mapearPedido(PedidoInputModel pedidoInput){
            Pedido pedido = new Pedido();
            pedido.Id = pedidoInput.id;
            pedido.IdCliente = pedidoInput.idCliente;
            pedido.DetallePedido = pedidoInput.detallePedido;
            pedido.Fecha = pedidoInput.fecha;
            pedido.Total = pedidoInput.total;
            return pedido;
        }
    }
}