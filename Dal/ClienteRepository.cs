using System.Collections.Generic;
using Entity;
using System.Data.SqlClient;
using System;

namespace Datos
{
    public class UsuarioRepository
    {
    private readonly SqlConnection _conexion;
    private readonly List<Usuario> usuario;

    public UsuarioRepository(ConnectionManager cadena)
    {
        usuario = new List<Usuario>();
        _conexion = cadena._conexion;
    }
    public void Guardar(Usuario usuario) {
        System.Console.WriteLine(usuario.Id);
        using (var comando = _conexion.CreateCommand())
        {
            comando.CommandText = @"insert into usuarios (id, nombre, correo, direccion, pass, telefono)
                                    values (@id, @nombre, @correo, @direccion, @pass, @telefono)";
            comando.Parameters.AddWithValue("@id",usuario.Id);
            comando.Parameters.AddWithValue("@nombre",usuario.Nombre);
            comando.Parameters.AddWithValue("@correo",usuario.Correo);
            comando.Parameters.AddWithValue("@direccion",usuario.Direccion);
            comando.Parameters.AddWithValue("@pass",usuario.Pass);
            comando.Parameters.AddWithValue("@telefono",usuario.Telefono);

            var filas = comando.ExecuteNonQuery();
        }
    }

    public List<Usuario> ConsultarTodos() {
        SqlDataReader lector;
        List<Usuario> usuarios= new List<Usuario>();
        using (var comando = _conexion.CreateCommand())
        {
            comando.CommandText = "select * from usuarios";
            lector = comando.ExecuteReader();
            if (lector.HasRows)
            {
                while (lector.Read())
                {
                    Usuario usuario = mapearCliente(lector);
                    usuarios.Add(usuario);
                }
            }
        }
        return usuarios;
    }
    public Usuario mapearCliente(SqlDataReader datos) {
        if (!datos.HasRows) return null;
        Usuario usuario = new Usuario();
        usuario.Id = (string)datos["id"];
        usuario.Nombre = (string)datos["nombre"];
        usuario.Correo = (string)datos["correo"];
        usuario.Direccion = (string)datos["direccion"];
        usuario.Pass = (string)datos["pass"];
        usuario.Telefono = (string)datos["telefono"];

        return usuario;
    }
    }
}
