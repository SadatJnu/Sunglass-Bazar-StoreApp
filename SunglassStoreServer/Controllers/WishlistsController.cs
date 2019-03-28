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
    builder.EntitySet<Wishlist>("Wishlists");
    builder.EntitySet<Customer>("Customers"); 
    builder.EntitySet<Product>("Products"); 
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
          [EnableCors("*", "*", "*")]

    public class WishlistsController : ODataController
    {
        private SunglassBazarEntities db = new SunglassBazarEntities();

        // GET: odata/Wishlists
        [EnableQuery]
        public IQueryable<Wishlist> GetWishlists()
        {
            return db.Wishlists;
        }

        // GET: odata/Wishlists(5)
        [EnableQuery]
        public SingleResult<Wishlist> GetWishlist([FromODataUri] int key)
        {
            return SingleResult.Create(db.Wishlists.Where(wishlist => wishlist.WishlistID == key));
        }

        // PUT: odata/Wishlists(5)
        public IHttpActionResult Put([FromODataUri] int key, Delta<Wishlist> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Wishlist wishlist = db.Wishlists.Find(key);
            if (wishlist == null)
            {
                return NotFound();
            }

            patch.Put(wishlist);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WishlistExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(wishlist);
        }

        // POST: odata/Wishlists
        public IHttpActionResult Post(Wishlist wishlist)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Wishlists.Add(wishlist);
            db.SaveChanges();

            return Created(wishlist);
        }

        // PATCH: odata/Wishlists(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch([FromODataUri] int key, Delta<Wishlist> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Wishlist wishlist = db.Wishlists.Find(key);
            if (wishlist == null)
            {
                return NotFound();
            }

            patch.Patch(wishlist);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WishlistExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(wishlist);
        }

        // DELETE: odata/Wishlists(5)
        public IHttpActionResult Delete([FromODataUri] int key)
        {
            Wishlist wishlist = db.Wishlists.Find(key);
            if (wishlist == null)
            {
                return NotFound();
            }

            db.Wishlists.Remove(wishlist);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // GET: odata/Wishlists(5)/Customer
        [EnableQuery]
        public SingleResult<Customer> GetCustomer([FromODataUri] int key)
        {
            return SingleResult.Create(db.Wishlists.Where(m => m.WishlistID == key).Select(m => m.Customer));
        }

        // GET: odata/Wishlists(5)/Product
        [EnableQuery]
        public SingleResult<Product> GetProduct([FromODataUri] int key)
        {
            return SingleResult.Create(db.Wishlists.Where(m => m.WishlistID == key).Select(m => m.Product));
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool WishlistExists(int key)
        {
            return db.Wishlists.Count(e => e.WishlistID == key) > 0;
        }
    }
}
