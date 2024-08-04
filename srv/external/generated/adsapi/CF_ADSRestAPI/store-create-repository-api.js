"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreCreateRepositoryApi = void 0;
/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const openapi_1 = require("@sap-cloud-sdk/openapi");
/**
 * Representation of the 'StoreCreateRepositoryApi'.
 * This API is part of the 'CF_ADSRestAPI' service.
 */
exports.StoreCreateRepositoryApi = {
    /**
     * Creates a repository to store form templates and schema
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    repositoryPost: () => new openapi_1.OpenApiRequestBuilder('post', '/v1/repository')
};
//# sourceMappingURL=store-create-repository-api.js.map