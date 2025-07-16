'use client';

import React, { useEffect, useState } from 'react';
import UploadReceipt from '@/components/UploadReceipt';
import { Upload } from 'lucide-react';
import Navbar from '@/components/navbar';
import { toast } from 'sonner'; // or your preferred toast lib
import { cn } from '@/lib/utils'; // assuming you're using cn helper

const PaymentPage = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await fetch('/api/students/me');
        if (res.ok) {
          const data = await res.json();
          setStudent(data);

          // Show welcome toast
          toast.success('Student details loaded successfully!');
        } else {
          toast.error('Unauthorized or student not found.');
        }
      } catch (err) {
        console.error('Failed to fetch student:', err);
        toast.error('Something went wrong while fetching data.');
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, []);

  if (loading)
    return (
      <p className="p-4 text-muted-foreground text-center animate-pulse">
        Loading student data...
      </p>
    );

  if (!student)
    return (
      <p className="p-4 text-red-500 text-center">
        Student not found or unauthorized.
      </p>
    );

  return (
    <>
      <Navbar />
      <div
        className={cn(
          'min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br',
          'from-pink-100/50 via-purple-200/60 to-purple-300/30',
          'dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-700'
        )}
      >
        <div className="bg-white/80 dark:bg-zinc-900/70 backdrop-blur-lg shadow-2xl rounded-2xl p-8 w-full max-w-xl transition-all duration-300">
          <div className="flex items-center gap-3 mb-6">
            <Upload className="text-pink-600 dark:text-pink-400 animate-bounce" />
            <h2 className="text-2xl font-bold text-pink-700 dark:text-pink-400 tracking-tight">
              Upload Your Payment Receipt
            </h2>
          </div>

          <p className="text-muted-foreground text-sm mb-4">
            Please upload your payment receipt after confirming your seat.
          </p>

          {/* Upload Component */}
          <UploadReceipt student={student} />

          {/* Footer / Info */}
          <div className="mt-6 text-xs text-muted-foreground text-center">
            Having issues? Contact admin or refresh the page.
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
