import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Form from "@/components/form";
import { Card, CardContent } from "@/components/ui/card";

export default function StudentDashboard() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-black">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-6">
        <Form/>
      </main>

      <Footer />
    </div>
  );
}
