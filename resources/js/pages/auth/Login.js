import React from 'react'
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
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

import { authRedirect } from '../../utilities/http';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLogin } from '../../store/authSlice';
import { REQUIRED } from '../../constants/validation';


export default function Login() {
    const history = useHistory()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { errorMessage, isLoading } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const onSubmit = async data => {
        await dispatch(fetchLogin(data)).unwrap()
        history.push(authRedirect)
    }

    return (
        <Container px="10">
            <Heading py="5">Login</Heading>
            <Text color="blue">{isLoading&&'Loading....'}</Text>
            {errorMessage?<Text color="red">{errorMessage}</Text>:""}
            <form onSubmit={handleSubmit(onSubmit)}>
                <VStack spacing="5">
                    <FormControl>
                        <FormLabel>Email address</FormLabel>
                        <Input placeholder="Enter Email" type="email" {...register("email", { required: true })} />
                        {errors.email && <FormHelperText color="red">{REQUIRED}</FormHelperText>}
                    </FormControl>

                    <FormControl>
                        <FormLabel>Password</FormLabel>
                        <Input placeholder="Enter Password" type="password" {...register("password", { required: true })} />
                        {errors.password && <FormHelperText color="red">{REQUIRED}</FormHelperText>}
                    </FormControl>

                    <Button type="submit" w="100%" colorScheme="blue">Login</Button>
                </VStack>
            </form>

            <HStack justifyContent="space-between" mt="5">
                <Text color="blue.400">
                    <Link to="/forgot-password">Forgot Password?</Link>
                </Text>
                <HStack>
                    <Text>No account yet? </Text>
                    <Text color="blue.400" ml="3">
                        <Link to="/register">Register</Link>
                    </Text>
                </HStack>
            </HStack>
        </Container>
    );
}

