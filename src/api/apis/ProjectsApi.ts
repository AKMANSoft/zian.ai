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
  Project,
  ProjectsList200Response,
} from '../models';
import {
    ProjectFromJSON,
    ProjectToJSON,
    ProjectsList200ResponseFromJSON,
    ProjectsList200ResponseToJSON,
} from '../models';

export interface ProjectsCreateRequest {
    data: Project;
}

export interface ProjectsDeleteRequest {
    id: string;
}

export interface ProjectsListRequest {
    page?: number;
}

export interface ProjectsPartialUpdateRequest {
    id: string;
    data: Project;
}

export interface ProjectsReadRequest {
    id: string;
}

export interface ProjectsUpdateRequest {
    id: string;
    data: Project;
}

/**
 * 
 */
export class ProjectsApi extends runtime.BaseAPI {

    /**
     * This viewset automatically provides `list`, `create`, `retrieve`, `update` and `destroy` actions.
     */
    async projectsCreateRaw(requestParameters: ProjectsCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Project>> {
        if (requestParameters.data === null || requestParameters.data === undefined) {
            throw new runtime.RequiredError('data','Required parameter requestParameters.data was null or undefined when calling projectsCreate.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/projects/`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: ProjectToJSON(requestParameters.data),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ProjectFromJSON(jsonValue));
    }

    /**
     * This viewset automatically provides `list`, `create`, `retrieve`, `update` and `destroy` actions.
     */
    async projectsCreate(requestParameters: ProjectsCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Project> {
        const response = await this.projectsCreateRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * This viewset automatically provides `list`, `create`, `retrieve`, `update` and `destroy` actions.
     */
    async projectsDeleteRaw(requestParameters: ProjectsDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling projectsDelete.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/projects/{id}/`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * This viewset automatically provides `list`, `create`, `retrieve`, `update` and `destroy` actions.
     */
    async projectsDelete(requestParameters: ProjectsDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.projectsDeleteRaw(requestParameters, initOverrides);
    }

    /**
     * This viewset automatically provides `list`, `create`, `retrieve`, `update` and `destroy` actions.
     */
    async projectsListRaw(requestParameters: ProjectsListRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ProjectsList200Response>> {
        const queryParameters: any = {};

        if (requestParameters.page !== undefined) {
            queryParameters['page'] = requestParameters.page;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/projects/`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ProjectsList200ResponseFromJSON(jsonValue));
    }

    /**
     * This viewset automatically provides `list`, `create`, `retrieve`, `update` and `destroy` actions.
     */
    async projectsList(requestParameters: ProjectsListRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ProjectsList200Response> {
        const response = await this.projectsListRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * This viewset automatically provides `list`, `create`, `retrieve`, `update` and `destroy` actions.
     */
    async projectsPartialUpdateRaw(requestParameters: ProjectsPartialUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Project>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling projectsPartialUpdate.');
        }

        if (requestParameters.data === null || requestParameters.data === undefined) {
            throw new runtime.RequiredError('data','Required parameter requestParameters.data was null or undefined when calling projectsPartialUpdate.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/projects/{id}/`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: ProjectToJSON(requestParameters.data),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ProjectFromJSON(jsonValue));
    }

    /**
     * This viewset automatically provides `list`, `create`, `retrieve`, `update` and `destroy` actions.
     */
    async projectsPartialUpdate(requestParameters: ProjectsPartialUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Project> {
        const response = await this.projectsPartialUpdateRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * This viewset automatically provides `list`, `create`, `retrieve`, `update` and `destroy` actions.
     */
    async projectsReadRaw(requestParameters: ProjectsReadRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Project>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling projectsRead.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/projects/{id}/`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ProjectFromJSON(jsonValue));
    }

    /**
     * This viewset automatically provides `list`, `create`, `retrieve`, `update` and `destroy` actions.
     */
    async projectsRead(requestParameters: ProjectsReadRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Project> {
        const response = await this.projectsReadRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * This viewset automatically provides `list`, `create`, `retrieve`, `update` and `destroy` actions.
     */
    async projectsUpdateRaw(requestParameters: ProjectsUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Project>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling projectsUpdate.');
        }

        if (requestParameters.data === null || requestParameters.data === undefined) {
            throw new runtime.RequiredError('data','Required parameter requestParameters.data was null or undefined when calling projectsUpdate.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/projects/{id}/`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: ProjectToJSON(requestParameters.data),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ProjectFromJSON(jsonValue));
    }

    /**
     * This viewset automatically provides `list`, `create`, `retrieve`, `update` and `destroy` actions.
     */
    async projectsUpdate(requestParameters: ProjectsUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Project> {
        const response = await this.projectsUpdateRaw(requestParameters, initOverrides);
        return await response.value();
    }

}