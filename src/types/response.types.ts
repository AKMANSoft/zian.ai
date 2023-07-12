

export interface ApiResponse<T = unknown> {
    data: T | null;
    message: string;
    status: boolean;
}


export type LoginApiResponse = ApiResponse<{
    authorization: string;
    created: Date;
    email: string;
    data: string;
    package: string;
    phone: string;
    quota: number;
}>

export type RegisterApiResponse = ApiResponse<{ authorization: string }>


export type IndustryListApiResponse = ApiResponse<Array<{
    id: number,
    name: string
}>>

export type KeywordApiResponse = ApiResponse<{
    filter: boolean;
    industry: {
        id: number;
        industry: string;
        name: string;
    },
    keyword: string;
}>

export type GenerateApiResponse = ApiResponse<string>
export type ArticlesApiResponse = ApiResponse<Array<Article>>


export type Article = {
    id: number;
    headline: string;
    summary: string;
    article: string;
    image: string;
    timestamp: Date;
}
