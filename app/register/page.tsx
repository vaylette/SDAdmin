'use client'
import AuthWrapper from "../_components/auth/wrapper"
import { usePathname } from "next/navigation"
import bulb from '../../public/images/bulb.png'
import Image from "next/image"

export default function Register() {
    const pathname = usePathname()
    return (
        <>
            <AuthWrapper path={pathname ?? pathname}></AuthWrapper>
        </>
    )
}