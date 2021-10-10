import { useLocation } from 'react-router';

export const authRedirect = '/dashboard';

export const apiUrl = 'http://loanflow.local/api';

export const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}