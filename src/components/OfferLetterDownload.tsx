'use client';

import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useState } from 'react';

export default function OfferLetterDownload({
  studentId,
  offerLetterUrl,
}: {
  studentId: string;
  offerLetterUrl?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState(offerLetterUrl || '');

  const handleGenerate = async () => {
    setLoading(true);
    const toastId = toast.loading('Generating offer letter...');
    try {
      const res = await fetch('/api/upload-offer-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Offer letter ready 🎉', { id: toastId });
        setUrl(data.offerLetterUrl);
      } else {
        toast.error(data.error || 'Failed to generate offer letter', { id: toastId });
      }
    } catch (err) {
      toast.error('Something went wrong!', { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 p-4 rounded-xl border shadow-lg bg-white dark:bg-zinc-900 transition">
      {url ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-green-600 hover:underline"
        >
          📄 Download Offer Letter
        </a>
      ) : (
        <Button onClick={handleGenerate} disabled={loading} className="bg-green-600 text-white">
          {loading ? 'Generating...' : 'Generate Offer Letter'}
        </Button>
      )}
    </div>
  );
}
