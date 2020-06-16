using Microsoft.AspNetCore.SignalR;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Linq;
using GUI.Models;
using Entity;
using Logica;
using Dal;

namespace GUI.controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PedidoController: ControllerBase
    {
        private readonly PedidoService _PedidoService;
        private readonly IHubContext<SignaHub> _HubContext;

        public PedidoController( CarniceriaContext context, IHubContext<SignaHub> hubContext ){
            _PedidoService = new PedidoService( context );
            _HubContext = hubContext;
        }
        [HttpGet]
        public IEnumerable<PedidoViewModel> Get() {
            var pedidos = _PedidoService.consultarTodos().Select(p => new PedidoViewModel(p));
            return pedidos;
        }
        [HttpPut("{identificacion}")]
        public ActionResult<string> Put(string identificacion, Pedido pedido)
        {
            if( pedido == null){
                return BadRequest("No encontrado");
            }
            var mensaje = _PedidoService.Modificar(pedido);
            return Ok(mensaje) ;
        }
        [HttpPost]
        public async Task<ActionResult<PedidoViewModel>> Post(PedidoInputModel pedidoInput) {
            Pedido pedido = mapearPedido(pedidoInput);
            var respuesta = _PedidoService.guardar(pedido);
            if (respuesta.Error)
            {
                return BadRequest(respuesta.Mensaje);
            }
            var pedidoViewModel = new PedidoViewModel(respuesta.Pedido);
            await _HubContext.Clients.All.SendAsync("GuardarPedido", pedidoViewModel);
            return Ok(pedidoViewModel);
        }
        
        private Pedido mapearPedido(PedidoInputModel pedidoInput){
            Pedido pedido = new Pedido();
            pedido.Id = pedidoInput.id;
            pedido.IdCliente = pedidoInput.idCliente;
            pedido.DetallePedido = pedidoInput.detallePedido;
            pedido.FechaInicio = pedidoInput.fechaInicio;
            pedido.FechaFin = pedidoInput.fechaFin;
            pedido.Total = pedidoInput.total;
            pedido.Estado = pedidoInput.estado;
            return pedido;
        }
    }
}