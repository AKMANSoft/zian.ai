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
 * @interface Question
 */
export interface Question {
    /**
     * 
     * @type {number}
     * @memberof Question
     */
    readonly id?: number;
    /**
     * 
     * @type {string}
     * @memberof Question
     */
    text: string;
    /**
     * 
     * @type {number}
     * @memberof Question
     */
    type: number;
    /**
     * 
     * @type {string}
     * @memberof Question
     */
    readonly typeText?: string;
    /**
     * 
     * @type {string}
     * @memberof Question
     */
    topic?: string | null;
    /**
     * 
     * @type {number}
     * @memberof Question
     */
    industry?: number | null;
    /**
     * 
     * @type {string}
     * @memberof Question
     */
    readonly industryText?: string;
    /**
     * 
     * @type {Date}
     * @memberof Question
     */
    readonly createdTime?: Date;
}

/**
 * Check if a given object implements the Question interface.
 */
export function instanceOfQuestion(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "text" in value;
    isInstance = isInstance && "type" in value;

    return isInstance;
}

export function QuestionFromJSON(json: any): Question {
    return QuestionFromJSONTyped(json, false);
}

export function QuestionFromJSONTyped(json: any, ignoreDiscriminator: boolean): Question {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'text': json['text'],
        'type': json['type'],
        'typeText': !exists(json, 'type_text') ? undefined : json['type_text'],
        'topic': !exists(json, 'topic') ? undefined : json['topic'],
        'industry': !exists(json, 'industry') ? undefined : json['industry'],
        'industryText': !exists(json, 'industry_text') ? undefined : json['industry_text'],
        'createdTime': !exists(json, 'created_time') ? undefined : (new Date(json['created_time'])),
    };
}

export function QuestionToJSON(value?: Question | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'text': value.text,
        'type': value.type,
        'topic': value.topic,
        'industry': value.industry,
    };
}

