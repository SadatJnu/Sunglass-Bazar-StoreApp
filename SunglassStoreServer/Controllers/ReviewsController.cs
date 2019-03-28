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
    builder.EntitySet<Review>("Reviews");
    builder.EntitySet<Customer>("Customers"); 
    builder.EntitySet<Product>("Products"); 
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
          [EnableCors("*", "*", "*")]

    public class ReviewsController : ODataController
    {
        private SunglassBazarEntities db = new SunglassBazarEntities();

        // GET: odata/Reviews
        [EnableQuery]
        public IQueryable<Review> GetReviews()
        {
            return db.Reviews;
        }

        // GET: odata/Reviews(5)
        [EnableQuery]
        public SingleResult<Review> GetReview([FromODataUri] int key)
        {
            return SingleResult.Create(db.Reviews.Where(review => review.ReviewID == key));
        }

        // PUT: odata/Reviews(5)
        public IHttpActionResult Put([FromODataUri] int key, Delta<Review> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Review review = db.Reviews.Find(key);
            if (review == null)
            {
                return NotFound();
            }

            patch.Put(review);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReviewExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(review);
        }

        // POST: odata/Reviews
        public IHttpActionResult Post(Review review)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Reviews.Add(review);
            db.SaveChanges();

            return Created(review);
        }

        // PATCH: odata/Reviews(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch([FromODataUri] int key, Delta<Review> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Review review = db.Reviews.Find(key);
            if (review == null)
            {
                return NotFound();
            }

            patch.Patch(review);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReviewExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(review);
        }

        // DELETE: odata/Reviews(5)
        public IHttpActionResult Delete([FromODataUri] int key)
        {
            Review review = db.Reviews.Find(key);
            if (review == null)
            {
                return NotFound();
            }

            db.Reviews.Remove(review);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // GET: odata/Reviews(5)/Customer
        [EnableQuery]
        public SingleResult<Customer> GetCustomer([FromODataUri] int key)
        {
            return SingleResult.Create(db.Reviews.Where(m => m.ReviewID == key).Select(m => m.Customer));
        }

        // GET: odata/Reviews(5)/Product
        [EnableQuery]
        public SingleResult<Product> GetProduct([FromODataUri] int key)
        {
            return SingleResult.Create(db.Reviews.Where(m => m.ReviewID == key).Select(m => m.Product));
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ReviewExists(int key)
        {
            return db.Reviews.Count(e => e.ReviewID == key) > 0;
        }
    }
}
