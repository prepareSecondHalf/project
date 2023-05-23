import { Apis } from "./api";

let jwtAuthToken: (string|null) = null;

export const setAuthToken = (token: string) => {
    jwtAuthToken = token;
}

export const removeAuthToken = (token: string) => {
    jwtAuthToken = null;
}

export const getToken = () => {
    return jwtAuthToken;
}

export const setHeaderAuth = () => {
    if (jwtAuthToken) Apis.setTokenHeader(jwtAuthToken);
    else Apis.removeToken(jwtAuthToken);
}