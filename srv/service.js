const {
    ADSRenderRequestApi,
    ADSSetRequestsApi,
    StoreFormsApi,
} = require("./external/generated/adsapi/CF_ADSRestAPI");
const {
    retry,
    circuitBreaker,
    timeout,
    resilience,
} = require("@sap-cloud-sdk/resilience");
const {
    DocumentsApi,
} = require("./external/generated/printapi/PRINTAPI/documents-api");
const {
    PrintTasksApi,
} = require("./external/generated/printapi/PRINTAPI/print-tasks-api");
const {
    QueuesApi,
} = require("./external/generated/printapi/PRINTAPI/queues-api");
const {
    CreateDocumentApi,
} = require("./external/generated/sdmapi/CreateDocumentApi/create-document-api");
const nodemailer = require("nodemailer");
const base64 = require("base64topdf");
const fs = require("fs");

const adsdetination = "ads-rest-api"; //ADS Destinbation
const printdetination = "printServiceApi"; // Print Service destination
const dmsdetination = "dmsApi"; // SDM destination
const dmsRepId = "4c0973e8-a785-4789-a048-067d42f97873"; // SDM Repositary ID
const emailuser = "email_address"; //  Sending email
const emailpassword = "password"; //Sending email password
// const dmsPath = 'adobeservice';

const defaultResilienceOptions = {
    retry: 5,
    timeout: 12000,
    circuitBreaker: true,
};

exports.ServiceApi = {
    render: async (body) => {
        let queryP = { templateSource: "storageName", TraceLevel: 1 };
        return await ADSRenderRequestApi.renderingPdfPost(body, queryP)
            .middleware(resilience(defaultResilienceOptions))
            .execute({ destinationName: adsdetination });
    },

    sign: (body) => {
        const fn = new Promise((resolve, reject) => {
            let queryP = { TraceLevel: 1 };
            ADSSetRequestsApi.pDfSetSignaturePost(body, queryP)
                .execute({ destinationName: adsdetination })
                .then((spdf) => {
                    resolve(spdf.fileContent);
                })
                .catch((err) => {
                    reject(err);
                });
        });
        return fn;
    },
    getTemplates: async () => {
        let results = [];

        const resp = await StoreFormsApi.formsGet().execute({
            destinationName: adsdetination,
        });
        resp.forEach((form) => {
            form.templates.forEach((temp) => {
                results.push(
                    form.formName.concat("/").concat(temp.templateName),
                );
                // console.log(ele.formName.concat('/').concat(temp.templateName))
            });
        });
        return results;
    },

    getPrintQ: async () => {
        return await QueuesApi.getQmApiV1RestQueues().execute({
            destinationName: printdetination,
        });
    },

    print: async (pdf, printB) => {
        base64.base64Decode(pdf, "render.pdf");
        const content = fs.readFileSync("render.pdf");

        // console.log(content);
        let id1 = await DocumentsApi.createDmApiV1RestPrintDocuments(content)
            .addCustomHeaders({ "If-None-Match": "*" })
            .addCustomHeaders({ Scan: "false" })
            .addCustomHeaders({ "Content-Type": "application/pdf" })
            .addCustomHeaders({ "data-binary": "@/tmp/TestPage.pdf" })
            .execute({ destinationName: printdetination });

        printB.printContents[0].objectKey = id1;
        let result = await PrintTasksApi.updateQmApiV1RestPrintTasksByItemId(
            id1,
            printB,
        )
            .addCustomHeaders({ "If-None-Match": "*" })
            .addCustomHeaders({ Scan: "false" })
            .execute({ destinationName: printdetination });
        console.log(result);
        return "Print task created successfully";

        // .then((id1) => {
        //     console.log(id1);
        //     printB.printContents[0].objectKey = id1;
        //     PrintTasksApi.updateQmApiV1RestPrintTasksByItemId(id1, printB)
        //         .addCustomHeaders({ "If-None-Match": "*" })
        //         .addCustomHeaders({ Scan: "false" })
        //         .execute({ destinationName: printdetination })
        //         .then((res) => {
        //             console.log(res)
        //             return 'print task created successfully';
        //         })
        //         .catch((err) => {
        //             console.log(err);
        //             return err.message;
        //         });
        // })
        // .catch((err) => {
        //     console.log(err);
        //     return err.message;
        // });
    },
    //    pdfconversion: (b64con)=>{
    //     const fn = new Promise((resolve, reject) =>{

    //        let decCont = atob(b64con);

    //     //    let  content = b64con.toString('utf-8');
    //         const byteCont = new Array( decCont.length);
    //         for (let i = 0; i <  decCont.length; i++) {
    //             byteCont[i] = decCont.charCodeAt(i);
    //         }
    //          const byteArray = new Uint8Array(byteCont);

    //         // decCont = atob(byteArray);
    //         // let result = new Buffer(decCont,'utf-8');
    //         // resolve(result);

    //         // const byteCont = new Array(decCont.length);
    //         // for (let i = 0; i < decCont.length; i++) {
    //         //     byteCont[i] = decCont.charCodeAt(i);
    //         // }

    //         //  const byteArray = new Uint8Array(byteCont);
    //         //  const result = this.ServiceApi.Utf8ArrayToStr(byteArray);
    //         // //  const csss =  new String(byteArray, 'utf8');
    //         // //  byteArray.toString('ascii')
    //         //  const blob = new Blob([byteArray], {type: "application/pdf"});
    //         //  const objectUrl = URL.createObjectURL(blob);
    //          resolve(byteArray);
    //         //  blob.stream().pipeTo()

    //         //  const ab = URL.createObjectURL(blob) ;x
    //         //  fetch(ab).then(pdf => {
    //         //     console.log(pdf);
    //         //     resolve(pdf.body);
    //         // });

    //         // const csss = new String([byteArray]);
    //         // resolve(byteArray);
    //     });
    //     return fn;

    //    },
    createDoc: (file, name, path) => {
        const fn = new Promise((resolve, reject) => {
            var formdata = new FormData();
            formdata.append("cmisaction", "createDocument");
            formdata.append("propertyId[0]", "cmis:name");
            formdata.append("propertyValue[0]", name);
            formdata.append("propertyId[1]", "cmis:objectTypeId");
            formdata.append("propertyValue[1]", "cmis:document");
            formdata.append("filename", name);
            formdata.append("_charset", "UTF-8");
            formdata.append("includeAllowableActions", "False");
            formdata.append("succinct", "true");
            formdata.append("media", file, name);
            CreateDocumentApi.createBrowserRootByRepositoryIdAndDirectoryPath(
                dmsRepId,
                path,
                formdata,
            )
                .execute({ destinationName: dmsdetination })
                .then((result) => resolve(result))
                .catch((error) => {
                    reject(error);
                });
        });
        return fn;
    },

    semail: (file, filename, to, subj, body) => {
        const fn = new Promise((resolve, reject) => {
            const transporter = nodemailer.createTransport({
                service: "Outlook365",
                auth: {
                    user: emailuser,
                    pass: emailpassword,
                },
            });
            const mailoptions = {
                from: emailuser,
                to: to,
                subject: subj,
                text: body,
                attachments: [
                    {
                        filename: filename,
                        content: file,
                    },
                ],
            };
            transporter
                .sendMail(mailoptions)
                .then((info) => {
                    resolve(info);
                })
                .catch((err) => {
                    reject(err);
                });
        });

        return fn;
    },
};
