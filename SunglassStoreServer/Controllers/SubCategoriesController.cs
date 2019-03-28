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
    builder.EntitySet<SubCategory>("SubCategories");
    builder.EntitySet<Category>("Categories"); 
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
          [EnableCors("*", "*", "*")]

    public class SubCategoriesController : ODataController
    {
        private SunglassBazarEntities db = new SunglassBazarEntities();

        // GET: odata/SubCategories
        [EnableQuery]
        public IQueryable<SubCategory> GetSubCategories()
        {
            return db.SubCategories;
        }

        // GET: odata/SubCategories(5)
        [EnableQuery]
        public SingleResult<SubCategory> GetSubCategory([FromODataUri] int key)
        {
            return SingleResult.Create(db.SubCategories.Where(subCategory => subCategory.SubCategoryID == key));
        }

        // PUT: odata/SubCategories(5)
        public IHttpActionResult Put([FromODataUri] int key, Delta<SubCategory> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            SubCategory subCategory = db.SubCategories.Find(key);
            if (subCategory == null)
            {
                return NotFound();
            }

            patch.Put(subCategory);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SubCategoryExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(subCategory);
        }

        // POST: odata/SubCategories
        public IHttpActionResult Post(SubCategory subCategory)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.SubCategories.Add(subCategory);
            db.SaveChanges();

            return Created(subCategory);
        }

        // PATCH: odata/SubCategories(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch([FromODataUri] int key, Delta<SubCategory> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            SubCategory subCategory = db.SubCategories.Find(key);
            if (subCategory == null)
            {
                return NotFound();
            }

            patch.Patch(subCategory);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SubCategoryExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(subCategory);
        }

        // DELETE: odata/SubCategories(5)
        public IHttpActionResult Delete([FromODataUri] int key)
        {
            SubCategory subCategory = db.SubCategories.Find(key);
            if (subCategory == null)
            {
                return NotFound();
            }

            db.SubCategories.Remove(subCategory);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // GET: odata/SubCategories(5)/Category
        [EnableQuery]
        public SingleResult<Category> GetCategory([FromODataUri] int key)
        {
            return SingleResult.Create(db.SubCategories.Where(m => m.SubCategoryID == key).Select(m => m.Category));
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool SubCategoryExists(int key)
        {
            return db.SubCategories.Count(e => e.SubCategoryID == key) > 0;
        }
    }
}
