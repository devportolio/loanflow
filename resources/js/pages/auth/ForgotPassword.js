import React from 'react'
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { 
    Container,
    FormControl,
    FormLabel,
    Input,
    FormHelperText,
    Heading,
    VStack,
    HStack,
    Text,
    Button,
} from '@chakra-ui/react';

import { fetchForgotPassword } from '../../store/authSlice';
import { REQUIRED } from '../../constants/validation';

export default function ForgotPassword() {
    const history = useHistory()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { errorMessage, isLoading } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const onSubmit = async data => {
        await dispatch(fetchForgotPassword(data)).unwrap()
        history.push("/")
    }


    return (
        <Container px="10">
            <Heading py="5">Forgot password</Heading>
            <Text color="blue">{isLoading&&'Loading....'}</Text>
            {errorMessage?<Text color="red">{errorMessage}</Text>:""}
            <form onSubmit={handleSubmit(onSubmit)}>
                <VStack spacing="5">
                    <FormControl>
                        <FormLabel>Email address</FormLabel>
                        <Input placeholder="Enter Email" type="email" {...register("email", { required: true })} />
                        {errors.email && <FormHelperText color="red">{REQUIRED}</FormHelperText>}
                    </FormControl>

                    <Button type="submit" w="100%" colorScheme="blue">Submit</Button>
                </VStack>
            </form>

            <HStack justifyContent="center" mt="5">
                <Text color="blue.400">
                    <Link to="/login">Back to login</Link>
                </Text>
            </HStack>
        </Container>
    );
}

