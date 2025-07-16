import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-4">
      <AlertTriangle className="text-red-500 w-12 h-12" />
      <h1 className="text-2xl font-semibold">Access Denied</h1>
      <p className="text-muted-foreground">
        You do not have permission to view this page. This section is only accessible to admins.
      </p>
      <Link href="/student/dashboard">
        <Button variant="outline">Go to Student Dashboard</Button>
      </Link>
    </div>
  );
}
