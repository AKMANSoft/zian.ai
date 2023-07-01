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
  User,
  UsersList200Response,
} from '../models';
import {
    UserFromJSON,
    UserToJSON,
    UsersList200ResponseFromJSON,
    UsersList200ResponseToJSON,
} from '../models';

export interface UsersListRequest {
    page?: number;
}

export interface UsersReadRequest {
    id: string;
}

/**
 * 
 */
export class UsersApi extends runtime.BaseAPI {

    /**
     * This viewset automatically provides `list` and `retrieve` actions.
     */
    async usersListRaw(requestParameters: UsersListRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<UsersList200Response>> {
        const queryParameters: any = {};

        if (requestParameters.page !== undefined) {
            queryParameters['page'] = requestParameters.page;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/users/`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UsersList200ResponseFromJSON(jsonValue));
    }

    /**
     * This viewset automatically provides `list` and `retrieve` actions.
     */
    async usersList(requestParameters: UsersListRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UsersList200Response> {
        const response = await this.usersListRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * This viewset automatically provides `list` and `retrieve` actions.
     */
    async usersReadRaw(requestParameters: UsersReadRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<User>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling usersRead.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/users/{id}/`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UserFromJSON(jsonValue));
    }

    /**
     * This viewset automatically provides `list` and `retrieve` actions.
     */
    async usersRead(requestParameters: UsersReadRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<User> {
        const response = await this.usersReadRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
