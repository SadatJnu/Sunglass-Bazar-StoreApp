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
    builder.EntitySet<Customer>("Customers");
    builder.EntitySet<Order>("Orders"); 
    builder.EntitySet<RecentlyView>("RecentlyViews"); 
    builder.EntitySet<Review>("Reviews"); 
    builder.EntitySet<Wishlist>("Wishlists"); 
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
          [EnableCors("*", "*", "*")]

    public class CustomersController : ODataController
    {
        private SunglassBazarEntities db = new SunglassBazarEntities();

        // GET: odata/Customers
        [EnableQuery]
        public IQueryable<Customer> GetCustomers()
        {
            return db.Customers;
        }

        // GET: odata/Customers(5)
        [EnableQuery]
        public SingleResult<Customer> GetCustomer([FromODataUri] int key)
        {
            return SingleResult.Create(db.Customers.Where(customer => customer.CustomerID == key));
        }

        // PUT: odata/Customers(5)
        public IHttpActionResult Put([FromODataUri] int key, Delta<Customer> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Customer customer = db.Customers.Find(key);
            if (customer == null)
            {
                return NotFound();
            }

            patch.Put(customer);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(customer);
        }

        // POST: odata/Customers
        public IHttpActionResult Post(Customer customer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Customers.Add(customer);
            db.SaveChanges();

            return Created(customer);
        }

        // PATCH: odata/Customers(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch([FromODataUri] int key, Delta<Customer> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Customer customer = db.Customers.Find(key);
            if (customer == null)
            {
                return NotFound();
            }

            patch.Patch(customer);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(customer);
        }

        // DELETE: odata/Customers(5)
        public IHttpActionResult Delete([FromODataUri] int key)
        {
            Customer customer = db.Customers.Find(key);
            if (customer == null)
            {
                return NotFound();
            }

            db.Customers.Remove(customer);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // GET: odata/Customers(5)/Orders
        [EnableQuery]
        public IQueryable<Order> GetOrders([FromODataUri] int key)
        {
            return db.Customers.Where(m => m.CustomerID == key).SelectMany(m => m.Orders);
        }

        // GET: odata/Customers(5)/RecentlyViews
        [EnableQuery]
        public IQueryable<RecentlyView> GetRecentlyViews([FromODataUri] int key)
        {
            return db.Customers.Where(m => m.CustomerID == key).SelectMany(m => m.RecentlyViews);
        }

        // GET: odata/Customers(5)/Reviews
        [EnableQuery]
        public IQueryable<Review> GetReviews([FromODataUri] int key)
        {
            return db.Customers.Where(m => m.CustomerID == key).SelectMany(m => m.Reviews);
        }

        // GET: odata/Customers(5)/Wishlists
        [EnableQuery]
        public IQueryable<Wishlist> GetWishlists([FromODataUri] int key)
        {
            return db.Customers.Where(m => m.CustomerID == key).SelectMany(m => m.Wishlists);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CustomerExists(int key)
        {
            return db.Customers.Count(e => e.CustomerID == key) > 0;
        }
    }
}
