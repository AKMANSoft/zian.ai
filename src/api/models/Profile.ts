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
 * @interface Profile
 */
export interface Profile {
    /**
     * 
     * @type {number}
     * @memberof Profile
     */
    user: number;
    /**
     * 
     * @type {string}
     * @memberof Profile
     */
    phone?: string | null;
    /**
     * 
     * @type {number}
     * @memberof Profile
     */
    timezone?: number | null;
    /**
     * 
     * @type {string}
     * @memberof Profile
     */
    readonly timezoneText?: string;
    /**
     * 
     * @type {number}
     * @memberof Profile
     */
    tweetImageStyle?: number;
    /**
     * 
     * @type {string}
     * @memberof Profile
     */
    otherStyle?: string | null;
    /**
     * 
     * @type {number}
     * @memberof Profile
     */
    industry?: number | null;
    /**
     * 
     * @type {string}
     * @memberof Profile
     */
    otherIndustry?: string | null;
    /**
     * 
     * @type {number}
     * @memberof Profile
     */
    contentTone?: number;
    /**
     * 
     * @type {string}
     * @memberof Profile
     */
    otherTone?: string | null;
    /**
     * 
     * @type {number}
     * @memberof Profile
     */
    currentProject?: number | null;
    /**
     * 
     * @type {Date}
     * @memberof Profile
     */
    readonly createdTime?: Date;
}

/**
 * Check if a given object implements the Profile interface.
 */
export function instanceOfProfile(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "user" in value;

    return isInstance;
}

export function ProfileFromJSON(json: any): Profile {
    return ProfileFromJSONTyped(json, false);
}

export function ProfileFromJSONTyped(json: any, ignoreDiscriminator: boolean): Profile {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'user': json['user'],
        'phone': !exists(json, 'phone') ? undefined : json['phone'],
        'timezone': !exists(json, 'timezone') ? undefined : json['timezone'],
        'timezoneText': !exists(json, 'timezone_text') ? undefined : json['timezone_text'],
        'tweetImageStyle': !exists(json, 'tweet_image_style') ? undefined : json['tweet_image_style'],
        'otherStyle': !exists(json, 'other_style') ? undefined : json['other_style'],
        'industry': !exists(json, 'industry') ? undefined : json['industry'],
        'otherIndustry': !exists(json, 'other_industry') ? undefined : json['other_industry'],
        'contentTone': !exists(json, 'content_tone') ? undefined : json['content_tone'],
        'otherTone': !exists(json, 'other_tone') ? undefined : json['other_tone'],
        'currentProject': !exists(json, 'current_project') ? undefined : json['current_project'],
        'createdTime': !exists(json, 'created_time') ? undefined : (new Date(json['created_time'])),
    };
}

export function ProfileToJSON(value?: Profile | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'user': value.user,
        'phone': value.phone,
        'timezone': value.timezone,
        'tweet_image_style': value.tweetImageStyle,
        'other_style': value.otherStyle,
        'industry': value.industry,
        'other_industry': value.otherIndustry,
        'content_tone': value.contentTone,
        'other_tone': value.otherTone,
        'current_project': value.currentProject,
    };
}

