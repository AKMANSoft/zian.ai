

export interface ApiResponse<T = unknown> {
    data: T | null;
    message: string;
    success: boolean;
}

export type AuthUser = {
    authorization: string;
    created: Date;
    email: string;
    data: string;
    package: string;
    phone: string;
    quota: number;
}


export type LoginApiResponse = ApiResponse<AuthUser>

export type SignUpApiResponse = ApiResponse<string>


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
    body: string;
    image: string;
    timestamp: Date;
}
