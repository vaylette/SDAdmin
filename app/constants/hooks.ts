'use client'

import axios from "axios"
import toast from "react-hot-toast"
import useAuthStore, { AuthStore } from "../store/useAuthStore"

export const useRetrieveData = () => {
  const authStore = useAuthStore((state) => state) as AuthStore
  const { token } = authStore

  const retrieveData = async (url: string) => {
    try {
      if (!navigator.onLine) {
        toast.error('No internet connection')
        return
      }
      const response = await axios.get(`${url}`, { headers: headers(token) })
      return response.data
    } catch (error: any) {
      toast.error(error.response.data.message)
    } finally {
    }
  }
  return retrieveData
}


export const usePostData = () => {
  const authStore = useAuthStore((state) => state) as AuthStore
  const { token } = authStore;

  const postData = async (url: string, data: any, isMultipart: boolean = false) => {
    try {
      const headers = isMultipart ? { 'Authorization': `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } : { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };
      const response = await axios.post(url, data, { headers });
      toast.success(`${response.data}`);
      return response.data;
    } catch (error: any) {
      toast.error(`${JSON.stringify(error?.response?.data?.errors)}` || `${error}` || 'An error occurred');
    }
  };

  return postData;
};

export const usePatchData = () => {
  const authStore = useAuthStore((state) => state) as AuthStore;
  const { token } = authStore;

  const patchData = async (url:string , data:any, isMultipart:boolean = false) => {
    try {
      
      const headers = isMultipart ? { 'Authorization': `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } : { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };
      const response = await axios.patch(url, data, { headers });
      
      toast.success(`${response.data?._id ? "Success" : "Completed"}`);
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'An error occurred');
    }
  };

  return patchData;
};

export const useDeleteData = () => {
  const authStore = useAuthStore((state) => state) as AuthStore;
  const { token } = authStore;

  const deleteData = async (url:string) => {
    try {
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };
      const response = await axios.delete(url, {headers});
      toast.success('Deleted successfully')
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'An error occurred')
      return error.response?.data?.message || 'An error occurred';
    }
  };

  return deleteData;
};

const headers = (token: string | null) => {
  const header = {
    Authorization: `Bearer ${token}`,
  }
  return header
}