import { axiosClient } from "./client";

export const api = {
    get: async url => axiosClient.get(url),
    post: async (url, data) => await axiosClient.post(url, data),
    put: async (url, data) => await axiosClient.put(url, data),
    patch: async (url, data) => await axiosClient.patch(url, data),
    delete: async (url, data) => await axiosClient.delete(url),
}