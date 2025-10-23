"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthPage from "../components/AuthPage";
import { ModeToggle } from "@/components/ui/ModeToggle";
import { MainPage } from "@/components/MainPage";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem("token");
      const loggedIn = Boolean(token);

      // If user is logged in, redirect to dashboard
      if (loggedIn) {
        router.push("/dashboard");
        return;
      }

      setIsLoggedIn(loggedIn);
    };

    // Check auth status on mount
    checkAuthStatus();

    // Keep isLoggedIn in sync if token changes in another tab/window
    const onStorage = (e: StorageEvent) => {
      if (e.key === "token") {
        const newLoggedInState = Boolean(e.newValue);
        if (newLoggedInState) {
          router.push("/dashboard");
        } else {
          setIsLoggedIn(newLoggedInState);
        }
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="absolute z-10 bottom-0 right-0 p-4">
        <ModeToggle />
      </div>
      {isLoggedIn ? <MainPage /> : <AuthPage />}
    </div>
  );
}
