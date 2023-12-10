import { UserToken } from "@features/Login/redux/type";
import { hash } from "@src/helper/hash";

export const getToken = () => localStorage.getItem('appToken');

export const getUser = () => localStorage.getItem('userName');

export const getId = () => localStorage.getItem('userId');

export const checkAuth = () => {
    const haveToken = getToken(), haveUser = getUser(), haveId = getId();
    return haveToken && haveUser && haveId;
}

export const setToken = (info: UserToken) => {
    localStorage.setItem('userName', info.name);
    localStorage.setItem('userId', hash(info.id));
    localStorage.setItem('appToken', info.token);
}

export const clearToken = () => {
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    localStorage.removeItem('appToken');
    localStorage.removeItem('infoImage');
}

export const loadImage = () => {
    return localStorage.getItem('infoImage');
}

export const loadUser = () => {
    return localStorage.getItem('userName');
}

export const applyToken = () => {
    let headers = {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        Acceptable: 'application/json',
        Authorization: '',
    }

    const isAuth = checkAuth();

    const token = getToken();

    if (isAuth) {
        headers = {
            ...headers,
            Authorization: `Bearer ${token}`,
        }
    }
    return headers;
}