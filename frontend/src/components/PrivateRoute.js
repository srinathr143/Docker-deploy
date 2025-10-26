import { useAuth } from '../context/useAuth'
import { Heading } from '@chakra-ui/react'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({children}) => {

    const {isloading, isAuthenticate} = useAuth()   

    if(isloading){
        return <Heading>Loading....</Heading>
    }
    if(isAuthenticate){
        return children
    }else{
        return <Navigate to='/login' replace/>
    }

}

export default PrivateRoute;