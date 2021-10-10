import React, { useEffect } from 'react'
import useFetch from 'use-http'
import { useHistory } from 'react-router';
import { useQuery } from '../../utilities/http'


export default function VerifyEmail() {
    const query = useQuery();
    const history = useHistory();
    const accessToken = window.localStorage.getItem('ACCESS_TOKEN')
    const options = {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${accessToken}`
        }
    }

    const verifyEmailUrl = query.get('url').split('*').join('&')
    const splitUrl = verifyEmailUrl.split('/api/')
    const baseUrl = `${splitUrl[0]}/api`
    const fetchUrl = splitUrl[1]

    const { get, response } = useFetch(baseUrl, options)

    useEffect(() => {
        fetchQuery()
    },[]);

    const fetchQuery = async () => {
        const result = await get(fetchUrl)

        if (response.ok) {
            setTimeout(() => history.push("/"), 2000)
        }
    }

    return (
        <div>
            Email Verified
        </div>
    )
}
