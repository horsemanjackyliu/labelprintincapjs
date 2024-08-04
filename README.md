# Getting Started

Welcome to your new project.

It contains these folders and files, following our recommended project layout:

File or Folder | Purpose
---------|----------
`app/` | content for UI frontends goes here
`db/` | your domain models and data go here
`srv/` | your service models and code go here
`package.json` | project metadata and configuration
`readme.md` | this getting started guide


## Next Steps

- Open a new terminal and run `cds watch`
- (in VS Code simply choose _**Terminal** > Run Task > cds watch_)
- Start adding content, for example, a [db/schema.cds](db/schema.cds).


## Learn More

Learn more at https://cap.cloud.sap/docs/get-started/.


cds bind -2 FioriDemo-dest-srv:key

cds watch --profile hybrid


cds serve all --with-mocks --in-memory --profile hybrid







cds import srv/external/API_OUTBOUND_DELIVERY_SRV_0002.edmx




npm add @sap-cloud-sdk/http-client@3.x @sap-cloud-sdk/connectivity@3.x @sap-cloud-sdk/resilience@3.x

npm install @sap-cloud-sdk/openapi-generator

npm add @sap-cloud-sdk/openapi

npx openapi-generator --input srv/external/CF_ADSRestAPI.yaml --outputDir srv/external/generated/adsapi -t -overwrite

npx openapi-generator --input srv/external/PRINTAPI.yaml --outputDir srv/external/generated/printapi -t -overwrite


npx openapi-generator --input srv/external/CreateDocumentApi.yaml --outputDir srv/external/generated/sdmapi -t 
