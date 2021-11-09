import React from 'react'
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { createNewLoan } from '../../store/loanSlice';

export default function LendForm() {
    const dispatch = useDispatch()
    const loan = useSelector(state => state.loan)
    const auth = useSelector(state => state.auth)
    const { friend } = useSelector((state) => state.friend)

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const watchHasInterest = watch("has_interest", false);

    const onSubmit = (data) => {
        dispatch(createNewLoan(data))
    }


    return (
        <div>
            {loan.list.length && JSON.stringify(loan.list)}

            <h1>Lend to {friend && friend.name}</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="hidden" defaultValue={auth.user&&auth.user.id} {...register("lender_id")} />
                <input type="hidden" defaultValue="2" {...register("user_id")} />

                <p>
                    Amount:
                    <input type="number" {...register("amount", { required: true })} />
                </p>

                <p>
                    Has interest:
                    <input type="checkbox" {...register("has_interest")} />
                </p>

                {
                    watchHasInterest &&
                    <>
                    <p>
                        Type:
                        <select {...register("type", { required: watchHasInterest })} >
                            <option value="fixed">Fixed</option>
                            <option value="flexible">Flexible</option>
                        </select>
                    </p>
                    <p>
                        Duration:
                        <input type="number" {...register("duration", { required: watchHasInterest })} />
                    </p>

                    <p>
                        Frequency:
                        <select {...register("frequency", { required: watchHasInterest })} >
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                            <option value="yearly">Yearly</option>
                        </select>
                    </p>

                    <p>
                        Rate:
                        <input type="number" {...register("rate", { required: watchHasInterest })} />
                    </p>
                    
                    <p>
                        No of payment:
                        <input type="number" {...register("no_of_payment", { required: watchHasInterest })} />
                    </p>
                    </>
                }
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
