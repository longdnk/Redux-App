import { toast } from 'sonner';

export const hash = item => {
    item = item.toString();
    let hash = 0;
    for (let i = 0; i < item.length; i++) {
        let char = item.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash &= hash + 1 % (1e9 + 7);
    }
    return hash.toString().repeat(2);
}

export const pushNotification = info => {
    const { type, message } = info;
    return toast[type](message);
}

export const setToken = infoToken => {
    localStorage.setItem('userName', infoToken.name);
    localStorage.setItem('token', infoToken.token);
    localStorage.setItem('password', infoToken.password);
}