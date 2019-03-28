using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SunglassStoreApp.Services
{
    public class CrudOperationController : Controller
    {
        // GET: CrudOperation
        public ActionResult ProductCrud()
        {
            return View();
        }
        public ActionResult CustomerCrud()
        {
            return View();
        }
        public ActionResult EmployeeCrud()
        {
            return View();
        }
        public ActionResult AdminDashboard()
        {
            return View();
        }


    }//class
}//ns