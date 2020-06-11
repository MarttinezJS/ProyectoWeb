using Microsoft.EntityFrameworkCore;
using Entity;

namespace Dal
{
    public class CarniceriaContext: DbContext
    {
        public CarniceriaContext(DbContextOptions options): base( options ){}

        public DbSet<Producto> Productos { get; set; }
        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Pedido> Pedidos { get; set; }
        public DbSet<DetallePedido> DetallesPedido { get; set; }
    }
}