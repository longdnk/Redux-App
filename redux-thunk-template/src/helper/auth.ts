
export const getToken = () => localStorage.getItem('token');

export const getUser = () => localStorage.getItem('userName');

export const getId = () => localStorage.getItem('userId');

export const checkAuth = () => {
    const haveToken = getToken(), haveUser = getUser(), haveId = getId();
    return haveToken && haveUser && haveId;
}