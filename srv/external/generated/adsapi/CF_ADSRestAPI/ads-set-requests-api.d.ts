/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
import type { AttachmentInput, FileOutput, SignatureInput } from './schema';
/**
 * Representation of the 'ADSSetRequestsApi'.
 * This API is part of the 'CF_ADSRestAPI' service.
 */
export declare const ADSSetRequestsApi: {
  /**
   * Attaches content to a pdf file. TraceLevel set to 1 or 2 adds a 'traceString' node to response JSON.
   * @param body - Request body.
   * @param queryParameters - Object containing the following keys: TraceLevel.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  pDfSetAttachmentPost: (
    body: AttachmentInput,
    queryParameters?: {
      TraceLevel?: number;
    }
  ) => OpenApiRequestBuilder<FileOutput>;
  /**
   * Sets a signature to a pdf file. TraceLevel set to 1 or 2 adds a 'traceString' node to response JSON.
   * @param body - Request body.
   * @param queryParameters - Object containing the following keys: TraceLevel.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  pDfSetSignaturePost: (
    body: SignatureInput,
    queryParameters?: {
      TraceLevel?: number;
    }
  ) => OpenApiRequestBuilder<FileOutput>;
};
