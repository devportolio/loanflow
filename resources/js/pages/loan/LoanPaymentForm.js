import React from 'react'
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { createNewLoanPayment } from '../../store/loanSlice';

export default function LoanPaymentForm() {
    const dispatch = useDispatch()

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const loanId = '4';

    const onSubmit = (data) => {
        dispatch(createNewLoanPayment(data))
        // console.log(data)
    }
    return (
        <div>
            <h1>Loan Payment</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="hidden" defaultValue={loanId} {...register("loan_id")} />

                <p>
                    Amount:
                    <input type="number" {...register("amount", { required: true })} />
                </p>

                <p>
                    Date paid
                    <input type="date" {...register("date_paid", { required: true })} />
                </p>

                <p>
                    screenshot:
                    <input type="file" {...register("screenshot")} />
                </p>

                <p>
                    Notes:
                    <input type="text" {...register("notes")} />
                </p>

             
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
