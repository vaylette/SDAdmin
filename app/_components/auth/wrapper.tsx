'use client'

import { useEffect, useLayoutEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import logo from '../../../public/images/logo.png'
import bulb from '../../../public/images/bulb.png'
import toast from 'react-hot-toast'
import { authenticate } from '@/app/actions/authenticate'
import useAuthStore, { AuthStore } from '@/app/store/useAuthStore'
import { useRouter } from 'next/navigation'
import { useCookies } from 'next-client-cookies';

export default function AuthWrapper() {
    const router = useRouter()
    const authStore = useAuthStore((state) => state) as AuthStore
    const cookies = useCookies();

    const setAuthentication = authStore.setAuthentication
    const setUser = authStore.setUser
    const setToken = authStore.setToken

    const [form, setForm] = useState({
        username: "",
        password: ""
    })

    const [loading, setLoading] = useState(false)

    const handleChange = (event: any) => {
        const { name, value } = event.target
        setForm(prevForm => {
            return {
                ...prevForm,
                [name]: value,
            }
        })
    }

    useLayoutEffect(()=>{
        console.log("we are still in auth wrapper")
    })

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        if (form.username === "" || form.password === "") {
            toast.error("Please fill in all fields")
        } else {
            setLoading(true)
            try {
                const response = await authenticate(form)
                if (response.status === 401) {
                    toast.error("Invalid user inputs check your username and password")
                } else {
                    if (["admin", "superadmin", "contentmoderator", "contentadmin", "customercare"].includes(response.user.type.toLowerCase())) {
                        setAuthentication(true);
                        setUser(response.user);
                        setToken(response.access_token);
                        cookies.set('token', response.access_token, { secure: false });
                        toast.success('Successfully authenticated!');
                        router.push('/dashboard');
                    } else {
                        toast.error('Unauthorized to access admin')
                    }
                }
            } catch (error) {
                toast.error('Authentication failed')
            } finally {
                setLoading(false)
            }
        }

    }

    return (
        <div className='w-full h-auto bg-auth bg-no-repeat py-[51px] px-[74px]'>
            <div className='flex flex-col gap-[50px]'>
                <div className='flex flex-row justify-between items-center px-[26px]'>
                    <Link href='#'>
                        <Image src={logo} priority className='w-[280px] h-[66.5px]' alt='SmartDarasa' />
                    </Link>
                    <Link href='#' className='w-auto h-auto rounded-[37px] border-[2px] border-solid border-orange-default px-[41px] py-[22px] uppercase text-orange-default font-medium leading-5 text-2xl'>sign in</Link>
                </div>
                <div className='w-full h-[1px] bg-black-300'></div>
            </div>
            <div className='my-[97px] flex justify-center'>
                <div className='w-auto h-auto rounded-[20px] drop-shadow-auth'>
                    <div className='flex flex-row h-[547px]'>
                        <div>
                            <Image className='w-[350px] h-full' priority src={bulb} alt='SmartDarasa' />
                        </div>
                        <div className='w-auto h-full flex items-center bg-white-300 py-[50px] px-[55px] rounded-r-[20px]'>
                            <div className='flex flex-col gap-[26px]'>
                                <div className='flex flex-col gap-[10px]'>
                                    <h5 className='text-orange-default text-[40px] font-bold leading-[30px]'>Welcome back!</h5>
                                    <p className='text-black-300 text-[20px] leading-[30px]'>Enter your details to continue</p>
                                </div>
                                <form onSubmit={handleSubmit} className='flex flex-col items-center gap-[10px] w-[377px]'>
                                    <input type='email' onChange={handleChange} value={form.username} name="username" className='w-full h-[54px] rounded-[5px] bg-black-200 px-6 py-5 text-black-300 text-lg leading-[21px] placeholder:text-black-300 placeholder:text-lg placeholder:leading-[21px] focus:ring-0 focus:outline-none' placeholder='Email address' />
                                    <input type='password' onChange={handleChange} value={form.password} name="password" className='w-full h-[54px] rounded-[5px] bg-black-200 px-6 py-5 text-black-300 text-lg leading-[21px] placeholder:text-black-300 placeholder:text-lg placeholder:leading-[21px] focus:ring-0 focus:outline-none' placeholder='Password' />
                                    <div className='mt-[10px]'>
                                        <button type='submit' className={`w-[377px] h-[54px] bg-orange-default uppercase text-white-default text-lg font-medium leading-[21px] flex items-center justify-center rounded-full ${loading ? 'flex flex-row gap-2 items-center' : ''}`} disabled={loading}>
                                            <span>log in</span>
                                            {loading && (
                                                <svg height="40" width="40" className="text-white-default">
                                                    <circle className="dot" cx="10" cy="20" r="3" />
                                                    <circle className="dot" cx="20" cy="20" r="3" />
                                                    <circle className="dot" cx="30" cy="20" r="3" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

