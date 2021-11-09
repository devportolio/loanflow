import axios from 'axios';
import { useLocation } from 'react-router';

export const authRedirect = '/dashboard';

export const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

export const setToken = (token) => {
    window.localStorage.setItem('ACCESS_TOKEN', token)
}

export const getToken = () => window.localStorage.getItem('ACCESS_TOKEN')

const apiHttp = axios.create({ baseURL: 'api'})
apiHttp.defaults.headers.common['Authorization'] = `Bearer ${window.localStorage.getItem('ACCESS_TOKEN')}`
apiHttp.defaults.headers.common['Content-Type'] = 'application/json';
apiHttp.defaults.headers.common['Accept'] = 'application/json';

export { apiHttp }

