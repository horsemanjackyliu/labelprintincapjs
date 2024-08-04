/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
import type { RepositoryMetadata } from './schema';
/**
 * Representation of the 'StoreCreateRepositoryApi'.
 * This API is part of the 'CF_ADSRestAPI' service.
 */
export const StoreCreateRepositoryApi = {
  /**
   * Creates a repository to store form templates and schema
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  repositoryPost: () =>
    new OpenApiRequestBuilder<RepositoryMetadata>('post', '/v1/repository')
};
