/* eslint-disable @typescript-eslint/no-explicit-any */
import apiConfig from "@/config/api.config";
import { definedMessages } from "@/lib/constants";
import { CustomError } from "@/types/error";
import { CustomizeSchema, LoginFormSchema, SignUpFormSchema, UpdateProfileSchema } from "@/types/forms.types";
import { AuthUser, KeywordApiResponse, LoginApiResponse, SignUpApiResponse, UpdateProfileResponse } from "@/types/response.types";
import axios from "axios";




export async function signup(data: SignUpFormSchema): Promise<SignUpApiResponse> {
    try {
        const res = await axios.post(apiConfig.endpoints.register, data)
        if (res.status === 200 && res.data.status) {
            console.log(res)
            return {
                message: res.data.message ?? "",
                success: res.data.status ?? false,
                data: res.data.authorization
            }
        }
        throw new CustomError(definedMessages.UNKNOWN_ERROR_TRY_AGAIN)
    } catch (error: any) {
        console.error(error)
        return {
            message: ((error instanceof CustomError) ? error.message : error?.response?.data?.message) ?? "",
            success: false,
            data: null
        }
    }
}

export async function updateProfile(data: UpdateProfileSchema, authUser: AuthUser): Promise<UpdateProfileResponse> {
    try {
        const res = await axios.post(
            apiConfig.endpoints.updateProfile,
            {
                ...(authUser.email !== data.email && { email: data.email }),
                name: data.name,
                phone: data.phone,
                website: data.website
            }
        )
        if (res.status === 200 && res.data.status) {
            return {
                message: res.data.message ?? "",
                success: res.data.status ?? false,
                data: res.data.account
            }
        }
        throw new CustomError(definedMessages.UNKNOWN_ERROR_TRY_AGAIN)
    } catch (error: any) {
        console.error(error)
        return {
            message: ((error instanceof CustomError) ? error.message : error?.response?.data?.message) ?? "",
            success: false,
            data: null
        }
    }
}


export async function login(data: LoginFormSchema): Promise<LoginApiResponse> {
    try {
        const res = await axios.post(apiConfig.endpoints.login, data)
        if (res.status === 200 && res.data.status) {
            return {
                message: res.data.message ?? "",
                success: res.data.status ?? false,
                data: (res.data.account && {
                    ...res.data.account,
                    created: new Date(res.data.account.created)
                })
            }
        }
        throw new CustomError(definedMessages.UNKNOWN_ERROR_TRY_AGAIN)
    } catch (error: any) {
        console.error(error)
        return {
            message: ((error instanceof CustomError) ? error.message : error?.response?.data?.message) ?? "",
            success: false,
            data: null
        }
    }
}

export async function updateKeyword(data: CustomizeSchema): Promise<KeywordApiResponse> {
    try {
        const res = await axios.post(
            apiConfig.basepath,
            {
                industry_id: parseInt(data.industry),
                keyword: data.keywords.join(", "),
                filter: data.filter,
                ...(data.website && { website: data.website })
            }
        )
        if (res.status === 200 && res.data.status) {
            return {
                message: res.data.error ?? "",
                success: res.data.status ?? false,
                data: res.data.message
            }
        }
        throw new CustomError(definedMessages.UNKNOWN_ERROR_TRY_AGAIN)
    } catch (error: any) {
        console.error(error)
        return {
            message: ((error instanceof CustomError) ? error.message : error?.response?.data?.error) ?? "",
            success: false,
            data: null
        }
    }
}
