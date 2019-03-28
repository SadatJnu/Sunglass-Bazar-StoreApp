using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;
using System.Linq;
using System.Web;

namespace SunglassStoreServer.ViewModels
{
    public partial class vw_ViewProduct
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]

        public int ProductID { get; set; }
        public string Name { get; set; }
        public int SupplierID { get; set; }
        public string CompanyName { get; set; }
        public int CategoryID { get; set; }
        public string CategoryName { get; set; }
        public int? SubCategoryID { get; set; }
        public string SubCategoryName { get; set; }
        public int QuantityPerUnit { get; set; }
        public decimal UnitPrice { get; set; }
        public Nullable<decimal> OldPrice { get; set; }
        public string UnitWeight { get; set; }
        public string Size { get; set; }
        public Nullable<decimal> Discount { get; set; }
        public Nullable<int> UnitInStock { get; set; }
        public Nullable<int> UnitOnOrder { get; set; }
        public Nullable<bool> ProductAvailable { get; set; }
        public string ImageURL { get; set; }
        public string AltText { get; set; }
        public Nullable<bool> AddBadge { get; set; }
        public string OfferTitle { get; set; }
        public string OfferBadgeClass { get; set; }
        public string ShortDescription { get; set; }
        public string LongDescription { get; set; }
        public string Picture1 { get; set; }
        public string Picture2 { get; set; }
        public string Picture3 { get; set; }
        public string Picture4 { get; set; }
        public string Note { get; set; }
    }
}