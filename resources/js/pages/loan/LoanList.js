import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLoans } from '../../store/loanSlice'

export default function LoanList() {
    const dispatch = useDispatch()
    const loan = useSelector(state => state.loan)

    useEffect(() => {
        dispatch(fetchLoans())
    }, [])

    return (
        <div>
            <h1>Loan list</h1>
            {loan.list.length && loan.list.map(i => <pre key={i.id}>{JSON.stringify(i)}</pre>)}
        </div>
    )
}
