using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CRUDwithAngularJS.Models;

namespace CRUDwithAngularJS.Controllers
{
    public class PlayerController : Controller
    {
        PlayerDBContext context = new PlayerDBContext();
        // GET: Player
        public JsonResult GetPlayers()
        {
            List<Player> PlayerList = new List<Player>();
            PlayerList = context.PlayerDB.ToList();
            return Json(new { list = PlayerList }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetPlayerByID(int id)
        {
            Player player = new Player();
            player = context.PlayerDB.Where(p => p.ID == id).SingleOrDefault();
            return Json(new { player = player }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult AddPlayer(Player player)
        {
            context.PlayerDB.Add(player);
            context.SaveChanges();
            return Json(new { status = "Player added successfully" });
        }

        public JsonResult UpdatePlayer(Player player)
        {
            context.Entry(player).State = System.Data.Entity.EntityState.Modified;
            context.SaveChanges();
            return Json(new { status = "Player updated successfully" });
        }

        public JsonResult DeletePlayer(int id)
        {
            Player player = new Player();
            player = context.PlayerDB.Where(p => p.ID == id).SingleOrDefault();
            context.PlayerDB.Remove(player);
            context.SaveChanges();
            return Json(new { status = "Player deleted successfully" });
        }
    }
}