'use client'

import axios from  'axios'
import { apiUrls } from '../constants/apiUrls'

interface LoginForm {
    username: string
    password: string
}
export async function authenticate(form: LoginForm) {
    try {
        // const response = await axios.post(`${apiUrls.logIn}`, form)
        // if(response.status === 201){
        //     //@ts-ignore
        //     return response.data
        // }
        return {}
    } catch (error) {
        //@ts-ignore
       return error.response
    }
}