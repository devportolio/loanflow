import React from 'react'
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
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
    InputRightElement,
    InputGroup,
    Icon
} from '@chakra-ui/react';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'

import { fetchResetPassword } from '../../store/authSlice';
import { REQUIRED } from '../../constants/validation';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function ResetPassword() {
    const history = useHistory();
    const query = useQuery();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { errorMessage, isLoading } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const [show, setShow] = React.useState(false)
    
    const token = query.get('token')
    const email = query.get('email')

    const onSubmit = async data => {
        await dispatch(fetchResetPassword({token, email, ...data})).unwrap()
        history.push("/login")
    }
  
    return (
        <Container px="10">
            <Heading py="5">Reset Password</Heading>
            <Text color="blue">{isLoading&&'Loading....'}</Text>
            {errorMessage?<Text color="red">{errorMessage}</Text>:""}
            <form onSubmit={handleSubmit(onSubmit)}>
                <VStack spacing="5">
                    <FormControl>
                        <FormLabel>Email address</FormLabel>
                        <Input placeholder="Enter Email" type="email" defaultValue={email} readOnly={true} color="gray.400" />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Password</FormLabel>
                        {/* <Input placeholder="Enter Password" type="password" {...register("password", { required: true })} /> */}

                        <InputGroup>
                            <Input type={show ? 'text' : 'password'} placeholder='Enter password' {...register("password", { required: true })} />
                            <InputRightElement>
                                <Button size='sm' onClick={()=>setShow(!show)} bg="white" mr="1">
                                    {show ? <Icon as={AiOutlineEye} w={6} h={6}/>: <Icon as={AiOutlineEyeInvisible} w={6} h={6}/>}
                                </Button>
                            </InputRightElement>
                        </InputGroup>

                        {errors.password && <FormHelperText color="red">{REQUIRED}</FormHelperText>}
                    </FormControl>

                    <Button type="submit" isFullWidth colorScheme="blue">Submit</Button>
                </VStack>
            </form>
        </Container>        

        // <form onSubmit={handleSubmit(onSubmit)}>
        //     <p>Forgot password</p>
        //     <p>{isLoading&&'Loading....'}</p>
        //     {errorMessage?<p>{errorMessage}</p>:""}            
        //     <p>
        //         <input placeholder="Email" readOnly defaultValue={email}/>
        //         {errors.email && <div>This field is required</div>}
        //     </p>

        //     <p>
        //         <input placeholder="Password" type="password" {...register("password", { required: true })} />
        //         {errors.password && <div>This field is required</div>}
        //     </p>

        //     <input type="submit" />
        // </form>
    );
}

