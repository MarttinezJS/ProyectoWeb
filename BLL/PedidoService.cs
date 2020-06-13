using System;
using System.Collections.Generic;
using System.Linq;
using Dal;
using Entity;

namespace Logica
{
    public class PedidoService
    {
        private readonly CarniceriaContext _context;
        public PedidoService(CarniceriaContext context) {
            _context = context;
        }
        public List<Pedido> consultarTodos() {
            List<Pedido> pedidos = _context.Pedidos.ToList();
            return pedidos;
        }
        public GuardarPedidoResponse guardar(Pedido pedido) {
            try{
                _context.Pedidos.Add(pedido);
                _context.SaveChanges();
                return new GuardarPedidoResponse(pedido);
            }catch (Exception e) {
                return new GuardarPedidoResponse($"Error de la aplicacion: {e.Message}");
            }
        }
    }

    public class GuardarPedidoResponse{
        public bool Error { get; set; }
        public string Mensaje { get; set; }
        public Pedido Pedido { get; set; }

        public GuardarPedidoResponse(Pedido pedido){
            Error = false;
            Pedido = pedido;
        }
        public GuardarPedidoResponse(string mensaje)
        {
            Error = true;
            Mensaje = mensaje;
        }

    }
}