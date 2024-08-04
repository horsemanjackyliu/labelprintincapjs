// using {com.cap.labelprint as my} from '../db/schema';
using {API_OUTBOUND_DELIVERY_SRV_0002 as dnApi} from './external/API_OUTBOUND_DELIVERY_SRV_0002';


namespace com.cap.labelprint;


service dnservice {

    @readonly
    entity DnHeaders @(restrict: [{
        grant: 'READ',
        to   : 'Viewer'
    }]) as
        projection on dnApi.A_OutbDeliveryHeader {
            key DeliveryDocument,
                DeliveryDate,
                ActualDeliveryRoute,
                ActualGoodsMovementDate,
                BillingDocumentDate,
                BillOfLading,
                CreationDate,
                CreatedByUser,
                DocumentDate,
                HeaderGrossWeight,
                HeaderNetWeight,
                HeaderVolume,
                HeaderVolumeUnit,
                HeaderWeightUnit,
                to_DeliveryDocumentItem as Items : redirected to DnItems
        };

    @readonly
    entity DnItems @(restrict: [{
        grant: 'READ',
        to   : 'Viewer'
    }]) as
        projection on dnApi.A_OutbDeliveryItem {
            key DeliveryDocument,
            key DeliveryDocumentItem,
                ActualDeliveredQtyInBaseUnit,
                ActualDeliveryQuantity,
                BaseUnit,
                Batch,
                CreatedByUser,
                CreationDate,
                DeliveryDocumentItemCategory,
                DeliveryGroup,
                DeliveryQuantityUnit,
                Division,
                GoodsMovementReasonCode,
                GoodsMovementStatus,
                GoodsMovementType,
                InspectionLot,
                ItemGrossWeight,
                ItemNetWeight,
                ItemVolume,
                ItemVolumeUnit,
                ItemWeightUnit,
                ManufactureDate,
                Material,
                MaterialByCustomer,
                NumberOfSerialNumbers,
                OrderID,
                OrderItem,
                PackingStatus,
                PickingStatus,
                ProfitCenter,
                DeliveryDocumentItemText,
                DistributionChannel
        }
        actions {
            @(requires: 'Admin')
            function render(template : String)                          returns LargeBinary;
            @(requires: 'Admin')
            function renderAndPrint(template : String, printQ : String) returns String;

        };

    @(requires: 'Viewer')
    function getTemplates()                                               returns array of String;

    @(requires: 'Viewer')
    function getPrintQs()                                                 returns array of String;

    @(requires: 'Admin')
    function print(pdf : LargeBinary, printQ : String, fileName : String) returns String;


}
