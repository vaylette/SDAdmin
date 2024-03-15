import { useRouter } from "next/navigation"
import useAuthStore, { AuthStore } from "../store/useAuthStore"
import { useCookies } from "next-client-cookies"

const Logout = () => {
  const authStore = useAuthStore((state) => state) as AuthStore
  const router = useRouter()
  const cookies = useCookies();

  const logout = () => {
    authStore.logout();
    cookies.remove('token')
    // localStorage.removeItem("token");
    router.push("/");
  }

  return logout
}

export default Logout