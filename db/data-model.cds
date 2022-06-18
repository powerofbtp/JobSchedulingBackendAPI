namespace my.so;

// entity Books {
//   key ID : Integer;
//   title  : String;
//   stock  : Integer;
// }

entity SalesOrder {
    key SalesOrderIDBTP         : String(10);
        SalesOrderType          : String(4);
        SalesOrganization       : String(4);
        DistributionChannel     : String(2);
        OrganizationDivision    : String(2);
        PurchaseOrderByCustomer : String(35);           /// Important***
        ProductName             : String(50);
        ProductCount            : String(50);
        SOApprovalStatus        : String(8);
        processStatus           : String(1);
}

entity SalesOrders {
    key SalesOrderIDBTP         : String(10);
        SalesOrderType          : String(4);
        SalesOrganization       : String(4);
        DistributionChannel     : String(2);
        OrganizationDivision    : String(2);
        PurchaseOrderByCustomer : String(35);           /// Important***
        ProductName             : String(50);
        ProductCount            : String(50);
        SOApprovalStatus        : String(8);
        processStatus           : String(1);
}
