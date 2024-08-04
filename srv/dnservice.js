const { ServiceApi } = require("./service");

const {
    StoreFormsApi,
    ADSRenderRequestApi,
} = require("./external/generated/adsapi/CF_ADSRestAPI");
const cds = require("@sap/cds");

module.exports = cds.service.impl(async function (srv) {
    const { DnHeaders, DnItems } = srv.entities;
    const dnApi = await cds.connect.to("API_OUTBOUND_DELIVERY_SRV_0002");

    async function renderF(req) {
        const dnitem = await dnApi.run(req.query);
        console.log(dnitem);
        let renderBody = {};
        renderBody.embedFont = 0;
        renderBody.formLocale = "en_US";
        renderBody.formType = "interactive";
        renderBody.taggedPdf = 1;
        renderBody.xdpTemplate = req.data.template.replace("\\", "/");
        console.log(renderBody.xdpTemplate);

        let pdfBody = `<form1><LabelForm><DeliveryId>${dnitem.DeliveryDocument}</DeliveryId><Position>${dnitem.DeliveryDocumentItem}</Position><MaterialNo>${dnitem.Material}</MaterialNo><Quantity>${dnitem.ActualDeliveryQuantity}</Quantity><Package>${dnitem.NumberOfSerialNumbers}</Package><QRCode></QRCode></LabelForm></form1>`;

        let pdfBodyB64 = new Buffer(pdfBody).toString("base64");
        renderBody.xmlData = pdfBodyB64;

        let result = await ServiceApi.render(renderBody);
        return result.fileContent;
    }

    srv.on("READ", DnHeaders, async function (req) {
        return dnApi.run(req.query);
    });
    srv.on("READ", DnItems, async function (req) {
        req.reply(dnApi.run(req.query));
    });
    srv.on("getTemplates", async function (req) {
        req.reply(ServiceApi.getTemplates());
    });
    srv.on("getPrintQs", async function (req) {
        const results = await ServiceApi.getPrintQ();
        req.reply(results);
    });
    srv.on("renderAndPrint", async function (req) {
        const renderS = await renderF(req);
        const printQ = req.data.printQ;
    

        // console.log(renderS);
        // console.log(printQ);
        // console.log(req);
        let printB = {};
        printB.numberOfCopies = 1;
        printB.username = req.user.id;
        printB.qname = printQ;
        printB.metadata = {};
        printB.metadata.version = 1.2;
        printB.metadata.business_metadata = {};
        printB.printContents = [];

        printB.metadata.business_metadata.business_user = req.user.id;
        printB.metadata.business_metadata.object_node_type = "object_node_1";
        let docName =
            req.params[0].DeliveryDocument +
            req.params[0].DeliveryDocumentItem +
            ".pdf";
        printB.printContents.push({ documentName: docName, objectKey: "" });
        // printB.printContents[0].documentName = req.data.DeliveryDocument+'.pdf';
        // printB.printContents[0].objectKey = '';
        console.log(printB);

        const printR = await ServiceApi.print(renderS, printB);
        req.reply(printR);
    });
    srv.on("print", async function (req, next) {
        const pdfInBase64 = req.data.pdf;
        const printQ = req.data.printQ;
        const fileName = req.data.fileName;

        let printB = {};
        printB.numberOfCopies = 1;
        printB.username = req.user.id;
        printB.qname = printQ;
        printB.metadata = {};
        printB.metadata.version = 1.2;
        printB.metadata.business_metadata = {};
        printB.printContents = [];

        printB.metadata.business_metadata.business_user = req.user.id;
        printB.metadata.business_metadata.object_node_type = "object_node_1";
        let docName = fileName;
        printB.printContents.push({ documentName: docName, objectKey: "" });
        // printB.printContents[0].documentName = req.data.DeliveryDocument+'.pdf';
        // printB.printContents[0].objectKey = '';
        console.log(printB);

        const printR = await ServiceApi.print(pdfInBase64, printB);
        req.reply(printR);





    });

    srv.on("render", "DnItems", async function (req, next) {
        //__________________________________________________________________
        //  // 1 . this method  works
        //     const serviceApi =  await cds.connect.to('com.cap.labelprint.dnservice');
        //     serviceApi.read(DnItems,req.params[0]).then(resu=>{
        //         console.log('read method worked')
        //         console.log(resu);
        //     }).catch(err=>{
        //         console.log(err);
        //     })
        //__________________________________________________________________
        //  // 2. this method also works
        // srv.run(SELECT.from(DnItems).where(req.params[0])).then(resu=>{
        //     console.log(resu);
        // })

        //__________________________________________________________________
        //  // 3. this is the simplist method

        // dnApi
        //     .run(req.query)
        //     .then((res) => {
        //         console.log(res);
        //         req.reply(res);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //         req.reply(err.message);
        //     });

        // const dnitem = await  dnApi.run(req.query) ;
        // console.log(dnitem);
        // let renderBody = {};
        // renderBody.embedFont =  0;
        // renderBody.formLocale = "en_US";
        // renderBody.formType= "interactive";
        // renderBody.taggedPdf = 1;
        // renderBody.xdpTemplate = req.data.template.replace('\\','/');
        // console.log(renderBody.xdpTemplate);
        // // renderBody.xmlData = "";
        // // console.log(renderBody);

        // let pdfBody = `<form1><LabelForm><DeliveryId>${ dnitem.DeliveryDocument }</DeliveryId><Position>${dnitem.DeliveryDocumentItem}</Position><MaterialNo>${dnitem.Material}</MaterialNo><Quantity>${dnitem.ActualDeliveryQuantity}</Quantity><Package>${dnitem.NumberOfSerialNumbers}</Package><QRCode></QRCode></LabelForm></form1>`;

        // let pdfBodyB64 =  new Buffer(pdfBody).toString('base64');
        // renderBody.xmlData = pdfBodyB64;
        // // console.log(renderBody);

        // // ServiceApi.render(renderBody).then(res=>{
        // //     console.log(res.fileContent);
        // //     req.reply(res.fileContent);
        // // });

        // let result = await  ServiceApi.render(renderBody) ;
        // // console.log(result);
        // req.reply(result.fileContent);
        //CC0000000242

        let result = await renderF(req);
        req.reply(result);
    });
});
