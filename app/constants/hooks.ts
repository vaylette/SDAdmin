'use client'

import axios from "axios"
import toast from "react-hot-toast"
import useAuthStore, { AuthStore } from "../store/useAuthStore"

export const useRetrieveData = () => {
    const authStore = useAuthStore((state) => state) as AuthStore
    const { token } =  authStore

    const retrieveData = async (url: string) => {
        try{
            if(!navigator.onLine){
                toast.error('No internet connection')
                return
            }

            const response = await axios.get(`${url}`, { headers: headers(token) })
            return response.data
        } catch (error: any) {
            console.log(`what is the error : ${error}`)
        }finally{
        }
    }
    return retrieveData
}

const headers = (token: string | null) => {
    const header = {
      Authorization: `Bearer ${token}`,
    }
    return header
}