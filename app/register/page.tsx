'use client'
import AuthWrapper from "../_components/auth/wrapper"
import { usePathname } from "next/navigation"
import bulb from '../../public/images/bulb.png'
import Image from "next/image"

export default function Register() {
    const pathname = usePathname()
    return (
        <>
            <AuthWrapper path={pathname ?? pathname}>
                <div className="my-[97px] flex justify-center">
                    <div className='w-auto h-auto rounded-[20px] drop-shadow-auth'>
                        <div className='flex flex-row'>
                            <div>
                                <Image className='w-[350px] h-[547px]'  src={bulb} alt='SmartDarasa' />
                            </div>
                        </div>
                    </div>
                </div>
            </AuthWrapper>
        </>
    )
}