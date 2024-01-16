import Link from 'next/link'
import Image from 'next/image'
import logo from '../../../public/images/logo.png'
import bulb from '../../../public/images/bulb.png'

export default function AuthWrapper() {
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
                                <Image className='w-[350px] h-full'  src={bulb} alt='SmartDarasa' />
                            </div>
                            <div className='w-auto h-full flex items-center bg-white-300 py-[50px] px-[55px] rounded-r-[20px]'>
                                <div className='flex flex-col gap-[26px]'>
                                    <div className='flex flex-col gap-[10px]'>
                                        <h5 className='text-orange-default text-[40px] font-bold leading-[30px]'>Welcome back!</h5>
                                        <p className='text-black-300 text-[20px] leading-[30px]'>Enter your details to continue</p>
                                    </div>
                                    <form className='flex flex-col items-center gap-[10px] w-[377px]'>
                                        <input type='email' className='w-full h-[54px] rounded-[5px] bg-black-200 px-6 py-5 text-black-300 text-lg leading-[21px] placeholder:text-black-300 placeholder:text-lg placeholder:leading-[21px] focus:ring-0 focus:outline-none' placeholder='Email address' />
                                        <input type='password' className='w-full h-[54px] rounded-[5px] bg-black-200 px-6 py-5 text-black-300 text-lg leading-[21px] placeholder:text-black-300 placeholder:text-lg placeholder:leading-[21px] focus:ring-0 focus:outline-none' placeholder='Password' />
                                        <div className='mt-[10px]'>
                                            <button className='w-[377px] h-[54px] bg-orange-default uppercase text-white-default text-lg font-medium leading-[21px] flex items-center justify-center rounded-full'>log in</button>
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

