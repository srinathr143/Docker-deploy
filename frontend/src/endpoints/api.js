import axios from 'axios'

const BASE_URL = 'http://127.0.0.1/api/'
const LOGIN_URL = `${BASE_URL}token/`
const REFRESH_URL = `${LOGIN_URL}refresh/`
const GETDATA = `${BASE_URL}getdata/`
const LOGOUTURL = `${BASE_URL}logout/`
const AUTH_URL = `${BASE_URL}auth/`
const REGISTER_URL = `${BASE_URL}register/`

export const loginuser = async(username, password) => {
    try{
    await axios.post(LOGIN_URL,
        {username, password}, {withCredentials:true}
    )
    return true
    }catch{
        return false
    }
}

export const refresh = async() => {
    const resposne = await axios.post(REFRESH_URL, {},{withCredentials:true})
    return resposne.data.Refreshed
}

export const callRefresh = async(err, func) => {
    if(err.response && err.response.status === 400){
        const refresh_token = await refresh()
        if(refresh_token){
            const retry = await func()
            return retry.data
        }
        return false
    }
}

export const getdata = async() => {
    try{
    const response = await axios.get(GETDATA,{withCredentials:true})
    return response.data
    }catch(err){
        return callRefresh(err,axios.get(GETDATA,{withCredentials:true}))
    }
}

export const logout = async() => {
    await axios.post(LOGOUTURL,{},{withCredentials:true})
    return true
}

export const auth = async() => {
    try{
        await axios.post(AUTH_URL,{},{withCredentials:true})
        return true
    }catch(err){
        return false
    }
}

export const register = async(username, email, password) => {
    const res = await axios.post(REGISTER_URL, {username,email,password},{withCredentials:true})
    return res.data
}