const cds = require('@sap/cds');
var axios = require('axios');

module.exports = cds.service.impl(async function () {

    const { SalesOrders } = cds.entities('my.so');

    this.on("S4SOCreate", async (req) => {
        try {
            const SODetails = await cds.tx(req).run(
                SELECT.from(SalesOrders).where({
                    processStatus: { '=': '' }
                })
            );
            // return JSON.stringify(SODetails);

            var soLen = SODetails.length;

            for (var i = 0; i < soLen; i++) {
                console.log(SODetails[i])
                const tx = cds.tx(req);
                await tx.update(SalesOrders)
                    .with({ processStatus: 'X' })
                    .where({ SalesOrderIDBTP: { '=': SODetails[i].SalesOrderIDBTP } })      
                    // .where({ SalesOrderIDBTP: { '=': '1000000002' } })                
            // }

//============================================================            

            var config = {
              method: 'get',
              url: 'http://<HOST>:<PORT>/sap/opu/odata/sap/API_SALES_ORDER_SRV/A_SalesOrder',
              headers: { 
                'x-csrf-token': 'fetch', 
                'Accept': 'application/json', 
                'Content-Type': 'application/json', 
                'Authorization': 'Basic *******', 
                }
            };
            
            let socsrf = await axios(config);

            var xscrfToken = socsrf.headers['x-csrf-token']
            console.log("CSRF TOKEN ========>"+xscrfToken);

            var cookie = socsrf.headers['set-cookie'];
            console.log("COOKIE ========>"+cookie);
 
//============================================================            
            
//============================================================            
            var data = JSON.stringify({
              "d": {
                "SalesOrderType": "OR",
                "SalesOrganization": "RSL",
                "DistributionChannel": "R1",
                "OrganizationDivision": "R1",
                "SalesGroup": "",
                "SalesOffice": "",
                "SalesDistrict": "",
                "SoldToParty": "2000",
                "CreationDate": "/Date(1596153600000)/",
                "CreatedByUser": "S419SL09",
                "LastChangeDate": null,
                "LastChangeDateTime": "/Date(1596180002906+0000)/",
                "PurchaseOrderByCustomer": SODetails[i].PurchaseOrderByCustomer, //"test Partha",
                "CustomerPurchaseOrderType": "",
                "CustomerPurchaseOrderDate": null,
                "SalesOrderDate": "/Date(1596153600000)/",
                "TotalNetAmount": "10000.00",
                "TransactionCurrency": "USD",
                "SDDocumentReason": "",
                "PricingDate": "/Date(1596153600000)/",
                "RequestedDeliveryDate": "/Date(1596153600000)/",
                "ShippingCondition": "",
                "CompleteDeliveryIsDefined": false
              }
            });
            
            var config = {
              method: 'post',
              url: 'http://<HOSTNAME>:<PORT>/sap/opu/odata/sap/API_SALES_ORDER_SRV/A_SalesOrder',
              headers: { 
                'x-csrf-token': xscrfToken, 
                'Authorization': 'Basic *********', 
                'Content-Type': 'application/json', 
                'Cookie':  cookie
              },
              data : data
            };
            
            let soPost = await axios(config);
            // console.log("FINAL SO ========>"+JSON.stringify(soPost));
            // return JSON.stringify(soPost);
            
//============================================================

            // return JSON.stringify(SODetails);

        }
        } catch (err) {
            console.error(err);
        }

        // return JSON.stringify(SODetails);

        
    })

})
