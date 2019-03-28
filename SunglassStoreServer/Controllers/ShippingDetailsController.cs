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
    builder.EntitySet<ShippingDetail>("ShippingDetails");
    builder.EntitySet<Order>("Orders"); 
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
          [EnableCors("*", "*", "*")]

    public class ShippingDetailsController : ODataController
    {
        private SunglassBazarEntities db = new SunglassBazarEntities();

        // GET: odata/ShippingDetails
        [EnableQuery]
        public IQueryable<ShippingDetail> GetShippingDetails()
        {
            return db.ShippingDetails;
        }

        // GET: odata/ShippingDetails(5)
        [EnableQuery]
        public SingleResult<ShippingDetail> GetShippingDetail([FromODataUri] int key)
        {
            return SingleResult.Create(db.ShippingDetails.Where(shippingDetail => shippingDetail.ShippingID == key));
        }

        // PUT: odata/ShippingDetails(5)
        public IHttpActionResult Put([FromODataUri] int key, Delta<ShippingDetail> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            ShippingDetail shippingDetail = db.ShippingDetails.Find(key);
            if (shippingDetail == null)
            {
                return NotFound();
            }

            patch.Put(shippingDetail);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ShippingDetailExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(shippingDetail);
        }

        // POST: odata/ShippingDetails
        public IHttpActionResult Post(ShippingDetail shippingDetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ShippingDetails.Add(shippingDetail);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (ShippingDetailExists(shippingDetail.ShippingID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return Created(shippingDetail);
        }

        // PATCH: odata/ShippingDetails(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch([FromODataUri] int key, Delta<ShippingDetail> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            ShippingDetail shippingDetail = db.ShippingDetails.Find(key);
            if (shippingDetail == null)
            {
                return NotFound();
            }

            patch.Patch(shippingDetail);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ShippingDetailExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(shippingDetail);
        }

        // DELETE: odata/ShippingDetails(5)
        public IHttpActionResult Delete([FromODataUri] int key)
        {
            ShippingDetail shippingDetail = db.ShippingDetails.Find(key);
            if (shippingDetail == null)
            {
                return NotFound();
            }

            db.ShippingDetails.Remove(shippingDetail);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // GET: odata/ShippingDetails(5)/Orders
        [EnableQuery]
        public IQueryable<Order> GetOrders([FromODataUri] int key)
        {
            return db.ShippingDetails.Where(m => m.ShippingID == key).SelectMany(m => m.Orders);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ShippingDetailExists(int key)
        {
            return db.ShippingDetails.Count(e => e.ShippingID == key) > 0;
        }
    }
}
