"use client";

import { useState } from "react";
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

export default function AuthPage() {
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [showSignInPassword, setShowSignInPassword] = useState(false);
  return (
    <Tabs defaultValue="signup" className="w-[400px] bg-muted rounded-lg">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="signup">Sign Up </TabsTrigger>
        <TabsTrigger value="signin">Sign In </TabsTrigger>
      </TabsList>

      <TabsContents className="mx-1 mb-1 -mt-2 rounded-sm h-full bg-background">
        <TabsContent value="signup" className="space-y-6 p-6">
          <p className="text-sm text-muted-foreground">
            Create your new account with Username and Password.
          </p>

          <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-1">
              <Label htmlFor="signup-username">Username</Label>
              <Input id="signup-username" defaultValue="" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="signup-password">Password</Label>
              <div className="relative">
                <Input
                  id="signup-password"
                  type={showSignUpPassword ? "text" : "password"}
                  defaultValue=""
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none  "
                >
                  {showSignUpPassword ? <EyeClose /> : <Eye />}
                </button>
              </div>
            </div>
          </form>

          <Button>Sign Up</Button>
        </TabsContent>
        <TabsContent value="signin" className="space-y-6 p-6">
          <p className="text-sm text-muted-foreground">
            Sign in to your account.
          </p>

          <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-1">
              <Label htmlFor="signin-username">Username</Label>
              <Input id="signin-username" defaultValue="" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="signin-password">Password</Label>
              <div className="relative">
                <Input
                  id="signin-password"
                  type={showSignInPassword ? "text" : "password"}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowSignInPassword(!showSignInPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  {showSignInPassword ? <EyeClose /> : <Eye />}
                </button>
              </div>
            </div>
          </form>
          <Button type="submit">Sign In</Button>
        </TabsContent>
      </TabsContents>
    </Tabs>
  );
}
