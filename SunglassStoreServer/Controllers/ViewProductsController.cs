using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using SunglassStoreServer.Models;
using SunglassStoreServer.ViewModels;
using System.Web.Http.Cors;

namespace KidsGalleryServer.Controllers.OdataController
{
    [EnableCors("*", "*", "*")]
    public class vw_ViewProductsController : ApiController
    {
        SunglassBazarEntities db = new SunglassBazarEntities();
        [HttpGet]
        public IQueryable<vw_ViewProduct> GetAllProductView()
        {
            var query = db.Products.Select(d => new vw_ViewProduct
            {
                ProductID = d.ProductID,
                Name = d.Name,
                SupplierID = d.SupplierID,
                CompanyName = d.Supplier.CompanyName,
                CategoryID = d.CategoryID,
                CategoryName = d.Category.Name,
                SubCategoryID = d.SubCategoryID,
                SubCategoryName = d.SubCategory.Name,
                QuantityPerUnit = d.QuantityPerUnit,
                UnitPrice = d.UnitPrice,
                OldPrice = d.OldPrice,
                UnitWeight = d.UnitWeight,
                Size = d.Size,
                Discount = d.Discount,
                UnitInStock = d.UnitInStock,
                UnitOnOrder = d.UnitOnOrder,
                ProductAvailable = d.ProductAvailable,
                ImageURL = d.ImageURL,
                AltText = d.AltText,
                AddBadge = d.AddBadge,
                OfferTitle = d.OfferTitle,
                OfferBadgeClass = d.OfferBadgeClass,
                ShortDescription = d.ShortDescription,
                LongDescription = d.LongDescription,
                Picture1 = d.Picture1,
                Picture2 = d.Picture2,
                Picture3 = d.Picture3,
                Picture4 = d.Picture4,
                Note = d.Note
            });
            return query.AsQueryable();
        }

    }
}
