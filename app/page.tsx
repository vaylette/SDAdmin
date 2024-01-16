'use client'
import AuthWrapper from "./_components/auth/wrapper"
import { usePathname } from "next/navigation"

export default function Login() {
  const pathname = usePathname()

  return (
    <>
      <AuthWrapper path={pathname ?? pathname}></AuthWrapper>
    </>
  )
}
