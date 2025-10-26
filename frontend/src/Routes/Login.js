import { VStack, FormControl, FormLabel, Input, Button, Text} from '@chakra-ui/react'
//import { loginuser } from '../endpoints/api'
import {  useState } from 'react'
import {useAuth} from '../context/useAuth'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [username, setUsename] = useState('')
    const [password, setPassword] = useState('')
    const {login} = useAuth()
    const nav = useNavigate()

    const handleLogin = () => {
        login(username,password)
    }

    const handleRegister = () => {
        nav('/register')
    }
  return (
    <VStack>
        <FormControl>
            <FormLabel>Username</FormLabel>
            <Input type='text' placeholder='Enter Your name...' onChange={(e)=>setUsename(e.target.value)} />
        </FormControl>
        <FormControl>
            <FormLabel>Password</FormLabel>
            <Input type='password' placeholder='Enter your Password' onChange={(e)=> setPassword(e.target.value)}/>
        </FormControl>
        <Button onClick={handleLogin} colorScheme='green'>Login</Button>
        <Text onClick={handleRegister}>Don't have an Account? Sign Up</Text>
    </VStack>
  )
}

export default Login