import axios from "axios";
import * as querystring from "query-string";

const { REACT_APP_API_URL: API_URL } = process.env;

const instance = axios.create({
    baseURL: API_URL,
    headers: {
        "Accept-Language": "pt-BR"
    },
    paramsSerializer: params => querystring.stringify(params)
});
let authInterceptor;

export default {
    initAuthInterceptor: token => {
        authInterceptor = instance.interceptors.request.use(config => {
            config.headers.Authorization = `Bearer ${token}`;
            return config;
        }, err => {
            return Promise.reject(err);
        });
    },
    removeAuthInterceptor: () => {
        instance.interceptors.request.eject(authInterceptor);
    },
    get: (...args) => instance.get.apply(this, args),
    post: (...args) => instance.post.apply(this, args),
    put: (...args) => instance.put.apply(this, args),
    delete: (...args) => instance.delete.apply(this, args),
    axios: instance
};