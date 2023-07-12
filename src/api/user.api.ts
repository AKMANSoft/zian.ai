/* eslint-disable @typescript-eslint/no-explicit-any */
import apiConfig from "@/config/api.config";
import { definedMessages } from "@/lib/constants";
import { CustomError } from "@/types/error";
import { LoginApiRequest, RegisterApiRequest } from "@/types/request.types";
import { LoginApiResponse, RegisterApiResponse } from "@/types/response.types";
import axios from "axios";



// const data = {
//     "email": "testing1236@gmail.com",
//     "password": "test123",
//     "phone": "0857678345",
//     "name": "Test 123"
// }


export async function register(data: RegisterApiRequest): Promise<RegisterApiResponse> {
    try {
        const res = await axios.post(apiConfig.endpoints.register, data)
        if (res.status === 200 && res.data.status) {
            console.log(res)
            return {
                message: res.data.message ?? "",
                status: res.data.status ?? false,
                data: res.data.authorization
            }
        }
        throw new CustomError(definedMessages.UNKNOWN_ERROR_TRY_AGAIN)
    } catch (error: any) {
        console.error(error)
        return {
            message: ((error instanceof CustomError) ? error.message : error?.response?.data?.message) ?? "",
            status: false,
            data: null
        }
    }
}
export async function login(data: LoginApiRequest): Promise<LoginApiResponse> {
    try {
        const res = await axios.post(apiConfig.endpoints.login, data)
        if (res.status === 200 && res.data.status) {
            return {
                message: res.data.message ?? "",
                status: res.data.status ?? false,
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
            status: false,
            data: null
        }
    }
}
