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
    builder.EntitySet<RecentlyView>("RecentlyViews");
    builder.EntitySet<Customer>("Customers"); 
    builder.EntitySet<Product>("Products"); 
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
          [EnableCors("*", "*", "*")]

    public class RecentlyViewsController : ODataController
    {
        private SunglassBazarEntities db = new SunglassBazarEntities();

        // GET: odata/RecentlyViews
        [EnableQuery]
        public IQueryable<RecentlyView> GetRecentlyViews()
        {
            return db.RecentlyViews;
        }

        // GET: odata/RecentlyViews(5)
        [EnableQuery]
        public SingleResult<RecentlyView> GetRecentlyView([FromODataUri] int key)
        {
            return SingleResult.Create(db.RecentlyViews.Where(recentlyView => recentlyView.RViewID == key));
        }

        // PUT: odata/RecentlyViews(5)
        public IHttpActionResult Put([FromODataUri] int key, Delta<RecentlyView> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            RecentlyView recentlyView = db.RecentlyViews.Find(key);
            if (recentlyView == null)
            {
                return NotFound();
            }

            patch.Put(recentlyView);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RecentlyViewExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(recentlyView);
        }

        // POST: odata/RecentlyViews
        public IHttpActionResult Post(RecentlyView recentlyView)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.RecentlyViews.Add(recentlyView);
            db.SaveChanges();

            return Created(recentlyView);
        }

        // PATCH: odata/RecentlyViews(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch([FromODataUri] int key, Delta<RecentlyView> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            RecentlyView recentlyView = db.RecentlyViews.Find(key);
            if (recentlyView == null)
            {
                return NotFound();
            }

            patch.Patch(recentlyView);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RecentlyViewExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(recentlyView);
        }

        // DELETE: odata/RecentlyViews(5)
        public IHttpActionResult Delete([FromODataUri] int key)
        {
            RecentlyView recentlyView = db.RecentlyViews.Find(key);
            if (recentlyView == null)
            {
                return NotFound();
            }

            db.RecentlyViews.Remove(recentlyView);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // GET: odata/RecentlyViews(5)/Customer
        [EnableQuery]
        public SingleResult<Customer> GetCustomer([FromODataUri] int key)
        {
            return SingleResult.Create(db.RecentlyViews.Where(m => m.RViewID == key).Select(m => m.Customer));
        }

        // GET: odata/RecentlyViews(5)/Product
        [EnableQuery]
        public SingleResult<Product> GetProduct([FromODataUri] int key)
        {
            return SingleResult.Create(db.RecentlyViews.Where(m => m.RViewID == key).Select(m => m.Product));
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool RecentlyViewExists(int key)
        {
            return db.RecentlyViews.Count(e => e.RViewID == key) > 0;
        }
    }
}
