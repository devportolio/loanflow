import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router';
import { fetchFriendList, acceptFriend, declineFriend, searchFriend, addFriend, setFriend } from '../../store/friendSlice'

export default function FriendList() {
    const history = useHistory();

    const [email, setEmail] = useState("")
    const { list, friend } = useSelector((state) => state.friend)
    const { user } = useSelector((state) => state.auth)

    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(fetchFriendList())
    }, [])

    const lend = (friend) => {
        // set current friend
        dispatch(setFriend(friend))
        
        // navigate to lend form
        history.push('/lend')
    }

    return (
        
        <div>
            <h5>{user && user.name}</h5>
            <h1>Friends lists</h1>
            <p>
                <input placeholder="search email" onChange={(e) => setEmail(e.target.value)} value={email}/>
                <button onClick={()=>dispatch(searchFriend(email))}>Search</button>
            </p>
            {friend && <p>
                {friend.name}
                <button onClick={()=>dispatch(addFriend(friend.id))}>Add Friend</button>
            </p>}
            <ul>
                {
                    list.length>0
                        ? list.map(item => (
                                <li key={item.id}>
                                    {item.friend.name}
                                    {
                                    item.is_accepted 
                                    ? <>
                                        <button onClick={()=>dispatch(declineFriend(item.id))}>Unfriend</button>
                                        <button onClick={()=>lend(item.friend)}>Lend</button>
                                    </>
                                    : 

                                      item.is_added
                                      ? <button onClick={()=>dispatch(declineFriend(item.id))}>Cancel</button>
                                      : <>
                                        <button onClick={()=>dispatch(acceptFriend(item.id))}>Accept</button>
                                        <button onClick={()=>dispatch(declineFriend(item.id))}>Decline</button>
                                      </>                                
                                }
                            </li>
                        ))
                        : 'No friends'
                }

            </ul>
        </div>
    )
}
