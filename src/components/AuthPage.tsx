"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  TabsContents,
} from "@/components/ui/shadcn-io/tabs";
import { Label } from "@/components/ui/label";
import { Eye } from "@/icons/Eye";
import { EyeClose } from "@/icons/EyeClose";
import axios from "axios";

interface ApiError {
  response?: {
    data?: {
      errorMsg?: string;
      msg?: string;
    };
  };
}

export default function AuthPage() {
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [showSignInPassword, setShowSignInPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // Form states
  const [signUpData, setSignUpData] = useState({
    username: "",
    password: "",
  });
  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/signup`,
        {
          username: signUpData.username,
          password: signUpData.password,
        }
      );

      if (response.status === 200) {
        // Automatically sign in after successful signup
        await handleSignInAfterSignUp();
      }
    } catch (error: unknown) {
      console.error("Signup error:", error);
      const apiError = error as ApiError;
      const errorMessage =
        apiError.response?.data?.errorMsg ||
        apiError.response?.data?.msg ||
        "Signup failed. Please try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignInAfterSignUp = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/signin`,
        {
          username: signUpData.username,
          password: signUpData.password,
        }
      );

      if (response.status === 200 && response.data.token) {
        localStorage.setItem("token", response.data.token);
        router.push("/dashboard");
      }
    } catch (error: unknown) {
      console.error("Auto signin error:", error);
      setError("Account created! Please sign in manually.");
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/signin`,
        {
          username: signInData.username,
          password: signInData.password,
        }
      );

      if (response.status === 200 && response.data.token) {
        localStorage.setItem("token", response.data.token);
        router.push("/dashboard");
      }
    } catch (error: unknown) {
      console.error("Signin error:", error);
      const apiError = error as ApiError;
      const errorMessage =
        apiError.response?.data?.errorMsg ||
        apiError.response?.data?.msg ||
        "Sign in failed. Please check your credentials.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Logo */}
      <div className="flex flex-col items-center space-y-2">
        <Image
          src="/mindly.svg"
          alt="Mindly Logo"
          width={96}
          height={96}
          className="h-24 w-auto"
        />
        <h1 className="text-2xl font-bold text-foreground">Mindly</h1>
        <p className="text-sm text-muted-foreground text-center">
          Organize and share your content seamlessly
        </p>
      </div>

      <Tabs defaultValue="signin" className="w-[400px] bg-muted rounded-lg">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signin">Sign In </TabsTrigger>
          <TabsTrigger value="signup">Sign Up </TabsTrigger>
        </TabsList>

        <TabsContents className="mx-1 mb-1 -mt-2 rounded-sm h-full bg-background">
          <TabsContent value="signin" className="space-y-6 p-6">
            <p className="text-sm text-muted-foreground">
              Sign in to your account.
            </p>

            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md border border-red-200">
                {error}
              </div>
            )}

            <form className="space-y-3" onSubmit={handleSignIn}>
              <div className="space-y-1">
                <Label htmlFor="signin-username">Username</Label>
                <Input
                  id="signin-username"
                  value={signInData.username}
                  onChange={(e) =>
                    setSignInData((prev) => ({
                      ...prev,
                      username: e.target.value,
                    }))
                  }
                  required
                  disabled={isLoading}
                  minLength={3}
                  maxLength={25}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="signin-password">Password</Label>
                <div className="relative">
                  <Input
                    id="signin-password"
                    type={showSignInPassword ? "text" : "password"}
                    value={signInData.password}
                    onChange={(e) =>
                      setSignInData((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                    className="pr-10"
                    required
                    disabled={isLoading}
                    minLength={3}
                    maxLength={35}
                  />
                  <button
                    type="button"
                    onClick={() => setShowSignInPassword(!showSignInPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                    disabled={isLoading}
                  >
                    {showSignInPassword ? <EyeClose /> : <Eye />}
                  </button>
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup" className="space-y-6 p-6">
            <p className="text-sm text-muted-foreground">
              Create your new account with Username and Password.
            </p>

            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md border border-red-200">
                {error}
              </div>
            )}

            <form className="space-y-3" onSubmit={handleSignUp}>
              <div className="space-y-1">
                <Label htmlFor="signup-username">Username</Label>
                <Input
                  id="signup-username"
                  value={signUpData.username}
                  onChange={(e) =>
                    setSignUpData((prev) => ({
                      ...prev,
                      username: e.target.value,
                    }))
                  }
                  required
                  disabled={isLoading}
                  minLength={3}
                  maxLength={25}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="signup-password">Password</Label>
                <div className="relative">
                  <Input
                    id="signup-password"
                    type={showSignUpPassword ? "text" : "password"}
                    value={signUpData.password}
                    onChange={(e) =>
                      setSignUpData((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                    className="pr-10"
                    required
                    disabled={isLoading}
                    minLength={3}
                    maxLength={35}
                  />
                  <button
                    type="button"
                    onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                    disabled={isLoading}
                  >
                    {showSignUpPassword ? <EyeClose /> : <Eye />}
                  </button>
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating Account..." : "Sign Up"}
              </Button>
            </form>
          </TabsContent>
        </TabsContents>
      </Tabs>
    </div>
  );
}
