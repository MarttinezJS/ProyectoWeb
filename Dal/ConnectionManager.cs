using System.Data.SqlClient;

namespace Datos
{
    public class ConnectionManager
    {
        internal SqlConnection _conexion;
        public ConnectionManager(string cadena)
        {
            _conexion = new SqlConnection(cadena);
        }

        public void open() {
            _conexion.Open();
        }

        public void close() {
            _conexion.Close();
        }
    }
}