// components/ComingSoon.tsx
import { Hammer } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ComingSoon({ feature = "This page" }: { feature?: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-background text-foreground px-4">
      <Hammer className="w-16 h-16 text-yellow-500 mb-4 animate-pulse" />
      <h1 className="text-3xl font-bold mb-2">Coming Soon</h1>
      <p className="text-muted-foreground text-lg max-w-xl mb-6">
        {feature} is currently under construction. We’re working hard to launch it soon!
      </p>
      <Link href="/admin/dashboard" className="text-blue-500 hover:underline mb-4">
        <Button variant="default">Go Back Home</Button>
      </Link>
    </div>
  );
}
