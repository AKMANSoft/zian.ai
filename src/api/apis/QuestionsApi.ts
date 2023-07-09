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
  Question,
} from '../models';
import {
    QuestionFromJSON,
    QuestionToJSON,
} from '../models';

export interface QuestionsReadRequest {
    id: number;
}

/**
 * 
 */
export class QuestionsApi extends runtime.BaseAPI {

    /**
     * This viewset automatically provides `list`, `retrieve` actions.
     */
    async questionsAllRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<Question>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/questions/all/`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(QuestionFromJSON));
    }

    /**
     * This viewset automatically provides `list`, `retrieve` actions.
     */
    async questionsAll(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<Question>> {
        const response = await this.questionsAllRaw(initOverrides);
        return await response.value();
    }

    /**
     * This viewset automatically provides `list`, `retrieve` actions.
     */
    async questionsBasicRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<Question>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/questions/basic/`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(QuestionFromJSON));
    }

    /**
     * This viewset automatically provides `list`, `retrieve` actions.
     */
    async questionsBasic(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<Question>> {
        const response = await this.questionsBasicRaw(initOverrides);
        return await response.value();
    }

    /**
     * This viewset automatically provides `list`, `retrieve` actions.
     */
    async questionsListRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<Question>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/questions/`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(QuestionFromJSON));
    }

    /**
     * This viewset automatically provides `list`, `retrieve` actions.
     */
    async questionsList(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<Question>> {
        const response = await this.questionsListRaw(initOverrides);
        return await response.value();
    }

    /**
     * This viewset automatically provides `list`, `retrieve` actions.
     */
    async questionsReadRaw(requestParameters: QuestionsReadRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Question>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling questionsRead.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/questions/{id}/`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => QuestionFromJSON(jsonValue));
    }

    /**
     * This viewset automatically provides `list`, `retrieve` actions.
     */
    async questionsRead(requestParameters: QuestionsReadRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Question> {
        const response = await this.questionsReadRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * This viewset automatically provides `list`, `retrieve` actions.
     */
    async questionsTopicRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<Question>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/questions/topic/`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(QuestionFromJSON));
    }

    /**
     * This viewset automatically provides `list`, `retrieve` actions.
     */
    async questionsTopic(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<Question>> {
        const response = await this.questionsTopicRaw(initOverrides);
        return await response.value();
    }

}