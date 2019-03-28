using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using Microsoft.Owin.Security.OAuth;
using System.Web.Http.OData.Builder;
using System.Web.Http.OData.Extensions;
using SunglassStoreServer.Models;
using Newtonsoft.Json.Serialization;
using System.Web.Http.Cors;

namespace SunglassStoreServer
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            //var cors = new EnableCorsAttribute("http://localhost:2295/", "*", "*");
            //cors.SupportsCredentials = true;
            config.EnableCors();
            // Web API configuration and services

           
            ODataConventionModelBuilder builder = new ODataConventionModelBuilder();
            builder.EntitySet<Product>("Products");
            builder.EntitySet<Category>("Categories"); 
            builder.EntitySet<OrderDetail>("OrderDetails"); 
            builder.EntitySet<Supplier>("Suppliers"); 
            builder.EntitySet<RecentlyView>("RecentlyViews"); 
            builder.EntitySet<Review>("Reviews"); 
            builder.EntitySet<Wishlist>("Wishlists");
            builder.EntitySet<Admin_Employee>("Admin_Employee");
            builder.EntitySet<Admin_Login>("Admin_Login");
            builder.EntitySet<Role>("Roles");
            builder.EntitySet<SubCategory>("SubCategories");
            builder.EntitySet<Customer>("Customers");
            builder.EntitySet<Order>("Orders");
            builder.EntitySet<Payment>("Payments");
            builder.EntitySet<ShippingDetail>("ShippingDetails");
            builder.EntitySet<PaymentType>("PaymentTypes"); 

            config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());

            // Configure Web API to use only bearer token authentication.
            config.SuppressDefaultHostAuthentication();
            config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
