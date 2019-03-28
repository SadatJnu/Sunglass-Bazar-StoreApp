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
    builder.EntitySet<PaymentType>("PaymentTypes");
    builder.EntitySet<Payment>("Payments"); 
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
          [EnableCors("*", "*", "*")]

    public class PaymentTypesController : ODataController
    {
        private SunglassBazarEntities db = new SunglassBazarEntities();

        // GET: odata/PaymentTypes
        [EnableQuery]
        public IQueryable<PaymentType> GetPaymentTypes()
        {
            return db.PaymentTypes;
        }

        // GET: odata/PaymentTypes(5)
        [EnableQuery]
        public SingleResult<PaymentType> GetPaymentType([FromODataUri] int key)
        {
            return SingleResult.Create(db.PaymentTypes.Where(paymentType => paymentType.PayTypeID == key));
        }

        // PUT: odata/PaymentTypes(5)
        public IHttpActionResult Put([FromODataUri] int key, Delta<PaymentType> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            PaymentType paymentType = db.PaymentTypes.Find(key);
            if (paymentType == null)
            {
                return NotFound();
            }

            patch.Put(paymentType);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PaymentTypeExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(paymentType);
        }

        // POST: odata/PaymentTypes
        public IHttpActionResult Post(PaymentType paymentType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.PaymentTypes.Add(paymentType);
            db.SaveChanges();

            return Created(paymentType);
        }

        // PATCH: odata/PaymentTypes(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch([FromODataUri] int key, Delta<PaymentType> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            PaymentType paymentType = db.PaymentTypes.Find(key);
            if (paymentType == null)
            {
                return NotFound();
            }

            patch.Patch(paymentType);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PaymentTypeExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(paymentType);
        }

        // DELETE: odata/PaymentTypes(5)
        public IHttpActionResult Delete([FromODataUri] int key)
        {
            PaymentType paymentType = db.PaymentTypes.Find(key);
            if (paymentType == null)
            {
                return NotFound();
            }

            db.PaymentTypes.Remove(paymentType);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // GET: odata/PaymentTypes(5)/Payments
        [EnableQuery]
        public IQueryable<Payment> GetPayments([FromODataUri] int key)
        {
            return db.PaymentTypes.Where(m => m.PayTypeID == key).SelectMany(m => m.Payments);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PaymentTypeExists(int key)
        {
            return db.PaymentTypes.Count(e => e.PayTypeID == key) > 0;
        }
    }
}
