/// <reference path="../app.js" />

app.factory('sunglassSvc', function ($resource) {

    var odataUrlProduct = "http://localhost:2454/odata/Products";
    var odataUrlCategory = "http://localhost:2454/odata/Categories";
    var odataUrlCustomer = "http://localhost:2454/odata/Customers";
    var odataUrlSupplier = "http://localhost:2454/odata/Suppliers";
    var odataUrlSubCategory = "http://localhost:2454/odata/SubCategories";
    var odataUrlOrder = "http://localhost:2454/odata/Orders";
    var odataUrlOrderDetail = "http://localhost:2454/odata/OrderDetails";
    var odataUrlPayment = "http://localhost:2454/odata/Payments";
    var odataUrlPaymentType = "http://localhost:2454/odata/PaymentTypes";
    var odataUrlShippingDetail = "http://localhost:2454/odata/ShippingDetails";
    var odataUrlRecentlyView = "http://localhost:2454/odata/RecentlyViews";
    var odataUrlReview = "http://localhost:2454/odata/Reviews";
    var odataUrlWishlist = "http://localhost:2454/odata/Wishlists";
    var odataUrlAdmin_Login = "http://localhost:2454/odata/Admin_Login";
    var odataUrlAdmin_Employee = "http://localhost:2454/odata/Admin_Employee";
    var odataUrlRole = "http://localhost:2454/odata/Roles";

    var ApiUrlProductView = "http://localhost:2454/api/vw_ViewProducts";

    return $resource("", {}, {
        //Product
        'getallProduct': { method: 'GET', url: odataUrlProduct },
        'saveProduct': { method: 'POST', url: odataUrlProduct },
        'updateProduct': { method: 'PUT', params: { key: "@key" }, url: odataUrlProduct + "(:key)" },
        'searchProduct': { method: 'GET', params: { key: "@key" }, url: odataUrlProduct + "(:key)" },
        'deleteProduct': { method: 'DELETE', params: { key: "@key" }, url: odataUrlProduct + "(:key)" },

        //Customer
        'getallCustomer': { method: 'GET', url: odataUrlCustomer },
        'saveCustomer': { method: 'POST', url: odataUrlCustomer },
        'updateCustomer': { method: 'PUT', params: { key: "@key" }, url: odataUrlCustomer + "(:key)" },
        'searchCustomer': { method: 'GET', params: { key: "@key" }, url: odataUrlCustomer + "(:key)" },
        'deleteCustomer': { method: 'DELETE', params: { key: "@key" }, url: odataUrlCustomer + "(:key)" },

        //Category
        'getallCategory': { method: 'GET', url: odataUrlCategory },
        'saveCategory': { method: 'POST', url: odataUrlCategory },
        'updateCategory': { method: 'PUT', params: { key: "@key" }, url: odataUrlCategory + "(:key)" },
        'searchCategory': { method: 'GET', params: { key: "@key" }, url: odataUrlCategory + "(:key)" },
        'deleteCategory': { method: 'DELETE', params: { key: "@key" }, url: odataUrlCategory + "(:key)" },

        //Supplier
        'getallSupplier': { method: 'GET', url: odataUrlSupplier },
        'saveSupplier': { method: 'POST', url: odataUrlSupplier },
        'updateSupplier': { method: 'PUT', params: { key: "@key" }, url: odataUrlSupplier + "(:key)" },
        'searchSupplier': { method: 'GET', params: { key: "@key" }, url: odataUrlSupplier + "(:key)" },
        'deleteSupplier': { method: 'DELETE', params: { key: "@key" }, url: odataUrlSupplier + "(:key)" },

        //SubCategory
        'getallSubCategory': { method: 'GET', url: odataUrlSubCategory },
        'saveSubCategory': { method: 'POST', url: odataUrlSubCategory },
        'updateSubCategory': { method: 'PUT', params: { key: "@key" }, url: odataUrlSubCategory + "(:key)" },
        'searchSubCategory': { method: 'GET', params: { key: "@key" }, url: odataUrlSubCategory + "(:key)" },
        'deleteSubCategory': { method: 'DELETE', params: { key: "@key" }, url: odataUrlSubCategory + "(:key)" },

        //Order
        'getallOrder': { method: 'GET', url: odataUrlOrder },
        'saveOrder': { method: 'POST', url: odataUrlOrder },
        'updateOrder': { method: 'PUT', params: { key: "@key" }, url: odataUrlOrder + "(:key)" },
        'searchOrder': { method: 'GET', params: { key: "@key" }, url: odataUrlOrder + "(:key)" },
        'deleteOrder': { method: 'DELETE', params: { key: "@key" }, url: odataUrlOrder + "(:key)" },

        //OrderDetail
        'getallOrderDetail': { method: 'GET', url: odataUrlOrderDetail },
        'saveOrderDetail': { method: 'POST', url: odataUrlOrderDetail },
        'updateOrderDetail': { method: 'PUT', params: { key: "@key" }, url: odataUrlOrderDetail + "(:key)" },
        'searchOrderDetail': { method: 'GET', params: { key: "@key" }, url: odataUrlOrderDetail + "(:key)" },
        'deleteOrderDetail': { method: 'DELETE', params: { key: "@key" }, url: odataUrlOrderDetail + "(:key)" },

        //Payment
        'getallPayment': { method: 'GET', url: odataUrlPayment },
        'savePayment': { method: 'POST', url: odataUrlPayment },
        'updatePayment': { method: 'PUT', params: { key: "@key" }, url: odataUrlPayment + "(:key)" },
        'searchPayment': { method: 'GET', params: { key: "@key" }, url: odataUrlPayment + "(:key)" },
        'deletePayment': { method: 'DELETE', params: { key: "@key" }, url: odataUrlPayment + "(:key)" },

        //PaymentType
        'getallPaymentType': { method: 'GET', url: odataUrlPaymentType },
        'savePaymentType': { method: 'POST', url: odataUrlPaymentType },
        'updatePaymentType': { method: 'PUT', params: { key: "@key" }, url: odataUrlPaymentType + "(:key)" },
        'searchPaymentType': { method: 'GET', params: { key: "@key" }, url: odataUrlPaymentType + "(:key)" },
        'deletePaymentType': { method: 'DELETE', params: { key: "@key" }, url: odataUrlPaymentType + "(:key)" },

        //ShippingDetail
        'getallShippingDetail': { method: 'GET', url: odataUrlShippingDetail },
        'saveShippingDetail': { method: 'POST', url: odataUrlShippingDetail },
        'updateShippingDetail': { method: 'PUT', params: { key: "@key" }, url: odataUrlShippingDetail + "(:key)" },
        'searchShippingDetail': { method: 'GET', params: { key: "@key" }, url: odataUrlShippingDetail + "(:key)" },
        'deleteShippingDetail': { method: 'DELETE', params: { key: "@key" }, url: odataUrlShippingDetail + "(:key)" },

        //RecentlyView
        'getallRecentlyView': { method: 'GET', url: odataUrlRecentlyView },
        'saveRecentlyView': { method: 'POST', url: odataUrlRecentlyView },
        'updateRecentlyView': { method: 'PUT', params: { key: "@key" }, url: odataUrlRecentlyView + "(:key)" },
        'searchRecentlyView': { method: 'GET', params: { key: "@key" }, url: odataUrlRecentlyView + "(:key)" },
        'deleteRecentlyView': { method: 'DELETE', params: { key: "@key" }, url: odataUrlRecentlyView + "(:key)" },

        //Review
        'getallReview': { method: 'GET', url: odataUrlReview },
        'saveReview': { method: 'POST', url: odataUrlReview },
        'updateReview': { method: 'PUT', params: { key: "@key" }, url: odataUrlReview + "(:key)" },
        'searchReview': { method: 'GET', params: { key: "@key" }, url: odataUrlReview + "(:key)" },
        'deleteReview': { method: 'DELETE', params: { key: "@key" }, url: odataUrlReview + "(:key)" },

        //Wishlist
        'getallWishlist': { method: 'GET', url: odataUrlWishlist },
        'saveWishlist': { method: 'POST', url: odataUrlWishlist },
        'updateWishlist': { method: 'PUT', params: { key: "@key" }, url: odataUrlWishlist + "(:key)" },
        'searchWishlist': { method: 'GET', params: { key: "@key" }, url: odataUrlWishlist + "(:key)" },
        'deleteWishlist': { method: 'DELETE', params: { key: "@key" }, url: odataUrlWishlist + "(:key)" },

        //Admin_Login
        'getallAdmin_Login': { method: 'GET', url: odataUrlAdmin_Login },
        'saveAdmin_Login': { method: 'POST', url: odataUrlAdmin_Login },
        'updateAdmin_Login': { method: 'PUT', params: { key: "@key" }, url: odataUrlAdmin_Login + "(:key)" },
        'searchAdmin_Login': { method: 'GET', params: { key: "@key" }, url: odataUrlAdmin_Login + "(:key)" },
        'deleteAdmin_Login': { method: 'DELETE', params: { key: "@key" }, url: odataUrlAdmin_Login + "(:key)" },

        //Admin_Employee
        'getallAdmin_Employee': { method: 'GET', url: odataUrlAdmin_Employee },
        'saveAdmin_Employee': { method: 'POST', url: odataUrlAdmin_Employee },
        'updateAdmin_Employee': { method: 'PUT', params: { key: "@key" }, url: odataUrlAdmin_Employee + "(:key)" },
        'searchAdmin_Employee': { method: 'GET', params: { key: "@key" }, url: odataUrlAdmin_Employee + "(:key)" },
        'deleteAdmin_Employee': { method: 'DELETE', params: { key: "@key" }, url: odataUrlAdmin_Employee + "(:key)" },

        //Role
        'getallRole': { method: 'GET', url: odataUrlRole },
        'saveRole': { method: 'POST', url: odataUrlRole },
        'updateRole': { method: 'PUT', params: { key: "@key" }, url: odataUrlRole + "(:key)" },
        'searchRole': { method: 'GET', params: { key: "@key" }, url: odataUrlRole + "(:key)" },
        'deleteRole': { method: 'DELETE', params: { key: "@key" }, url: odataUrlRole + "(:key)" },

        //Product View
        'getallProductView': { method: 'GET', url: ApiUrlProductView },
    });
});


