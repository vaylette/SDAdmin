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
          toast.error(error.response.data.message)
        }finally{
        }
    }
    return retrieveData
}

export const usePostData = () => {
    const authStore = useAuthStore((state) => state) as AuthStore
    const { token } =  authStore
  
    const postData = async (url: string, data: FormData) => {
      try {
        const response = await axios.post(`${url}`, data, { headers: headers(token) })
        return response.data
      } catch (error: any) {
        toast.error(error.response.data.message)
      }
    }
    return postData
  }

const headers = (token: string | null) => {
    const header = {
      Authorization: `Bearer ${token}`,
    }
    return header
}