import { useRouter } from "next/navigation"
import useAuthStore, { AuthStore } from "../store/useAuthStore"

const Logout = () => {
  const authStore = useAuthStore((state) => state) as AuthStore
  const router = useRouter()

  const logout = () => {
    authStore.logout();
    localStorage.removeItem("token");
    router.push("/");
  }

  return logout
}

export default Logout