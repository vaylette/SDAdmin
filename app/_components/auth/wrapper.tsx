import Link from "next/link"
import Image from "next/image"
import logo from '../../../public/images/logo.png'

export default function AuthWrapper({
    children, 
    path,
}: {
    children: React.ReactNode,
    path: string
}) {
    return (
        <div className="w-full h-full bg-auth bg-no-repeat pt-[51px] px-[74px]">
            <div className="flex flex-col gap-[50px]">
                <div className="flex flex-row justify-between items-center px-[26px]">
                    <Link href='#'>
                        <Image src={logo} priority className='w-[280px] h-[66.5px]' alt='SmartDarasa' />
                    </Link>
                    <Link href={path === '/register' ? '/' : '/register'} className='w-auto h-auto rounded-[37px] border-[2px] border-solid border-orange-default px-[41px] py-[22px] uppercase text-orange-default font-medium leading-5 text-2xl'>
                        {path === '/register' ? 'sign in' : 'sign up'}
                    </Link>
                </div>
                <div className="w-full h-[1px] bg-black-300"></div>
            </div>
            {children}
        </div>
    )
}

