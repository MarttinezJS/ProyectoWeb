using System.Resources;
using System;
using Entity;
using System.Collections.Generic;
using Datos;

namespace Logica
{
    public class ProductoService
    {
        private readonly ConnectionManager _conexion;
        private readonly ProductoRepository productoRepository;
       public ProductoService(string cadena) {
           _conexion = new ConnectionManager(cadena);
           productoRepository = new ProductoRepository(_conexion);
       }
        public List<Producto> consultarTodos() {
            List<Producto> productos = new List<Producto>();

            _conexion.open();
            productos = productoRepository.ConsultarTodos();
            _conexion.close();

            return productos;
        }
        public GuardarProductoResponse guardar(Producto producto) {
            try
            {
                _conexion.open();
                productoRepository.Guardar(producto);
                _conexion.close();
                return new GuardarProductoResponse(producto);
            }catch (Exception e) {
                return new GuardarProductoResponse($"Error de la aplicacion: {e.Message}");
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
    public class GuardarProductoResponse{
        public bool Error { get; set; }
        public string Mensaje { get; set; }
        public Producto Producto { get; set; }

        public GuardarProductoResponse(Producto producto){
            Error = false;
            Producto = producto;
        }
        public GuardarProductoResponse(string mensaje)
        {
            Error = true;
            Mensaje = mensaje;
        }

    }
}
