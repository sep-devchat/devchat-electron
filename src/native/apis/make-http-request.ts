import { ApiResponseDto, MakeHttpRequestParams, MakeHttpRequestResult, NativeAPIHandler } from "../types";
import axios from "axios";

const makeHttpRequest = async <T = any>(params: MakeHttpRequestParams): Promise<MakeHttpRequestResult<T>> => {
    try {
        const response = await axios<ApiResponseDto<T>>({
            url: params.url,
            method: params.method,
            data: params.body,
            headers: { ...params.headers }
        });

        return {
            response,            
        }
    } catch (error) {
        return {
            error
        }
    }
}

export default makeHttpRequest;