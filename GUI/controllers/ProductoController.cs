using System.Net.Http.Headers;
using System.Collections.Generic;
using System.Linq;
using Entity;
using Logica;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using GUI.Models;
using Dal;

namespace GUI.Controllers
{
   [Route("api/[controller]")]
   [ApiController]
   public class ProductoController: ControllerBase
   {
       private readonly ProductoService _productoService;

       public ProductoController( CarniceriaContext context ){
           _productoService = new ProductoService( context );
       }

      [HttpGet]
      public IEnumerable<ProductoViewModel> Get() {
          var productos = _productoService.consultarTodos().Select(u => new ProductoViewModel(u));
          return productos;
      }
      [HttpPost]
      public ActionResult<ProductoViewModel> Post(ProductoInputModel productoInput) {
          Producto producto = mapearProducto(productoInput);
          var respuesta = _productoService.guardar(producto);
          if (respuesta.Error)
          {
              return BadRequest(respuesta.Mensaje);
          }
          return Ok(respuesta.Producto);
      }
      
      private Producto mapearProducto(ProductoInputModel productoInput){
          Producto producto = new Producto();
          producto.Id = productoInput.id;
          producto.Nombre = productoInput.nombre;
          producto.Proveedor = productoInput.proveedor;
          producto.Precio = productoInput.precio;
          producto.Presentacion = productoInput.presentacion;
          producto.Descripcion = productoInput.descripcion;
          producto.ImageUrl = productoInput.imageURL;
          
          return producto;
      }
    }
}