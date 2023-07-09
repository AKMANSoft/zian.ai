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
 * @interface ContentForTwitterPostSchedule
 */
export interface ContentForTwitterPostSchedule {
    /**
     * 
     * @type {number}
     * @memberof ContentForTwitterPostSchedule
     */
    readonly id?: number;
    /**
     * The text for twitter post. Max length: 280 characters
     * @type {string}
     * @memberof ContentForTwitterPostSchedule
     */
    text: string;
    /**
     * 
     * @type {string}
     * @memberof ContentForTwitterPostSchedule
     */
    readonly creator?: string;
    /**
     * 
     * @type {number}
     * @memberof ContentForTwitterPostSchedule
     */
    status?: number;
    /**
     * 
     * @type {string}
     * @memberof ContentForTwitterPostSchedule
     */
    readonly statusText?: string;
    /**
     * 
     * @type {number}
     * @memberof ContentForTwitterPostSchedule
     */
    project?: number | null;
    /**
     * 
     * @type {string}
     * @memberof ContentForTwitterPostSchedule
     */
    topic?: string | null;
    /**
     * 
     * @type {string}
     * @memberof ContentForTwitterPostSchedule
     */
    readonly image?: string;
    /**
     * 
     * @type {string}
     * @memberof ContentForTwitterPostSchedule
     */
    readonly twitterUsername?: string;
    /**
     * 
     * @type {Date}
     * @memberof ContentForTwitterPostSchedule
     */
    readonly scheduleTime?: Date;
    /**
     * 
     * @type {Date}
     * @memberof ContentForTwitterPostSchedule
     */
    readonly createdTime?: Date;
    /**
     * 
     * @type {Date}
     * @memberof ContentForTwitterPostSchedule
     */
    readonly modifiedTime?: Date | null;
}

/**
 * Check if a given object implements the ContentForTwitterPostSchedule interface.
 */
export function instanceOfContentForTwitterPostSchedule(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "text" in value;

    return isInstance;
}

export function ContentForTwitterPostScheduleFromJSON(json: any): ContentForTwitterPostSchedule {
    return ContentForTwitterPostScheduleFromJSONTyped(json, false);
}

export function ContentForTwitterPostScheduleFromJSONTyped(json: any, ignoreDiscriminator: boolean): ContentForTwitterPostSchedule {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'text': json['text'],
        'creator': !exists(json, 'creator') ? undefined : json['creator'],
        'status': !exists(json, 'status') ? undefined : json['status'],
        'statusText': !exists(json, 'status_text') ? undefined : json['status_text'],
        'project': !exists(json, 'project') ? undefined : json['project'],
        'topic': !exists(json, 'topic') ? undefined : json['topic'],
        'image': !exists(json, 'image') ? undefined : json['image'],
        'twitterUsername': !exists(json, 'twitter_username') ? undefined : json['twitter_username'],
        'scheduleTime': !exists(json, 'schedule_time') ? undefined : (new Date(json['schedule_time'])),
        'createdTime': !exists(json, 'created_time') ? undefined : (new Date(json['created_time'])),
        'modifiedTime': !exists(json, 'modified_time') ? undefined : (json['modified_time'] === null ? null : new Date(json['modified_time'])),
    };
}

export function ContentForTwitterPostScheduleToJSON(value?: ContentForTwitterPostSchedule | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'text': value.text,
        'status': value.status,
        'project': value.project,
        'topic': value.topic,
    };
}
