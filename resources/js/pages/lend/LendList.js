import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { fetchLending } from '../../store/loanSlice'

export default function LendList() {
    const dispatch = useDispatch()
    const history = useHistory()
    const loan = useSelector(state => state.loan)

    useEffect(() => {
        dispatch(fetchLending())
    }, [])

    return (
        <div>
            <h1>Lending list</h1>
            {loan.lendingList.length && loan.lendingList.map(i => 
            <>
                <button key={i.id} onClick={()=>history.push('/loan-payments', {loanId: i.id})}>Pay</button>
                <pre key={i.id}>{JSON.stringify(i)}</pre>
            </>
            )}
        </div>
    )
}
