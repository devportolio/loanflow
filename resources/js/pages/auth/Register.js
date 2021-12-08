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
    Button
} from '@chakra-ui/react';

import { fetchRegister } from '../../store/authSlice';
import { authRedirect } from '../../utilities/http';
import { REQUIRED } from '../../constants/validation';

export default function Register() {
    const history = useHistory()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { errorMessage, isLoading } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const onSubmit = async data => {
        await dispatch(fetchRegister(data)).unwrap()
        history.push(authRedirect)
    }
  
    return (
        <Container px="10">
            <Heading py="5">Register</Heading>
            <Text color="blue">{isLoading&&'Loading....'}</Text>
            {errorMessage?<Text color="red">{errorMessage}</Text>:""}
            <form onSubmit={handleSubmit(onSubmit)}>
                <VStack spacing="5">
                    <FormControl>
                        <FormLabel>Full Name</FormLabel>
                        <Input placeholder="Enter Full Name" type="name" {...register("name", { required: true })} />
                        {errors.name && <FormHelperText color="red">{REQUIRED}</FormHelperText>}
                    </FormControl>

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

                    <Button type="submit" w="100%" colorScheme="blue">Register</Button>
                </VStack>
            </form>

            <HStack justifyContent="center" mt="5">
                <Text>Already has an account?</Text>
                <Text color="blue.400" display="inline" ml="3">
                        <Link to="/login">Login</Link>
                </Text>
            </HStack>
        </Container>
    );
}

