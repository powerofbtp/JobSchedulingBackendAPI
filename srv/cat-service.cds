using my.so as my from '../db/data-model';

service CatalogService {
    // @readonly entity Books as projection on my.Books;
    entity SalesOrders as projection on my.SalesOrders;

    function S4SOCreate() returns String;
}