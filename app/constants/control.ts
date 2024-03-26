import { useState, useEffect } from "react";
import useAuthStore, { AuthStore } from "../store/useAuthStore";
import { useRouter } from "next/navigation";


export default class AccessControl {
  user: any;

  constructor(user: any) {
    this.user = user;
  }

  isSuperAdmin() {
    return this.user?.type.toLowerCase() === 'superadmin' || this.user?.type.toLowerCase() === 'admin';
  }

  isContentAdmin() {
    return this.user?.type.toLowerCase() === 'contentadmin';
  }

  isContentModerator() {
    return this.user?.type.toLowerCase() === 'contentmoderator';
  }

  isCustomerCare() {
    return this.user?.type.toLowerCase() === 'customercare';
  }
}

export const useAccessControl = () => {
  const authStore = useAuthStore((state) => state) as AuthStore; // Assuming useAuthStore returns the authentication state
  const { user } = authStore;
  const [accessControl, setAccessControl] = useState<AccessControl | null>(null);

  useEffect(() => {
    if (user) {
      const newAccessControl = new AccessControl(user);
      setAccessControl(newAccessControl);
    } else {
      setAccessControl(null);
    }
  }, [user]);

  return accessControl;
};

export const useAccessControlRedirect = () => {
  const accessControl = useAccessControl()
  const router = useRouter();

  useEffect(() => {
    if (accessControl?.isContentAdmin()) {
      router.push('/dashboard/user-management');
    } else if (accessControl?.isContentModerator()) {
      router.push('/dashboard/content-management');
    } else if (accessControl?.isCustomerCare()) {
      router.push('/dashboard/tickets');
    }
  }, [accessControl, router]);
};