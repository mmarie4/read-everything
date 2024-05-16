import axios from "axios";
import store from "./store"
import settings from "../settings.json"

const serverUrl = process.env.SERVER_URL || settings.SERVER_URL;

const http = {
    post: async ({ endpoint, content, errorCallback }: Request) => {
        const headers = buildHeaders();
        try {
            const result = await axios.post(`${serverUrl}/${endpoint}`, content, { headers })
            return result?.data;
        }
        catch (e: any) {
            handleError(e?.response, errorCallback);
        }
    },

    multipart: async ({ endpoint, content, errorCallback }: MultipartRequest) => {
        const headers = buildHeaders('multipart/form-data');
        try {
            const result = await axios.post(`${serverUrl}/${endpoint}`, content, { headers })
            return result?.data;
        }
        catch (e: any) {
            handleError(e?.response, errorCallback);
        }
    },

    get: async ({ endpoint, errorCallback }: Request) => {
        const headers = buildHeaders();
        try {
            const result = await axios.get(`${serverUrl}/${endpoint}`, { headers });
            return result?.data;
        }
        catch (e: any) {
            handleError(e?.response, errorCallback);
        }
    },

    put: async ({ endpoint, content, errorCallback }: Request) => {
        const headers = buildHeaders();
        try {
            const result = await axios.put(`${serverUrl}/${endpoint}`, content, { headers });
            return result?.data;
        }
        catch (e: any) {
            handleError(e?.response, errorCallback);
        }
    },
    
    delete: async ({ endpoint, errorCallback }: Request) => {
        const headers = buildHeaders();
        try {
            const result = await axios.delete(`${serverUrl}/${endpoint}`, { headers });
            return result?.data;
        }
        catch (e: any) {
            handleError(e?.response, errorCallback);
        }
    }
}

const buildHeaders = (contentType = "application/json") => {
    return {
        //Authorization: `Bearer ${store.get('me')?.token}`,
        'Content-Type': contentType
    }
}

const handleError = (result: any, errorCallback: Function) => {
    if (result?.status === 500)
        errorCallback("Internal server error");
    if ([400, 401, 403, 404].includes(result?.status))
        errorCallback(result?.data?.error || "Unknown error");
}

export interface Header { Authorization: string }
export interface Request { endpoint: string, content?: object, errorCallback: Function }
export interface MultipartRequest { endpoint: string, content?: FormData, errorCallback: Function }

export default http;