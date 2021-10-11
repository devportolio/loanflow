import axios from 'axios';
import { useLocation } from 'react-router';

export const authRedirect = '/dashboard';

export const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

export const setToken = (token) => {
    window.localStorage.setItem('ACCESS_TOKEN', token)
}

export const apiHttp = () => {

    const instance = axios.create({ baseURL: 'api'})

    instance.defaults.headers.common['Authorization'] = `Bearer ${window.localStorage.getItem('ACCESS_TOKEN')}`
    instance.defaults.headers.common['Content-Type'] = 'application/json';
    instance.defaults.headers.common['Accept'] = 'application/json';

    return instance
}

