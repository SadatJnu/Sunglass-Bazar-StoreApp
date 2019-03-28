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
    builder.EntitySet<Admin_Employee>("Admin_Employee");
    builder.EntitySet<Admin_Login>("Admin_Login"); 
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
        [EnableCors("*", "*", "*")]

    public class Admin_EmployeeController : ODataController
    {
        private SunglassBazarEntities db = new SunglassBazarEntities();

        // GET: odata/Admin_Employee
        [EnableQuery]
        public IQueryable<Admin_Employee> GetAdmin_Employee()
        {
            return db.Admin_Employee;
        }

        // GET: odata/Admin_Employee(5)
        [EnableQuery]
        public SingleResult<Admin_Employee> GetAdmin_Employee([FromODataUri] int key)
        {
            return SingleResult.Create(db.Admin_Employee.Where(admin_Employee => admin_Employee.EmpID == key));
        }

        // PUT: odata/Admin_Employee(5)
        public IHttpActionResult Put([FromODataUri] int key, Delta<Admin_Employee> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Admin_Employee admin_Employee = db.Admin_Employee.Find(key);
            if (admin_Employee == null)
            {
                return NotFound();
            }

            patch.Put(admin_Employee);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Admin_EmployeeExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(admin_Employee);
        }

        // POST: odata/Admin_Employee
        public IHttpActionResult Post(Admin_Employee admin_Employee)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Admin_Employee.Add(admin_Employee);
            db.SaveChanges();

            return Created(admin_Employee);
        }

        // PATCH: odata/Admin_Employee(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch([FromODataUri] int key, Delta<Admin_Employee> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Admin_Employee admin_Employee = db.Admin_Employee.Find(key);
            if (admin_Employee == null)
            {
                return NotFound();
            }

            patch.Patch(admin_Employee);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Admin_EmployeeExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(admin_Employee);
        }

        // DELETE: odata/Admin_Employee(5)
        public IHttpActionResult Delete([FromODataUri] int key)
        {
            Admin_Employee admin_Employee = db.Admin_Employee.Find(key);
            if (admin_Employee == null)
            {
                return NotFound();
            }

            db.Admin_Employee.Remove(admin_Employee);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // GET: odata/Admin_Employee(5)/Admin_Login
        [EnableQuery]
        public IQueryable<Admin_Login> GetAdmin_Login([FromODataUri] int key)
        {
            return db.Admin_Employee.Where(m => m.EmpID == key).SelectMany(m => m.Admin_Login);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool Admin_EmployeeExists(int key)
        {
            return db.Admin_Employee.Count(e => e.EmpID == key) > 0;
        }
    }
}
