/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
import type {
  TemplateStoreOutput,
  TemplateStoreInput,
  TemplateMetadata,
  TemplateUpdateStoreInput
} from './schema';
/**
 * Representation of the 'StoreFormTemplatesApi'.
 * This API is part of the 'CF_ADSRestAPI' service.
 */
export declare const StoreFormTemplatesApi: {
  /**
   * Retrieve all templates of a form. Use query params to filter the result.
   * @param formName - Name of a form
   * @param queryParameters - Object containing the following keys: locale, language, templateName, masterLanguage, businessArea, businessDepartment, limit, offset, select.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  templatesGet: (
    formName: string,
    queryParameters?: {
      locale?: string;
      language?: string;
      templateName?: string;
      masterLanguage?: string;
      businessArea?: string;
      businessDepartment?: string;
      limit?: number;
      offset?: number;
      select?: string[];
    }
  ) => OpenApiRequestBuilder<TemplateStoreOutput[]>;
  /**
   * Store a template of a form.
   * @param formName - Name of form
   * @param body - Request body.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  templatePost: (
    formName: string,
    body: TemplateStoreInput
  ) => OpenApiRequestBuilder<TemplateMetadata>;
  /**
   * Read a template of a form using 'name' or 'objectId' path param.
   * @param formName - Name of a form.
   * @param templateName - Name of a template.
   * @param queryParameters - Object containing the following keys: select, isObjectId.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  templateGet: (
    formName: string,
    templateName: string,
    queryParameters?: {
      select?: string[];
      isObjectId?: boolean;
    }
  ) => OpenApiRequestBuilder<TemplateStoreOutput>;
  /**
   * Update a template of a form using 'name' or 'objectId' path param.
   * @param formName - Name of a form.
   * @param templateName - Name of a template to be updated.
   * @param body - Request body.
   * @param queryParameters - Object containing the following keys: isObjectId.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  templatePut: (
    formName: string,
    templateName: string,
    body: TemplateUpdateStoreInput,
    queryParameters?: {
      isObjectId?: boolean;
    }
  ) => OpenApiRequestBuilder<TemplateMetadata>;
  /**
   * Delete a template of a form using 'name' or 'objectId' path param.
   * @param formName - Name of a form.
   * @param templateName - Name of a template.
   * @param queryParameters - Object containing the following keys: allVersions, isObjectId.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  templateDelete: (
    formName: string,
    templateName: string,
    queryParameters?: {
      allVersions?: boolean;
      isObjectId?: boolean;
    }
  ) => OpenApiRequestBuilder<string>;
};
