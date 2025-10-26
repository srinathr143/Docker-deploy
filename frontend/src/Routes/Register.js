import {  useState } from "react"
//import { register } from "../endpoints/api"
import {VStack, FormControl, FormLabel, Button, Input, Text} from '@chakra-ui/react'
import { useAuth } from "../context/useAuth"
import { useNavigate } from "react-router-dom"

const Register = () => {
    const [username,setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const {registeruser} = useAuth()
    const nav = useNavigate()

    const handleRegister = () => {
        registeruser(username,email,password,confirmPassword)
        
    }
    const loginPage = () => {
        nav('/login')
    }
  return (
    <VStack>
        <FormControl>
            <FormLabel>Username</FormLabel>
            <Input type="text" placeholder="Enter your name... " onChange={(e)=>setUsername(e.target.value)} value={username}/>
        </FormControl>
        <FormControl>
            <FormLabel>Email</FormLabel>
            <Input type="email" placeholder="Enter your email.... " onChange={(e)=>setEmail(e.target.value)} value={email}/>
        </FormControl>
        <FormControl>
            <FormLabel>Password</FormLabel>
            <Input type="password" placeholder="Enter password..." onChange={(e)=>setPassword(e.target.value)} value={password}/>
        </FormControl>
        <FormControl>
            <FormLabel>Confirm Password</FormLabel>
            <Input type="password" placeholder="Confirm Password" onChange={(e)=>setConfirmPassword(e.target.value)} value={confirmPassword}/>
        </FormControl>
        <Button onClick={handleRegister}>Sign Up</Button>
        <Text onClick={loginPage}>Go to login Page</Text>
    </VStack>
  )
}

export default Register