'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Sparkles } from 'lucide-react';

export default function OfferLetterUpload({ studentId }: { studentId: string }) {
  const [loading, setLoading] = useState(false);

  const handleOfferLetterUpload = async () => {
    const toastId = toast.loading('Uploading Offer Letter...');
    setLoading(true);

    try {
      const res = await fetch('/api/upload-offer-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');

      toast.success('🎓 Offer Letter sent successfully!', { id: toastId });
    } catch (err: any) {
      toast.error('❌ Failed to upload offer letter: ' + err.message, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6">
      <Button
        onClick={handleOfferLetterUpload}
        disabled={loading}
        className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-semibold px-6 py-2 rounded-xl shadow-lg transition-transform hover:scale-105 flex gap-2 items-center"
      >
        <Sparkles className="w-5 h-5 animate-pulse" />
        {loading ? 'Uploading...' : 'Send Offer Letter'}
      </Button>
    </div>
  );
}
