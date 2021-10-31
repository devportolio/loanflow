import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchFriendList } from '../../store/friendSlice'

export default function FriendList() {
    const dispatch = useDispatch()


    // useEffect(() => {
    //     dispatch(fetchFriendList())
    // }, [])

    return (
        <div>
            <h1>Friends lists</h1>
            <ul>
                <li>hello</li>
            </ul>
        </div>
    )
}
