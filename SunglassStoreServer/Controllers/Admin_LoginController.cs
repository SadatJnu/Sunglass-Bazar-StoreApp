using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.ModelBinding;
using System.Web.Http.OData;
using System.Web.Http.OData.Routing;
using SunglassStoreServer.Models;
using System.Web.Http.Cors;

namespace SunglassStoreServer.Controllers
{
    /*
    The WebApiConfig class may require additional changes to add a route for this controller. Merge these statements into the Register method of the WebApiConfig class as applicable. Note that OData URLs are case sensitive.

    using System.Web.Http.OData.Builder;
    using System.Web.Http.OData.Extensions;
    using SunglassStoreServer.Models;
    ODataConventionModelBuilder builder = new ODataConventionModelBuilder();
    builder.EntitySet<Admin_Login>("Admin_Login");
    builder.EntitySet<Admin_Employee>("Admin_Employee"); 
    builder.EntitySet<Role>("Roles"); 
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
        [EnableCors("*", "*", "*")]

    public class Admin_LoginController : ODataController
    {
        private SunglassBazarEntities db = new SunglassBazarEntities();

        // GET: odata/Admin_Login
        [EnableQuery]
        public IQueryable<Admin_Login> GetAdmin_Login()
        {
            return db.Admin_Login;
        }

        // GET: odata/Admin_Login(5)
        [EnableQuery]
        public SingleResult<Admin_Login> GetAdmin_Login([FromODataUri] int key)
        {
            return SingleResult.Create(db.Admin_Login.Where(admin_Login => admin_Login.LoginID == key));
        }

        // PUT: odata/Admin_Login(5)
        public IHttpActionResult Put([FromODataUri] int key, Delta<Admin_Login> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Admin_Login admin_Login = db.Admin_Login.Find(key);
            if (admin_Login == null)
            {
                return NotFound();
            }

            patch.Put(admin_Login);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Admin_LoginExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(admin_Login);
        }

        // POST: odata/Admin_Login
        public IHttpActionResult Post(Admin_Login admin_Login)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Admin_Login.Add(admin_Login);
            db.SaveChanges();

            return Created(admin_Login);
        }

        // PATCH: odata/Admin_Login(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch([FromODataUri] int key, Delta<Admin_Login> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Admin_Login admin_Login = db.Admin_Login.Find(key);
            if (admin_Login == null)
            {
                return NotFound();
            }

            patch.Patch(admin_Login);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Admin_LoginExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(admin_Login);
        }

        // DELETE: odata/Admin_Login(5)
        public IHttpActionResult Delete([FromODataUri] int key)
        {
            Admin_Login admin_Login = db.Admin_Login.Find(key);
            if (admin_Login == null)
            {
                return NotFound();
            }

            db.Admin_Login.Remove(admin_Login);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // GET: odata/Admin_Login(5)/Admin_Employee
        [EnableQuery]
        public SingleResult<Admin_Employee> GetAdmin_Employee([FromODataUri] int key)
        {
            return SingleResult.Create(db.Admin_Login.Where(m => m.LoginID == key).Select(m => m.Admin_Employee));
        }

        // GET: odata/Admin_Login(5)/Role
        [EnableQuery]
        public SingleResult<Role> GetRole([FromODataUri] int key)
        {
            return SingleResult.Create(db.Admin_Login.Where(m => m.LoginID == key).Select(m => m.Role));
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool Admin_LoginExists(int key)
        {
            return db.Admin_Login.Count(e => e.LoginID == key) > 0;
        }
    }
}
