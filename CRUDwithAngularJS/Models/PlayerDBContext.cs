using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;

namespace CRUDwithAngularJS.Models
{
    public class PlayerDBContext : DbContext
    {
        public DbSet<Player> PlayerDB { get; set; }
    }
}