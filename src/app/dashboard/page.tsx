"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MainPage } from "@/components/MainPage";
import { ModeToggle } from "@/components/ui/ModeToggle";

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/");
        return;
      }
      setIsAuthenticated(true);
      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div>Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // This will prevent flash of content before redirect
  }

  return (
    <div className="h-screen">
      <div className="absolute z-10  bottom-0 right-0 p-4">
        <ModeToggle />
      </div>
      <MainPage />
    </div>
  );
}
