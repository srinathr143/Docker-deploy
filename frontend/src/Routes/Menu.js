import {VStack, Heading, Text, Button} from '@chakra-ui/react'
import { getdata, logout } from '../endpoints/api'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Menu = () => {
    const [note, setNote] = useState([])
    const nav = useNavigate()

    useEffect(()=>{
        const info = async() => {
            const res = await getdata()
            setNote(res)
        }
        info()
    },[])

    const logOut = async() => {
        await logout()
        nav('/login')
    }

  return (
    <VStack>
        <Heading>
            Welcome Back User
        </Heading>
        <VStack>
            {note?.map((n,i)=>(
                <Text key={i}>{n.description}</Text>
            ))}
        </VStack>
        <Button onClick={logOut} colorScheme='red'>Logout</Button>
    </VStack>
  )
}

export default Menu