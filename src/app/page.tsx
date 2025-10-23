"use client";

import TabsDemo from "@/components/TabsDemo";
import { ModeToggle } from "@/components/ui/ModeToggle";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="absolute top-0 right-0 p-4">
        <ModeToggle />
      </div>
      <TabsDemo />
    </div>
  );
}
