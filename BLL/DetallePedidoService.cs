using System;
using System.Collections.Generic;
using System.Linq;
using Dal;
using Entity;

namespace Logica
{
    public class DetallePedidoService
    {
         private readonly CarniceriaContext _context;
        public DetallePedidoService(CarniceriaContext context) {
            _context = context;
        }
        public List<DetallePedido> consultarTodos() {
            List<DetallePedido> detallesPedido = _context.DetallesPedido.ToList();
            return detallesPedido;
        }
        public GuardarDetallePedidoResponse guardar(DetallePedido detallePedido) {
            try{
                _context.DetallesPedido.Add(detallePedido);
                _context.SaveChanges();
                return new GuardarDetallePedidoResponse(detallePedido);
            }catch (Exception e) {
                return new GuardarDetallePedidoResponse($"Error de la aplicacion: {e.Message}");
            }
        }
    }

    public class GuardarDetallePedidoResponse{
        public bool Error { get; set; }
        public string Mensaje { get; set; }
        public DetallePedido DetallePedido { get; set; }

        public GuardarDetallePedidoResponse(DetallePedido detallePedido){
            Error = false;
            DetallePedido = detallePedido;
        }
        public GuardarDetallePedidoResponse(string mensaje)
        {
            Error = true;
            Mensaje = mensaje;
        }

    }
}