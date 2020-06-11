using System.Resources;
using System;
using Entity;
using System.Collections.Generic;
using Dal;
using System.Linq;

namespace Logica
{
    public class ProductoService
    {
        private readonly CarniceriaContext _context;
        public ProductoService(CarniceriaContext context) {
            _context = context;
        }
        public List<Producto> consultarTodos() {
            List<Producto> productos = _context.Productos.ToList();
            return productos;
        }

        public GuardarProductoResponse guardar(Producto producto) {
            try
            {
                if (_context.Productos.Find( producto.Id ) != null)
                {
                    return new GuardarProductoResponse("Error el Producto se encuentra registrado");   
                }
                _context.Productos.Add(producto);
                _context.SaveChanges();
                return new GuardarProductoResponse(producto);
            }catch (Exception e) {
                return new GuardarProductoResponse($"Error de la aplicacion: {e.Message}");
            }
        }
        public string eliminar(string id) {
            try
            {
                var producto = _context.Productos.Find( id );
                if (producto == null)
                {
                    return "Error, el producto no se encuentra registrado";
                }
                _context.Productos.Remove( producto );
                _context.SaveChanges();
                return "El producto esta fuera del catalogo.";
            }
            catch (Exception e)
            {
                return ($"Error de la aplicacion: {e.Message}");
            }
        }

        public string modificar( Producto productoNuevo ) {
            var producto = _context.Productos.Find( productoNuevo.Id );
            if (producto == null)
            {
                return "El producto no se encuentra registrado";
            }
            producto.Descripcion = productoNuevo.Descripcion;
            producto.Nombre = productoNuevo.Nombre;
            producto.Precio = productoNuevo.Precio;
            producto.Presentacion = productoNuevo.Presentacion;
            producto.Proveedor = productoNuevo.Proveedor;

            _context.Productos.Update( producto );
            _context.SaveChanges();

            return "El producto se actualizó";
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
