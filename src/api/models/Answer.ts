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
 * @interface Answer
 */
export interface Answer {
    /**
     * 
     * @type {number}
     * @memberof Answer
     */
    readonly id?: number;
    /**
     * 
     * @type {string}
     * @memberof Answer
     */
    text: string;
    /**
     * 
     * @type {number}
     * @memberof Answer
     */
    question: number;
    /**
     * 
     * @type {string}
     * @memberof Answer
     */
    readonly questionText?: string;
    /**
     * 
     * @type {number}
     * @memberof Answer
     */
    project: number;
    /**
     * 
     * @type {string}
     * @memberof Answer
     */
    readonly projectText?: string;
    /**
     * 
     * @type {Date}
     * @memberof Answer
     */
    readonly createdTime?: Date;
}

/**
 * Check if a given object implements the Answer interface.
 */
export function instanceOfAnswer(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "text" in value;
    isInstance = isInstance && "question" in value;
    isInstance = isInstance && "project" in value;

    return isInstance;
}

export function AnswerFromJSON(json: any): Answer {
    return AnswerFromJSONTyped(json, false);
}

export function AnswerFromJSONTyped(json: any, ignoreDiscriminator: boolean): Answer {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'text': json['text'],
        'question': json['question'],
        'questionText': !exists(json, 'question_text') ? undefined : json['question_text'],
        'project': json['project'],
        'projectText': !exists(json, 'project_text') ? undefined : json['project_text'],
        'createdTime': !exists(json, 'created_time') ? undefined : (new Date(json['created_time'])),
    };
}

export function AnswerToJSON(value?: Answer | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'text': value.text,
        'question': value.question,
        'project': value.project,
    };
}
