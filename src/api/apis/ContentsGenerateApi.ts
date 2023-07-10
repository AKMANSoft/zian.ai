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
} from '../models';
import {
    ContentForTwitterPostFromJSON,
    ContentForTwitterPostToJSON,
} from '../models';

export interface ContentsGenerateGenerateContentRequest {
    topic?: string;
    project?: number;
}

export interface ContentsGenerateListRequest {
    topic?: string;
    project?: number;
}

export interface ContentsGenerateReadRequest {
    id: string;
}

/**
 * 
 */
export class ContentsGenerateApi extends runtime.BaseAPI {

    /**
     * Generate contents for twitter.
     */
    async contentsGenerateGenerateContentRaw(requestParameters: ContentsGenerateGenerateContentRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<ContentForTwitterPost>>> {
        const queryParameters: any = {};

        if (requestParameters.topic !== undefined) {
            queryParameters['topic'] = requestParameters.topic;
        }

        if (requestParameters.project !== undefined) {
            queryParameters['project'] = requestParameters.project;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/contents-generate/generate_content/`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(ContentForTwitterPostFromJSON));
    }

    /**
     * Generate contents for twitter.
     */
    async contentsGenerateGenerateContent(requestParameters: ContentsGenerateGenerateContentRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<ContentForTwitterPost>> {
        const response = await this.contentsGenerateGenerateContentRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * This viewset automatically provides `list`, `retrieve` actions.
     */
    async contentsGenerateListRaw(requestParameters: ContentsGenerateListRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<ContentForTwitterPost>>> {
        const queryParameters: any = {};

        if (requestParameters.topic !== undefined) {
            queryParameters['topic'] = requestParameters.topic;
        }

        if (requestParameters.project !== undefined) {
            queryParameters['project'] = requestParameters.project;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/contents-generate/`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(ContentForTwitterPostFromJSON));
    }

    /**
     * This viewset automatically provides `list`, `retrieve` actions.
     */
    async contentsGenerateList(requestParameters: ContentsGenerateListRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<ContentForTwitterPost>> {
        const response = await this.contentsGenerateListRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * This viewset automatically provides `list`, `retrieve` actions.
     */
    async contentsGenerateReadRaw(requestParameters: ContentsGenerateReadRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ContentForTwitterPost>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling contentsGenerateRead.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/contents-generate/{id}/`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ContentForTwitterPostFromJSON(jsonValue));
    }

    /**
     * This viewset automatically provides `list`, `retrieve` actions.
     */
    async contentsGenerateRead(requestParameters: ContentsGenerateReadRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ContentForTwitterPost> {
        const response = await this.contentsGenerateReadRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
