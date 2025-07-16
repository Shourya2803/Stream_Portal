'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function SeatAllotmentForm({ studentId }: { studentId: string }) {
  const [selectedBranch, setSelectedBranch] = useState("");
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleAllotment = async () => {
    const res = await fetch(`/api/students/${studentId}`, {
      method: "PATCH",
      body: JSON.stringify({
        seatAllotted: selectedBranch,
        notification: `You have been allotted ${selectedBranch}`,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      setStatusMessage({
        type: "success",
        text: `✅ Seat allotted: ${selectedBranch}`,
      });
    } else {
      setStatusMessage({
        type: "error",
        text: "❌ Failed to allot seat.",
      });
    }
  };

  return (
    <div className="mt-6 flex flex-col sm:flex-row gap-4 items-center">
      <Select onValueChange={setSelectedBranch}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select Branch" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="CSE">CSE</SelectItem>
          <SelectItem value="ECE">ECE</SelectItem>
        </SelectContent>
      </Select>

      <Button onClick={handleAllotment} disabled={!selectedBranch}>
        Allot Seat
      </Button>

      {/* Status Message */}
      {statusMessage && (
        <p
          className={`mt-2 text-sm ${
            statusMessage.type === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {statusMessage.text}
        </p>
      )}
    </div>
  );
}
