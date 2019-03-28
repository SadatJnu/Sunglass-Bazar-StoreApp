/// <reference path="../app.js" />
/// <reference path="../Factory/sunglassSvc.js" />


app.controller('sunglassCtrl', function ($scope, sunglassSvc, $http) {

    //--------------- Shopping Cart -------------------------------
    $scope.cartItems = [];
    currentCart = {};
    var TotalPrice = 0;
    var TotalQuantity = 0;
    //--------------------------Decrement-------------------------------------
    $scope.Decrement = function (m) {
        currentCart.ProductID = m.ProductID;
        currentCart.Name = m.Name;
        currentCart.QuantityPerUnit = 1;
        currentCart.UnitPrice = m.UnitPrice;
        currentCart.mUnitPrice = m.UnitPrice;

        if ($scope.cartItems.length == 0) {
            $scope.cartItems.push(currentCart);
        }
        else {

            if (!decheck(currentCart.ProductID, 1))
                $scope.cartItems.push(currentCart);
        }

        currentCart = {};
        calculate();
    };

    var decheck = function (idn, f) {
        var found = false;
        for (var i = 0; i < $scope.cartItems.length; i++) {
            if ($scope.cartItems[i].ProductID == idn) {
                $scope.cartItems[i].QuantityPerUnit -= f;
                $scope.cartItems[i].mUnitPrice = $scope.cartItems[i].UnitPrice * $scope.cartItems[i].QuantityPerUnit;
                found = true;
                break;
            }
        }
        return found;
    }
    //--------------------------Increment-------------------------------------
    $scope.insertCart = function (m) {
        currentCart.ProductID = m.ProductID;
        currentCart.Name = m.Name;
        currentCart.QuantityPerUnit = 1;
        currentCart.UnitPrice = m.UnitPrice;
        currentCart.mUnitPrice = m.UnitPrice;

        if ($scope.cartItems.length == 0) {
            $scope.cartItems.push(currentCart);
        }
        else {

            if (!check(currentCart.ProductID, 1))
                $scope.cartItems.push(currentCart);
        }

        currentCart = {};
        calculate();
    };

    var check = function (idn, f) {
        var found = false;
        for (var i = 0; i < $scope.cartItems.length; i++) {
            if ($scope.cartItems[i].ProductID == idn) {
                $scope.cartItems[i].QuantityPerUnit += f;
                $scope.cartItems[i].mUnitPrice = $scope.cartItems[i].UnitPrice * $scope.cartItems[i].QuantityPerUnit;
                found = true;
                break;
            }
        }
        return found;
    }

    var calculate = function () {
        var gt = 0;
        var tm = 0;
        for (var i = 0; i < $scope.cartItems.length; i++) {
            tm += $scope.cartItems[i].QuantityPerUnit;
            gt += $scope.cartItems[i].mUnitPrice;
        }
        $scope.TotalQuantity = tm;
        $scope.TotalPrice = gt;
        TotalPrice = gt;
        TotalQuantity = tm;
    }

    $scope.removeCart = function (m) {

        $scope.cartItems.splice($scope.cartItems.indexOf(m), 1);
        calculate();
    };
    $scope.clearCart = function () {

        $scope.cartItems.splice($scope.cartItems);
        calculate();
    };
    //-------------------------------------------------------------


    //----------------------Customer-----------------------------------
    $scope.getallCustomer = function () {
        (new sunglassSvc()).$getallCustomer()
        .then(function (data) {
            $scope.customers = data.value;
        });
    }

    $scope.saveCustomer = function () {
        var newData = $scope.customer;
        return (new sunglassSvc({
            "FirstName": newData.FirstName,
            "LastName": newData.LastName,
            "UserName": newData.UserName,
            "Password": newData.Password,
            "Age": newData.Age,
            "Gender": newData.Gender,
            "DateofBirth": newData.DateofBirth,
            "Occupation": newData.Occupation,
            "Organization": newData.Organization,
            "City": newData.City,
            "PostalCode": newData.PostalCode,
            "[State/Division]": newData.State/Division,
            "NationalID": newData.NationalID,
            "Country": newData.Country,
            "Email": newData.Email,
            "AltEmail": newData.AltEmail,
            "Phone1": newData.Phone1,
            "Phone2": newData.Phone2,
            "Address1": newData.Address1,
            "Address2": newData.Address2,
            "Picture": newData.Picture,
            "LastLogin": newData.LastLogin,
            "Created": newData.Created,
            "Notes": newData.Notes
        })).$saveCustomer()
        .then(function (data) {
            $scope.customer = {};
            $scope.getallCustomer();
        });
    }

    $scope.searchCustomer = function () {
        var con = this.com;
        return (new sunglassSvc({

        })).$searchCustomer({ key: con.CustomerID })
        .then(function (data) {
            $scope.customer = data;
        });
    }

    $scope.updateCustomer = function () {
        var con = this.customer;
        if (con) {
            (new sunglassSvc({
                "FirstName":con.FirstName,
                "LastName": con.LastName,
                "UserName": con.UserName,
                "Password": con.Password,
                "Age": con.Age,
                "Gender": con.Gender,
                "DateofBirth": con.DateofBirth,
                "Occupation": con.Occupation,
                "Organization": con.Organization,
                "City": con.City,
                "PostalCode": con.PostalCode,
                "[State/Division]": con.State/Division,
                "NationalID": con.NationalID,
                "Country": con.Country,
                "Email": con.Email,
                "AltEmail": con.AltEmail,
                "Phone1": con.Phone1,
                "Phone2": con.Phone2,
                "Address1": con.Address1,
                "Address2": con.Address2,
                "Picture": con.Picture,
                "LastLogin": con.LastLogin,
                "Created": con.Created,
                "Notes": con.Notes
            })).$updateCustomer({ key: con.CustomerID })
             .then(function (data) {
            $scope.customer = {};
            $scope.getallCustomer();

        });
        }
    }

    $scope.deleteCustomer = function () {
        var con = this.customer;
        if (confirm('Are you sure?')) {
            var con = this.com;
            return (new sunglassSvc({

            })).$deleteCustomer({ key: con.CustomerID })
        .then(function (data) {
            $scope.getallCustomer();

        });
        }
    }
    //----------------------Product-----------------------------------
    $scope.getallProduct = function () {
        (new sunglassSvc()).$getallProduct()
        .then(function (data) {
            $scope.products = data.value;
          //  $scope.showProduct(); // extra line
        });
    }

    $scope.saveProduct = function () {
        var pic1ToLoad = document.getElementById('pic1');
        var image1DataUrl = ConvertImageToBase64(pic1ToLoad, 'pic1');

        var pic2ToLoad = document.getElementById('pic2');
        var image2DataUrl = ConvertImageToBase64(pic2ToLoad, 'pic2');

        var pic3ToLoad = document.getElementById('pic3');
        var image3DataUrl = ConvertImageToBase64(pic3ToLoad, 'pic3');

        var pic4ToLoad = document.getElementById('pic4');
        var image4DataUrl = ConvertImageToBase64(pic1ToLoad, 'pic4');

        var newData = $scope.product;
        newData.Picture1 = image1DataUrl;
        newData.Picture2 = image2DataUrl;
        newData.Picture3 = image3DataUrl;
        newData.Picture4 = image4DataUrl;
        return (new sunglassSvc({
         //   "ProductID": newData.ProductID,
            "Name": newData.Name,
            "SupplierID": newData.SupplierID,
            "CompanyName": newData.CompanyName,
            "CategoryID": newData.CategoryID,
            "CategoryName": newData.CategoryName,
            "SubCategoryID": newData.SubCategoryID,
            "SubCategoryName": newData.SubCategoryName,
            "QuantityPerUnit": newData.QuantityPerUnit,
            "UnitPrice": newData.UnitPrice,
            "OldPrice": newData.OldPrice, 
            "UnitWeight": newData.UnitWeight,
            "Size": newData.Size,
            "Discount": newData.Discount, 
            "UnitInStock": newData.UnitInStock,
            "UnitOnOrder": newData.UnitOnOrder,
            "ProductAvailable": newData.ProductAvailable,
            "ImageURL": newData.ImageURL,
            "AltText": newData.AltText,
            "AddBadge": newData.AddBadge,
            "OfferTitle": newData.OfferTitle,
            "OfferBadgeClass": newData.OfferBadgeClass,
            "ShortDescription": newData.ShortDescription,
            "LongDescription": newData.LongDescription,
            "Picture1": newData.Picture1,
            "Picture2": newData.Picture2,
            "Picture3": newData.Picture3,
            "Picture4": newData.Picture4,
            "Note": newData.Note
        })).$saveProduct()
        .then(function (data) {
            $scope.product = {};
            //$scope.getallProduct();
            $scope.showProduct();
        });
    }

    $scope.searchProduct = function () {
        var con = this.product;// com
        return (new sunglassSvc({

        })).$searchProduct({ key: con.ProductID })
        .then(function (data) {
            $scope.product = data;
        });
    }
    $scope.searchProductGrid = function () {
        $scope.product = this.pro;
    }

    $scope.updateProduct = function () {
        var pic1ToLoad = document.getElementById('pic1Update');
        var image1DataUrl = ConvertImageToBase64(pic1ToLoad, 'pic1Update');

        var pic2ToLoad = document.getElementById('pic2Update');
        var image2DataUrl = ConvertImageToBase64(pic2ToLoad, 'pic2Update');

        var pic3ToLoad = document.getElementById('pic3Update');
        var image3DataUrl = ConvertImageToBase64(pic3ToLoad, 'pic3Update');

        var pic4ToLoad = document.getElementById('pic4Update');
        var image4DataUrl = ConvertImageToBase64(pic1ToLoad, 'pic4Update');

        var con = this.pro;
        con.Picture1 = image1DataUrl;
        con.Picture2 = image2DataUrl;
        con.Picture3 = image3DataUrl;
        con.Picture4 = image4DataUrl;
        if (con) {
            (new sunglassSvc({
                "ProductID": con.ProductID,
                "Name": con.Name,
                "SupplierID": con.SupplierID,
                "CompanyName": con.CompanyName,
                "CategoryID": con.CategoryID,
                "CategoryName": con.CategoryName,
                "SubCategoryID": con.SubCategoryID,
                "SubCategoryName": newData.SubCategoryName,
                "QuantityPerUnit": con.QuantityPerUnit,
                "UnitPrice": parseDouble(con.UnitPrice, 10).toFixed(2),
                "OldPrice": parseDouble(con.OldPrice, 10).toFixed(2),
                "UnitWeight": con.UnitWeight,
                "Size": con.Size,
                "Discount": parseDouble(con.Discount, 10).toFixed(2),
                "UnitInStock": con.UnitInStock,
                "UnitOnOrder": con.UnitOnOrder,
                "ProductAvailable": con.ProductAvailable,
                "ImageURL": con.ImageURL,
                "AltText": con.AltText,
                "AddBadge": con.AddBadge,
                "OfferTitle": con.OfferTitle,
                "OfferBadgeClass": con.OfferBadgeClass,
                "ShortDescription": con.ShortDescription,
                "LongDescription": con.LongDescription,
                "Picture1": con.Picture1,
                "Picture2": con.Picture2,
                "Picture3": con.Picture3,
                "Picture4": con.Picture4,
                "Note": con.Note
            })).$updateProduct({ key: con.ProductID })
        .then(function (data) {
            $scope.product = {};
           // $scope.getallProduct();
            $scope.showProduct();
        });
        }
    }

    $scope.deleteProduct = function () {
        var con = this.product;
        if (confirm('Are you sure?')) {
            var con = this.pro;
            return (new sunglassSvc({

            })).$deleteProduct({ key: con.ProductID })
        .then(function (data) {
            //$scope.getallProduct();
            $scope.showProduct();
        });
        }
    }

    //---------------ProductView-----------------------------------------
    $scope.showProduct = function () {
        $http.get("http://localhost:2454/api/vw_ViewProducts")
        .then(function (response) {
            $scope.productView = response.data;
        }, function (response) {

        });

    }

    //----------------------Category-----------------------------------
    $scope.getallCategory = function () {
        (new sunglassSvc()).$getallCategory()
        .then(function (data) {
            $scope.categories = data.value;
           // $scope.showCategory();
        });
    }

    $scope.saveCategory = function () {
        var newData = $scope.category;
        return (new sunglassSvc({
         //   "CategoryID": newData.CategoryID,
            "Name": newData.Name,
            "Description": newData.Description,
            "isActive": newData.isActive

        })).$saveCategory()
        .then(function (data) {
            $scope.category = {};
            $scope.getallCategory();
          //  $scope.showCategory();
        });
    }

    $scope.searchCategory = function () {
        var con = this.com;//com
        return (new sunglassSvc({

        })).$searchCategory({ key: con.CategoryID })
        .then(function (data) {
            $scope.category = data;
        });
    }

    $scope.updateCategory = function () {
        var con = this.category;
        if (con) {
            (new sunglassSvc({
                "CategoryID": con.CategoryID,
                "Name": con.Name,
                "Description": con.Description,
                "isActive": con.isActive
            })).$updateCategory({ key: con.CategoryID })
        .then(function (data) {
            $scope.category = {};
            $scope.getallCategory();
           // $scope.showCategory();
        });
        }
    }

    $scope.deleteCategory = function () {
        var con = this.category;
        if (confirm('Are you sure?')) {
            var con = this.com;//com
            return (new sunglassSvc({

            })).$deleteCategory({ key: con.CategoryID })
        .then(function (data) {
           // $scope.getallCategory();
            $scope.showCategory();
        });
        }
    }

   //---------------------Category View-------------------------
    $scope.showCategory = function () {
        $http.get("http://localhost:2454/odata/categories")
        .then(function (response) {
            $scope.categoryView = response.data;
        }, function (response) {

        }) ;

    }

    //----------------------Supplier-----------------------------------
    $scope.getallSupplier = function () {
        (new sunglassSvc()).$getallSupplier()
        .then(function (data) {
            $scope.suppliers = data.value;
           // $scope.showSupplier();
        });
    }

    $scope.saveSupplier = function () {
        var newData = $scope.supplier;
        return (new sunglassSvc({
          //  "SupplierID": newData.SupplierID,
            "CompanyName": newData.CompanyName,
            "SupplierName": newData.SupplierName,
            "SupplierTitle": newData.SupplierTitle,
            "Address": newData.Address,
            "Mobile": newData.Mobile,
            "Phone": newData.Phone,
            "Fax": newData.Fax,
            "Email": newData.Email,
            "City": newData.City,
            "Country": newData.Country
        })).$saveSupplier()
        .then(function (data) {
            $scope.suppliers = {};
             $scope.getallSupplier();
           // $scope.showSupplier();
        });
    }

    $scope.searchSupplier = function () {
        var con = this.com;//com
        return (new sunglassSvc({

        })).$searchSupplier({ key: con.SupplierID })
        .then(function (data) {
            $scope.supplier = data;
        });
    }

    $scope.updateSupplier = function () {
        var con = this.supplier;
        if (con) {
            (new sunglassSvc({
                "SupplierID": con.SupplierID,
                "CompanyName": con.CompanyName,
                "SupplierName": con.SupplierName,
                "SupplierTitle": con.SupplierTitle,
                "Address": con.Address,
                "Mobile": con.Mobile,
                "Phone": con.Phone,
                "Fax": con.Fax,
                "Email": con.Email,
                "City": con.City,
                "Country": con.Country
            })).$updateSupplier({ key: con.SupplierID })
        .then(function (data) {
            $scope.supplier = {};
             $scope.getallSupplier();
            //$scope.showSupplier();

        });
        }
    }

    $scope.deleteSupplier = function () {
        var con = this.supplier;
        if (confirm('Are you sure?')) {
            var con = this.com;//com
            return (new sunglassSvc({

            })).$deleteSupplier({ key: con.SupplierID })
        .then(function (data) {
             $scope.getallSupplier();
          //  $scope.showSupplier();

        });
        }
    }
    //---------------------Supplier View-------------------------
    $scope.showSupplier = function () {
        $http.get("http://localhost:2454/odata/Suppliers")
        .then(function (response) {
            $scope.supplierView = response.data;
        }, function (response) {

        });
    }

    //----------------------SubCategory-----------------------------------
    $scope.getallSubCategory = function () {
        (new sunglassSvc()).$getallSubCategory()
        .then(function (data) {
            $scope.subCategories = data.value;
            //$scope.showSubCategory();
        });
    }

    $scope.saveSubCategory = function () {
        var newData = $scope.subCategory;
        return (new sunglassSvc({
           // "SubCategoryID": newData.SubCategoryID,
            "CategoryID": newData.CategoryID,
            "Name": newData.Name,
            "Description": newData.Description,
            "isActive": newData.isActive
        })).$saveSubCategory()
        .then(function (data) {
            $scope.subCategory = {};
             $scope.getallSubCategory();
          //  $scope.showSubCategory();
        });
    }

    $scope.searchSubCategory = function () {
        var con = this.com;//com
        return (new sunglassSvc({

        })).$searchSubCategory({ key: con.SubCategoryID })
        .then(function (data) {
            $scope.subCategory = data;
        });
    }

    $scope.updateSubCategory = function () {
        var con = this.subCategory;
        if (con) {
            (new sunglassSvc({
                "SubCategoryID": con.SubCategoryID,
                "CategoryID": con.CategoryID,
                "Name": con.Name,
                "Description": con.Description,
                "isActive": con.isActive
            })).$updateSubCategory({ key: con.SubCategoryID })
        .then(function (data) {
            $scope.subCategory = {};
             $scope.getallSubCategory();
           // $scope.showCategory();

        });
        }
    }

    $scope.deleteSubCategory = function () {
        var con = this.subCategory;
        if (confirm('Are you sure?')) {
            var con = this.com;//com
            return (new sunglassSvc({

            })).$deleteSubCategory({ key: con.SubCategoryID })
        .then(function (data) {
             $scope.getallSubCategory();
            //$scope.showCategory();
        });
        }
    }

    //---------------------SubCategory View-------------------------
    $scope.showSubCategory = function () {
        $http.get("http://localhost:2454/odata/SubCategories")
        .then(function (response) {
            $scope.subCategoryView = response.data;
        }, function (response) {

        });

    }
    //----------------------Order-----------------------------------
    $scope.getallOrder = function () {
        (new sunglassSvc()).$getallOrder()
        .then(function (data) {
            $scope.orders = data.value;
        });
    }

    $scope.saveOrder = function () {
        var newData = $scope.order;
        return (new sunglassSvc({
          //  "OrderID": newData.OrderID,
            "CustomerID": newData.CustomerID,
            "PaymentID": newData.PaymentID,
            "ShippingID": newData.ShippingID,
            "Discount": newData.Discount,
            "Taxes": newData.Taxes,
            "TotalAmount": newData.TotalAmount,
            "isCompleted": newData.isCompleted,
            "OrderDate": newData.OrderDate,
            "DIspatched": newData.DIspatched,
            "DispatchedDate": newData.DispatchedDate,
            "Shipped": newData.Shipped,
            "ShippingDate": newData.ShippingDate,
            "Deliver": newData.Deliver,
            "DeliveryDate": newData.DeliveryDate,
            "Notes": newData.Notes,
            "CancelOrder": newData.CancelOrder
        })).$saveOrder()
        .then(function (data) {
            $scope.order = {};
             $scope.getallOrder();
          //  $scope.showOrder();

        });
    }

    $scope.searchOrder = function () {
        var con = this.com;//com
        return (new sunglassSvc({

        })).$searchOrder({ key: con.OrderID })
        .then(function (data) {
            $scope.order = data;
        });
    }

    $scope.updateOrder = function () {
        var con = this.order;
        if (con) {
            (new sunglassSvc({
                "OrderID": con.OrderID,
                "CustomerID": con.CustomerID,
                "PaymentID": con.PaymentID,
                "ShippingID": con.ShippingID,
                "Discount": con.Discount,
                "Taxes": con.Taxes,
                "TotalAmount": con.TotalAmount,
                "isCompleted": con.isCompleted,
                "OrderDate": con.OrderDate,
                "DIspatched": con.DIspatched,
                "DispatchedDate": con.DispatchedDate,
                "Shipped": con.Shipped,
                "ShippingDate": con.ShippingDate,
                "Deliver": con.Deliver,
                "DeliveryDate": con.DeliveryDate,
                "Notes": con.Notes,
                "CancelOrder": con.CancelOrder
            })).$updateOrder({ key: con.OrderID })
        .then(function (data) {
            $scope.order = {};
           $scope.getallOrder();
          //  $scope.showOrder();
        });
        }
    }

    $scope.deleteOrder = function () {
        var con = this.order;
        if (confirm('Are you sure?')) {
            var con = this.com;//com
            return (new sunglassSvc({

            })).$deleteOrder({ key: con.OrderID })
        .then(function (data) {
           $scope.getallOrder();
           // $scope.showOrder();
        });
        }
    }

    //---------------------Orders View-------------------------
    $scope.showOrders = function () {
        $http.get("http://localhost:2454/odata/Orders")
        .then(function (response) {
            $scope.orderView = response.data;
        }, function (response) {

        });

    }

    //----------------------OrderDetail-----------------------------------
    $scope.getallOrderDetail = function () {
        (new sunglassSvc()).$getallOrderDetail()
        .then(function (data) {
            $scope.orderDetails = data.value;
        });
    }

    $scope.saveOrderDetail = function () {
        var newData = $scope.orderDetail;
        return (new sunglassSvc({
         //   "OrderDetailsID": newData.OrderDetailsID,
            "OrderID": newData.OrderID,
            "ProductID": newData.ProductID,
            "UnitPrice": newData.UnitPrice,
            "Quantity": newData.Quantity,
            "Discount": newData.Discount,
            "TotalAmount": newData.TotalAmount,
            "OrderDate": newData.OrderDate
        })).$saveOrderDetail()
        .then(function (data) {
            $scope.orderDetail = {};
             $scope.getallOrderDetail();
           // $scope.showOrderDetail();

        });
    }

    $scope.searchOrderDetail = function () {
        var con = this.com;//com
        return (new sunglassSvc({

        })).$searchOrderDetail({ key: con.OrderDetailsID })
        .then(function (data) {
            $scope.orderDetail = data;
        });
    }

    $scope.updateOrderDetail = function () {
        var con = this.orderDetail;
        if (con) {
            (new sunglassSvc({
                "OrderDetailsID": con.OrderDetailsID,
                "OrderID": con.OrderID,
                "ProductID": con.ProductID,
                "UnitPrice": con.UnitPrice,
                "Quantity": con.Quantity,
                "Discount": con.Discount,
                "TotalAmount": con.TotalAmount,
                "OrderDate": con.OrderDate
            })).$updateOrderDetail({ key: con.OrderDetailsID })
        .then(function (data) {
            $scope.orderDetail = {};
            $scope.getallOrderDetail();
            // $scope.showOrderDetail();
        });
        }
    }

    $scope.deleteOrderDetail = function () {
        var con = this.orderDetail;
        if (confirm('Are you sure?')) {
            var con = this.com;//com
            return (new sunglassSvc({

            })).$deleteOrderDetail({ key: con.OrderDetailsID })
        .then(function (data) {
              $scope.getallOrderDetail();
           // $scope.showOrderDetail();

        });
        }
    }

    //----------------------Payment-----------------------------------
    $scope.getallPayment = function () {
        (new sunglassSvc()).$getallPayment()
        .then(function (data) {
            $scope.payments = data.value;
        });
    }

    $scope.savePayment = function () {
        var newData = $scope.payment;
        return (new sunglassSvc({
        //    "PaymentID": newData.PaymentID,
            "Type": newData.Type,
            "CreditAmount": newData.CreditAmount,
            "DebitAmount": newData.DebitAmount,
            "Balance": newData.Balance,
            "PaymentDateTime": newData.PaymentDateTime
        })).$savePayment()
        .then(function (data) {
            $scope.payment = {};
           $scope.getallPayment();
          //  $scope.showPayment();

        });
    }

    $scope.searchPayment = function () {
        var con = this.com;//com
        return (new sunglassSvc({

        })).$searchPayment({ key: con.PaymentID })
        .then(function (data) {
            $scope.payment = data;
        });
    }

    $scope.updatePayment = function () {
        var con = this.payment;
        if (con) {
            (new sunglassSvc({
                "PaymentID": con.PaymentID,
                "Type": con.Type,
                "CreditAmount": con.CreditAmount,
                "DebitAmount": con.DebitAmount,
                "Balance": con.Balance,
                "PaymentDateTime": con.PaymentDateTime
            })).$updatePayment({ key: con.PaymentID })
        .then(function (data) {
            $scope.payment = {};
           $scope.getallPayment();
         //   $scope.showPayment();

        });
        }
    }

    $scope.deletePayment = function () {
        var con = this.payment;
        if (confirm('Are you sure?')) {
            var con = this.com;//com
            return (new sunglassSvc({

            })).$deletePayment({ key: con.PaymentID })
        .then(function (data) {
         $scope.getallPayment();
          //  $scope.showPayment();

        });
        }
    }

    //----------------------PaymentType-----------------------------------
    $scope.getallPaymentType = function () {
        (new sunglassSvc()).$getallPaymentType()
        .then(function (data) {
            $scope.paymentTypes = data.value;
        });
    }

    $scope.savePaymentType = function () {
        var newData = $scope.paymentType;
        return (new sunglassSvc({
           // "PayTypeID": newData.PayTypeID,
            "TypeName": newData.TypeName,
            "Description": newData.Description

        })).$savePaymentType()
        .then(function (data) {
            $scope.paymentType = {};
             $scope.getallPaymentType();
           // $scope.showPaymentType();

        });
    }

    $scope.searchPaymentType = function () {
        var con = this.com;//com
        return (new sunglassSvc({

        })).$searchPaymentType({ key: con.PayTypeID })
        .then(function (data) {
            $scope.paymentType = data;
        });
    }

    $scope.updatePaymentType = function () {
        var con = this.paymentType;
        if (con) {
            (new sunglassSvc({
                "PayTypeID": con.PayTypeID,
                "TypeName": con.TypeName,
                "Description": con.Description
            })).$updatePaymentType({ key: con.PayTypeID })
        .then(function (data) {
            $scope.paymentType = {};
             $scope.getallPaymentType();
           // $scope.showPaymentType();

        });
        }
    }

    $scope.deletePaymentType = function () {
        var con = this.paymentType;
        if (confirm('Are you sure?')) {
            var con = this.com;//com
            return (new sunglassSvc({

            })).$deletePaymentType({ key: con.PayTypeID })
        .then(function (data) {
            $scope.getallPaymentType();
            // $scope.showPaymentType();

        });
        }
    }

    //----------------------ShippingDetail-----------------------------------
    $scope.getallShippingDetail = function () {
        (new sunglassSvc()).$getallShippingDetail()
        .then(function (data) {
            $scope.shippingDetails = data.value;
        });
    }

    $scope.saveShippingDetail = function () {
        var newData = $scope.shippingDetail;
        return (new sunglassSvc({
          //  "ShippingID": newData.ShippingID,
            "FirstName": newData.FirstName,
            "LastName": newData.LastName,
            "Email": newData.Email,
            "Mobile": newData.Mobile,
            "Address": newData.Address,
            "City": newData.City,
            "PostCode": newData.PostCode,
            "Country": newData.Country

        })).$saveShippingDetail()
        .then(function (data) {
            $scope.shippingDetail = {};
            $scope.getallShippingDetail();
          //  $scope.showShippingDetail();

        });
    }

    $scope.searchShippingDetail = function () {
        var con = this.com;//com
        return (new sunglassSvc({

        })).$searchShippingDetail({ key: con.ShippingID })
        .then(function (data) {
            $scope.shippingDetail = data;
        });
    }

    $scope.updateShippingDetail = function () {
        var con = this.shippingDetail;
        if (con) {
            (new sunglassSvc({
                "ShippingID": con.ShippingID,
                "FirstName": con.FirstName,
                "LastName": con.LastName,
                "Email": con.Email,
                "Mobile": con.Mobile,
                "Address1": con.Address1,
                "City": con.City,
                "PostCode": con.PostCode,
                "Country": con.Country
            })).$updateShippingDetail({ key: con.ShippingID })
        .then(function (data) {
            $scope.shippingDetail = {};
            $scope.getallShippingDetail();
           // $scope.showShippingDetail();

        });
        }
    }

    $scope.deleteShippingDetail = function () {
        var con = this.shippingDetail;
        if (confirm('Are you sure?')) {
            var con = this.com;//com
            return (new sunglassSvc({

            })).$deleteShippingDetail({ key: con.ShippingID })
        .then(function (data) {
            $scope.getallShippingDetail();
           // $scope.showShippingDetail();

        });
        }
    }

    //----------------------RecentlyView-----------------------------------
    $scope.getallRecentlyView = function () {
        (new sunglassSvc()).$getallRecentlyView()
        .then(function (data) {
            $scope.recentlyViews = data.value;
        });
    }

    $scope.saveRecentlyView = function () {
        var newData = $scope.recentlyView;
        return (new sunglassSvc({
         //   "RViewID": newData.RViewID,
            "CustomerID": newData.CustomerID,
            "ProductID": newData.ProductID,
            "ViewDate": newData.ViewDate,
            "Note": newData.Note
        })).$saveRecentlyView()
        .then(function (data) {
            $scope.recentlyView = {};
            $scope.getallRecentlyView();
          //  $scope.showRecentlyView();

        });
    }

    $scope.searchRecentlyView = function () {
        var con = this.com;//com
        return (new sunglassSvc({

        })).$searchRecentlyView({ key: con.RViewID })
        .then(function (data) {
            $scope.recentlyView = data;
        });
    }

    $scope.updateRecentlyView = function () {
        var con = this.recentlyView;
        if (con) {
            (new sunglassSvc({
                "RViewID": con.RViewID,
                "CustomerID": con.CustomerID,
                "ProductID": con.ProductID,
                "ViewDate": con.ViewDate,
                "Note": con.Note
            })).$updateRecentlyView({ key: con.RViewID })
        .then(function (data) {
            $scope.recentlyView = {};
           $scope.getallRecentlyView();
            //$scope.showRecentlyView();

        });
        }
    }

    $scope.deleteRecentlyView = function () {
        var con = this.recentlyView;
        if (confirm('Are you sure?')) {
            var con = this.com;//com
            return (new sunglassSvc({

            })).$deleteRecentlyView({ key: con.RViewID })
        .then(function (data) {
          $scope.getallRecentlyView();
            //$scope.showRecentlyView();

        });
        }
    }

    //----------------------Review-----------------------------------
    $scope.getallReview = function () {
        (new sunglassSvc()).$getallReview()
        .then(function (data) {
            $scope.reviews = data.value;
        });
    }

    $scope.saveReview = function () {
        var newData = $scope.review;
        return (new sunglassSvc({
          //  "ReviewID": newData.ReviewID,
            "CustomerID": newData.CustomerID,
            "ProductID": newData.ProductID,
            "Name": newData.Name,
            "Email": newData.Email,
            "Review": newData.Review,
            "Rate": newData.Rate,
            "DateTime": newData.DateTime,
            "isDelete": newData.isDelete

        })).$saveReview()
        .then(function (data) {
            $scope.review = {};
              $scope.getallReview();
          //  $scope.showReview();

        });
    }

    $scope.searchReview = function () {
        var con = this.com;//com
        return (new sunglassSvc({

        })).$searchReview({ key: con.ReviewID })
        .then(function (data) {
            $scope.review = data;
        });
    }

    $scope.updateReview = function () {
        var con = this.review;
        if (con) {
            (new sunglassSvc({
                "ReviewID": con.ReviewID,
                "CustomerID": con.CustomerID,
                "ProductID": con.ProductID,
                "Name": con.Name,
                "Email": con.Email,
                "Review": con.Review,
                "Rate": con.Rate,
                "DateTime": con.DateTime,
                "isDelete": con.isDelete
            })).$updateReview({ key: con.ReviewID })
        .then(function (data) {
            $scope.review = {};
              $scope.getallReview();
           // $scope.showReview();

        });
        }
    }

    $scope.deleteReview = function () {
        var con = this.review;
        if (confirm('Are you sure?')) {
            var con = this.com;//com
            return (new sunglassSvc({

            })).$deleteReview({ key: con.ReviewID })
        .then(function (data) {
            $scope.getallReview();
           // $scope.showReview();

        });
        }
    }

    //----------------------Wishlist-----------------------------------
    $scope.getallWishlist = function () {
        (new sunglassSvc()).$getallWishlist()
        .then(function (data) {
            $scope.wishlists = data.value;
        });
    }

    $scope.saveWishlist = function () {
        var newData = $scope.wishlist;
        return (new sunglassSvc({
          //  "WishlistID": newData.WishlistID,
            "CustomerID": newData.CustomerID,
            "ProductID": newData.ProductID,
            "isActive": newData.isActive
        })).$saveWishlist()
        .then(function (data) {
            $scope.wishlist = {};
             $scope.getallWishlist();
          //  $scope.showWishlist();

        });
    }

    $scope.searchWishlist = function () {
        var con = this.com;//com
        return (new sunglassSvc({

        })).$searchWishlist({ key: con.WishlistID })
        .then(function (data) {
            $scope.wishlist = data;
        });
    }

    $scope.updateWishlist = function () {
        var con = this.wishlist;
        if (con) {
            (new sunglassSvc({
                "WishlistID": con.WishlistID,
                "CustomerID": con.CustomerID,
                "ProductID": con.ProductID,
                "isActive": con.isActive
            })).$updateWishlist({ key: con.WishlistID })
        .then(function (data) {
            $scope.wishlist = {};
           $scope.getallWishlist();
            //$scope.showWishlist();

        });
        }
    }

    $scope.deleteWishlist = function () {
        var con = this.wishlist;
        if (confirm('Are you sure?')) {
            var con = this.com;//com
            return (new sunglassSvc({

            })).$deleteWishlist({ key: con.WishlistID })
        .then(function (data) {
          $scope.getallWishlist();
            //$scope.showWishlist();

        });
        }
    }

    //----------------------Admin_Login-----------------------------------
    $scope.getallAdmin_Login = function () {
        (new sunglassSvc()).$getallAdmin_Login()
        .then(function (data) {
            $scope.admin_Login = data.value;
        });
    }

    $scope.saveAdmin_Login = function () {
        var newData = $scope.admin_Login;
        return (new sunglassSvc({
          //  "LoginID": newData.LoginID,
            "EmpID": newData.EmpID,
            "UserName": newData.UserName,
            "Password": newData.Password,
            "RoleType": newData.RoleType,
            "Notes": newData.Notes,
        })).$saveAdmin_Login()
        .then(function (data) {
            $scope.admin_Login = {};
            $scope.getallAdmin_Login();
           // $scope.showAdmin_Login();

        });
    }

    $scope.searchAdmin_Login = function () {
        var con = this.com;
        return (new sunglassSvc({

        })).$searchAdmin_Login({ key: con.LoginID })
        .then(function (data) {
            $scope.admin_Login = data;
        });
    }

    $scope.updateAdmin_Login = function () {
        var con = this.admin_Login;
        if (con) {
            (new sunglassSvc({
                "LoginID": con.LoginID,
                "EmpID": con.EmpID,
                "UserName": con.UserName,
                "Password": con.Password,
                "RoleType": con.RoleType,
                "Notes": con.Notes,
            })).$updateAdmin_Login({ key: con.LoginID })
        .then(function (data) {
            $scope.admin_Login = {};
           $scope.getallAdmin_Login();
          //  $scope.showAdmin_Login();

        });
        }
    }

    $scope.deleteAdmin_Login = function () {
        var con = this.admin_Login;
        if (confirm('Are you sure?')) {
            var con = this.com;
            return (new sunglassSvc({

            })).$deleteAdmin_Login({ key: con.LoginID })
        .then(function (data) {
              $scope.getallAdmin_Login();
           // $scope.showAdmin_Login();

        });
        }
    }

    //----------------------Admin_Employee-----------------------------------
    $scope.getallAdmin_Employee = function () {
        (new sunglassSvc()).$getallAdmin_Employee()
        .then(function (data) {
            $scope.admin_Employee = data.value;
        });
    }

    $scope.saveAdmin_Employee = function () {
        var newData = $scope.admin_Employee;
        return (new sunglassSvc({
          //  "EmpID": newData.EmpID,
            "FirstName": newData.FirstName,
            "LastName": newData.LastName,
            "Age": newData.Age,
            "DateofBirth": newData.DateofBirth,
            "Gender": newData.Gender,
            "Email": newData.Email,
            "Address": newData.Address,
            "Phone": newData.Phone,
            "Mobile": newData.Mobile,
            "PhotoPath": newData.PhotoPath,
        })).$saveAdmin_Employee()
        .then(function (data) {
            $scope.admin_Employee = {};
             $scope.getallAdmin_Employee();
          //  $scope.showAdmin_Employee();

        });
    }

    $scope.searchAdmin_Employee = function () {
        var con = this.com;
        return (new sunglassSvc({

        })).$searchAdmin_Employee({ key: con.EmpID })
        .then(function (data) {
            $scope.admin_Employee = data;
        });
    }

    $scope.updateAdmin_Employee = function () {
        var con = this.admin_Employee;
        if (con) {
            (new sunglassSvc({
                "EmpID": con.EmpID,
                "FirstName": con.FirstName,
                "LastName": con.LastName,
                "Age": con.Age,
                "DateofBirth": con.DateofBirth,
                "Gender": con.Gender,
                "Email": con.Email,
                "Address": con.Address,
                "Phone": con.Phone,
                "Mobile": con.Mobile,
                "PhotoPath": con.PhotoPath,
            })).$updateAdmin_Employee({ key: con.EmpID })
        .then(function (data) {
            $scope.admin_Employee = {};
           $scope.getallAdmin_Employee();
           // $scope.showAdmin_Employee();

        });
        }
    }

    $scope.deleteAdmin_Employee = function () {
        var con = this.admin_Employee;
        if (confirm('Are you sure?')) {
            var con = this.com;
            return (new sunglassSvc({

            })).$deleteAdmin_Employee({ key: con.EmpID })
        .then(function (data) {
            $scope.getallAdmin_Employee();
          //  $scope.showAdmin_Employee();

        });
        }
    }

    //----------------------Role-----------------------------------
    $scope.getallRole = function () {
        (new sunglassSvc()).$getallRole()
        .then(function (data) {
            $scope.roles = data.value;
        });
    }

    $scope.saveRole = function () {
        var newData = $scope.role;
        return (new sunglassSvc({
         //   "RoleID": newData.RoleID,
            "RoleName": newData.RoleName,
            "Description": newData.Description

        })).saveRole()
        .then(function (data) {
            $scope.role = {};
             $scope.getallRole();
            // $scope.showRole();

        });
    }

    $scope.searchRole = function () {
        var con = this.com;
        return (new sunglassSvc({

        })).$searchRole({ key: con.RoleID })
        .then(function (data) {
            $scope.role = data;
        });
    }

    $scope.updateRole = function () {
        var con = this.role;
        if (con) {
            (new sunglassSvc({
                "RoleID": con.RoleID,
                "RoleName": con.RoleName,
                "Description": con.Description
            })).$updateRole({ key: con.RoleID })
        .then(function (data) {
            $scope.role = {};
           $scope.getallRole();
          //  $scope.showRole();

        });
        }
    }

    $scope.deleteRole = function () {
        var con = this.role;
        if (confirm('Are you sure?')) {
            var con = this.com;
            return (new sunglassSvc({

            })).$deleteRole({ key: con.RoleID })
        .then(function (data) {
          $scope.getallRole();
          //  $scope.showRole();

        });
        }
    }

    ////---------------SalesDettails-----------------------------------------
    //$scope.showSalesDetail = function () {

    //    $http.get("http://localhost:5609/api/vw_SaleDetails")
    //    .then(function (response) {
    //        $scope.totalSalesView = response.data;
    //    }, function (response) {

    //    });

    //}

    //$scope.showSalesDetailById = function (idn) {

    //    $http.get("http://localhost:5609/api/vw_SaleDetails/" + idn)
    //    .then(function (response) {
    //        $scope.totalSalesViewbyId = response.data;
    //    }, function (response) {

    //    });

    //}

    //$scope.searchPv = function () {
    //    $scope.productv = this.product;

    //}
    //-------------------------print Reciept-----------------------
    $scope.printDiv = function (printable) {
        var docHead = document.head.outerHTML;
        var printContents = document.getElementById(printable).outerHTML;
        var winAttr = "location=yes, statusbar=no, menubar=no, titlebar=no, toolbar=no,dependent=no, width=865, height=600, resizable=yes, screenX=200, screenY=200, personalbar=no, scrollbars=yes";

        var newWin = window.open("", "_blank", winAttr);
        var writeDoc = newWin.document;
        writeDoc.open();
        writeDoc.write('<!doctype html><html>' + docHead + '<body onLoad="window.print()">' + printContents + '</body></html>');
        writeDoc.close();
        newWin.focus();
    }
    //-------------------------print Reciept-----------------------
})
//-------------------------------For Image---------------------------

//-------------------------------Add---------------------------
function ConvertImageToBase64(imageToConvertBase64, picture) {
    var drawCanvas = document.createElement("canvas");
    var p = document.getElementById(picture);
    drawCanvas.width = 150;
    drawCanvas.height = 150;
    var copyImageToCanvas = drawCanvas.getContext("2d");

    copyImageToCanvas.drawImage(p, 0, 0, 150, 150);
    var dataUrlOfImage = drawCanvas.toDataURL("image/png");
    return dataUrlOfImage.replace(/^data:image\/(png|jpg|JPG);base64,/, "");
}


//-------------------------------Update---------------------------
function readURL(input, t) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#' + t)
                .attr('src', e.target.result)
                .width(150)
                .height(150);
        };

        reader.readAsDataURL(input.files[0]);
        input.value = '';
    }
}


