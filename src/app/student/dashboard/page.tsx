'use client';

import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Form from '@/components/form';

export default function StudentDashboard() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-black">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-6">
        <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
          <Form />
        </div>
      </main>

      <Footer />
    </div>
  );
}
