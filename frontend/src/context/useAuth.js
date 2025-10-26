import {createContext, useContext, useEffect, useState} from 'react'
import { auth, loginuser, register } from '../endpoints/api'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export const AuthProvider = ({children}) =>{
    const [isAuthenticate, setIsAuthenticate] = useState(false)
    const [isloading, setIsLoading] = useState(true)
    const nav = useNavigate()

    const get_auth = async() => {
        try{
            const res = await auth()
            setIsAuthenticate(res)
        }catch(err){
            setIsAuthenticate(false)
        }finally{
            setIsLoading(false)
        }
    }
    const login = async(username, password) =>{
        const res = await loginuser(username,password)
        if(res){
            setIsAuthenticate(true)
            nav('/menu')
        }
    }

    const registeruser = async(username, email, password, confirmPassword) => {
        if(password === confirmPassword){
            await register(username,email,password)
            alert('User created')
        }else{
            alert('Password does not match')
        }
        console.log(username, email, password, confirmPassword)
        console.log(password===confirmPassword)
        console.log(typeof(password),typeof(confirmPassword))
    } 

    useEffect(()=>{get_auth()},[])
    return (
        <AuthContext.Provider value={{isAuthenticate,isloading, login, registeruser}}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => useContext(AuthContext)