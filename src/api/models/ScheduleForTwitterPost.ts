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

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface ScheduleForTwitterPost
 */
export interface ScheduleForTwitterPost {
    /**
     * 
     * @type {number}
     * @memberof ScheduleForTwitterPost
     */
    content: number;
    /**
     * 
     * @type {Date}
     * @memberof ScheduleForTwitterPost
     */
    schedule: Date;
    /**
     * 
     * @type {number}
     * @memberof ScheduleForTwitterPost
     */
    status?: number;
    /**
     * 
     * @type {string}
     * @memberof ScheduleForTwitterPost
     */
    userScheduleTime?: string | null;
    /**
     * 
     * @type {number}
     * @memberof ScheduleForTwitterPost
     */
    timezone?: number | null;
    /**
     * 
     * @type {string}
     * @memberof ScheduleForTwitterPost
     */
    readonly timezoneText?: string;
    /**
     * 
     * @type {Date}
     * @memberof ScheduleForTwitterPost
     */
    readonly createdTime?: Date;
}

/**
 * Check if a given object implements the ScheduleForTwitterPost interface.
 */
export function instanceOfScheduleForTwitterPost(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "content" in value;
    isInstance = isInstance && "schedule" in value;

    return isInstance;
}

export function ScheduleForTwitterPostFromJSON(json: any): ScheduleForTwitterPost {
    return ScheduleForTwitterPostFromJSONTyped(json, false);
}

export function ScheduleForTwitterPostFromJSONTyped(json: any, ignoreDiscriminator: boolean): ScheduleForTwitterPost {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'content': json['content'],
        'schedule': (new Date(json['schedule'])),
        'status': !exists(json, 'status') ? undefined : json['status'],
        'userScheduleTime': !exists(json, 'user_schedule_time') ? undefined : json['user_schedule_time'],
        'timezone': !exists(json, 'timezone') ? undefined : json['timezone'],
        'timezoneText': !exists(json, 'timezone_text') ? undefined : json['timezone_text'],
        'createdTime': !exists(json, 'created_time') ? undefined : (new Date(json['created_time'])),
    };
}

export function ScheduleForTwitterPostToJSON(value?: ScheduleForTwitterPost | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'content': value.content,
        'schedule': (value.schedule.toISOString()),
        'status': value.status,
        'user_schedule_time': value.userScheduleTime,
        'timezone': value.timezone,
    };
}
