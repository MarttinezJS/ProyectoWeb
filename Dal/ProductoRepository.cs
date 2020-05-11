using System.Collections.Generic;
using Entity;
using System.Data.SqlClient;

namespace Datos
{
    public class ProductoRepository
    {
    private readonly SqlConnection _conexion;
    private readonly List<Producto> productos;

    public ProductoRepository(ConnectionManager cadena)
    {
        productos = new List<Producto>();
        _conexion = cadena._conexion;
    }
    public void Guardar(Producto producto) {
        using (var comando = _conexion.CreateCommand())
        {
            comando.CommandText = @"insert into productos (id, nombre, precio, presentacion, descripcion, id_provedor, id_servicio)
                                    values (@id, @nombre, @precio, @presentacion, @descripcion, @id_provedor, @id_servicio)";
            comando.Parameters.AddWithValue("@id",producto.Id);
            comando.Parameters.AddWithValue("@nombre",producto.Nombre);
            comando.Parameters.AddWithValue("@precio",producto.Precio);
            comando.Parameters.AddWithValue("@presentacion",producto.Presentacion);
            comando.Parameters.AddWithValue("@descripcion",producto.Descripcion);
            comando.Parameters.AddWithValue("@id_provedor",producto.Proveedor);
            comando.Parameters.AddWithValue("@id_servicio",producto.Servicio);

            var filas = comando.ExecuteNonQuery();
        }
    }

    public List<Producto> ConsultarTodos() {
        SqlDataReader lector;
        List<Producto> productos = new List<Producto>();
        using (var comando = _conexion.CreateCommand())
        {
            comando.CommandText = "select * from productos";
            lector = comando.ExecuteReader();
            if (lector.HasRows)
            {
                while (lector.Read())
                {
                    Producto producto = mapearProducto(lector);
                    productos.Add(producto);
                }
            }
        }
        return productos;
    }
    public Producto mapearProducto(SqlDataReader datos) {
        if (!datos.HasRows) return null;
        Producto producto = new Producto();
        producto.Id = (string)datos["id"];
        producto.Nombre = (string)datos["nombre"];
        producto.Precio = (int)datos["precio"];
        producto.Presentacion = (string)datos["presentacion"];
        producto.Descripcion = (string)datos["descripcion"];
        producto.Proveedor = (string)datos["id_provedor"];
        producto.Servicio = (string)datos["id_servicio"];

        return producto;
    }
    }
}
