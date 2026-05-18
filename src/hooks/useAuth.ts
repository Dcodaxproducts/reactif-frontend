"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ApiError } from "@/services/api-client";
import { authService } from "@/services/auth";
import type { AuthUser } from "@/types/auth";

export type User = AuthUser;

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const validateSession = async () => {
      const token = localStorage.getItem("sessionToken");
      const storedUser = localStorage.getItem("current_user");

      if (!token || !storedUser) {
        setLoading(false);
        return;
      }

      try {
        const parsedUser: User = JSON.parse(storedUser);

        await authService.validateSession(token);

        if (!parsedUser.isVerified) {
          router.push("/register/enter-otp");
          setLoading(false);
          return;
        }

        setUser(parsedUser);
      } catch (error) {
        if (error instanceof ApiError && error.status === 401) {
          localStorage.removeItem("sessionToken");
          localStorage.removeItem("current_user");
          setUser(null);
          router.push("/login");
        } else {
          console.error("Auth validation error:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    validateSession();
  }, [router]);

  const logout = () => {
    localStorage.removeItem("sessionToken");
    localStorage.removeItem("current_user");
    setUser(null);
    toast.success("Logged out successfully");
    router.push("/login");
  };

  return { user, loading, logout };
};
