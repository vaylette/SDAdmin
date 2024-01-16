'use client'
import AuthWrapper from "../_components/auth/wrapper"
import { usePathname } from "next/navigation"

export default function Register() {
    const pathname = usePathname()
    return (
        <>
            <AuthWrapper path={pathname ?? pathname}>
                <div className="mt-[97px] flex justify-center">
                    <div className='w-auto h-auto rounded-[20px]'>
                        <div className='flex flex-row'>
                            <div>

                            </div>
                        </div>
                    </div>
                </div>
            </AuthWrapper>
        </>
    )
}