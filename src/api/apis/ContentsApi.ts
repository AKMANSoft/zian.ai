/* tslint:disable */
/* eslint-disable */
/**
 * Content Creator and Scheduler API
 * Content Creator and Scheduler API for frontend
 *
 * The version of the OpenAPI document: v1
 * Contact: contact@snippets.local
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  ContentForTwitterPost,
  ContentsList200Response,
} from '../models';
import {
    ContentForTwitterPostFromJSON,
    ContentForTwitterPostToJSON,
    ContentsList200ResponseFromJSON,
    ContentsList200ResponseToJSON,
} from '../models';

export interface ContentsCreateRequest {
    data: ContentForTwitterPost;
}

export interface ContentsDeleteRequest {
    id: string;
}

export interface ContentsLatestRequest {
    page?: number;
}

export interface ContentsListRequest {
    page?: number;
}

export interface ContentsPartialUpdateRequest {
    id: string;
    data: ContentForTwitterPost;
}

export interface ContentsReadRequest {
    id: string;
}

export interface ContentsScheduledRequest {
    page?: number;
}

export interface ContentsUpdateRequest {
    id: string;
    data: ContentForTwitterPost;
}

/**
 * 
 */
export class ContentsApi extends runtime.BaseAPI {

    /**
     * This viewset automatically provides `list`, `create`, `retrieve`, `update` and `destroy` actions.
     */
    async contentsCreateRaw(requestParameters: ContentsCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ContentForTwitterPost>> {
        if (requestParameters.data === null || requestParameters.data === undefined) {
            throw new runtime.RequiredError('data','Required parameter requestParameters.data was null or undefined when calling contentsCreate.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/contents/`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: ContentForTwitterPostToJSON(requestParameters.data),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ContentForTwitterPostFromJSON(jsonValue));
    }

    /**
     * This viewset automatically provides `list`, `create`, `retrieve`, `update` and `destroy` actions.
     */
    async contentsCreate(requestParameters: ContentsCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ContentForTwitterPost> {
        const response = await this.contentsCreateRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * This viewset automatically provides `list`, `create`, `retrieve`, `update` and `destroy` actions.
     */
    async contentsDeleteRaw(requestParameters: ContentsDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling contentsDelete.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/contents/{id}/`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * This viewset automatically provides `list`, `create`, `retrieve`, `update` and `destroy` actions.
     */
    async contentsDelete(requestParameters: ContentsDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.contentsDeleteRaw(requestParameters, initOverrides);
    }

    /**
     * Get latest contents for twitter
     */
    async contentsLatestRaw(requestParameters: ContentsLatestRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ContentsList200Response>> {
        const queryParameters: any = {};

        if (requestParameters.page !== undefined) {
            queryParameters['page'] = requestParameters.page;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/contents/latest/`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ContentsList200ResponseFromJSON(jsonValue));
    }

    /**
     * Get latest contents for twitter
     */
    async contentsLatest(requestParameters: ContentsLatestRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ContentsList200Response> {
        const response = await this.contentsLatestRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * This viewset automatically provides `list`, `create`, `retrieve`, `update` and `destroy` actions.
     */
    async contentsListRaw(requestParameters: ContentsListRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ContentsList200Response>> {
        const queryParameters: any = {};

        if (requestParameters.page !== undefined) {
            queryParameters['page'] = requestParameters.page;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/contents/`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ContentsList200ResponseFromJSON(jsonValue));
    }

    /**
     * This viewset automatically provides `list`, `create`, `retrieve`, `update` and `destroy` actions.
     */
    async contentsList(requestParameters: ContentsListRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ContentsList200Response> {
        const response = await this.contentsListRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * This viewset automatically provides `list`, `create`, `retrieve`, `update` and `destroy` actions.
     */
    async contentsPartialUpdateRaw(requestParameters: ContentsPartialUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ContentForTwitterPost>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling contentsPartialUpdate.');
        }

        if (requestParameters.data === null || requestParameters.data === undefined) {
            throw new runtime.RequiredError('data','Required parameter requestParameters.data was null or undefined when calling contentsPartialUpdate.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/contents/{id}/`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: ContentForTwitterPostToJSON(requestParameters.data),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ContentForTwitterPostFromJSON(jsonValue));
    }

    /**
     * This viewset automatically provides `list`, `create`, `retrieve`, `update` and `destroy` actions.
     */
    async contentsPartialUpdate(requestParameters: ContentsPartialUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ContentForTwitterPost> {
        const response = await this.contentsPartialUpdateRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * This viewset automatically provides `list`, `create`, `retrieve`, `update` and `destroy` actions.
     */
    async contentsReadRaw(requestParameters: ContentsReadRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ContentForTwitterPost>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling contentsRead.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/contents/{id}/`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ContentForTwitterPostFromJSON(jsonValue));
    }

    /**
     * This viewset automatically provides `list`, `create`, `retrieve`, `update` and `destroy` actions.
     */
    async contentsRead(requestParameters: ContentsReadRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ContentForTwitterPost> {
        const response = await this.contentsReadRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get latest scheduled contents for twitter
     */
    async contentsScheduledRaw(requestParameters: ContentsScheduledRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ContentsList200Response>> {
        const queryParameters: any = {};

        if (requestParameters.page !== undefined) {
            queryParameters['page'] = requestParameters.page;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/contents/scheduled/`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ContentsList200ResponseFromJSON(jsonValue));
    }

    /**
     * Get latest scheduled contents for twitter
     */
    async contentsScheduled(requestParameters: ContentsScheduledRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ContentsList200Response> {
        const response = await this.contentsScheduledRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * This viewset automatically provides `list`, `create`, `retrieve`, `update` and `destroy` actions.
     */
    async contentsUpdateRaw(requestParameters: ContentsUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ContentForTwitterPost>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling contentsUpdate.');
        }

        if (requestParameters.data === null || requestParameters.data === undefined) {
            throw new runtime.RequiredError('data','Required parameter requestParameters.data was null or undefined when calling contentsUpdate.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/contents/{id}/`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: ContentForTwitterPostToJSON(requestParameters.data),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ContentForTwitterPostFromJSON(jsonValue));
    }

    /**
     * This viewset automatically provides `list`, `create`, `retrieve`, `update` and `destroy` actions.
     */
    async contentsUpdate(requestParameters: ContentsUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ContentForTwitterPost> {
        const response = await this.contentsUpdateRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
