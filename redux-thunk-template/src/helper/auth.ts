import { LoginSuccess } from "@src/features/Login/redux/type";

export const getToken = () => localStorage.getItem('appToken');

export const getUser = () => localStorage.getItem('userName');

export const getId = () => localStorage.getItem('userId');

export const checkAuth = () => {
    const haveToken = getToken(), haveUser = getUser(), haveId = getId();
    return haveToken && haveUser && haveId;
}

export const setToken = (info: LoginSuccess) => {
    localStorage.setItem('userName', info.username);
    localStorage.setItem('userId', info.id);
    localStorage.setItem('appToken', info.token);
    localStorage.setItem('infoImage', info.image);
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