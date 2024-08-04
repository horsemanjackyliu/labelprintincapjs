/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
/**
 * Representation of the 'AnonymizationBetaApi'.
 * This API is part of the 'PRINTAPI' service.
 */
export const AnonymizationBetaApi = {
  /**
   * By applying anonymization techniques, this API offers the suitable capacity to anonymize Personally Identifiable Information (PII) for your customer data. It can support you to mask email, address, phone and url for personal data. Currently, it is still Beta release and only available on EU20 region, if you have the specific requirement and want to improve the accuracy of anonymization, please contact support component BC-CCM-PRN-OM-SCP.
   * @param body - Request body.
   * @param queryParameters - Object containing the following keys: entities.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  createAnonymizeApiV10Anonymize: (
    body: any | undefined,
    queryParameters?: { entities?: string }
  ) =>
    new OpenApiRequestBuilder<any>('post', '/anonymize/api/v1.0/anonymize', {
      body,
      queryParameters
    })
};
