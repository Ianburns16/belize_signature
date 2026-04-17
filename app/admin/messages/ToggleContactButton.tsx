"use client";

import { toggleContactStatus } from "@/app/actions/contact";
import { useState } from "react";
import { CheckCircle2, Circle } from "lucide-react";
import { useRouter } from "next/navigation";

export function ToggleContactButton({ id, initialStatus }: { id: number, initialStatus: boolean }) {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleToggle = async () => {
    setIsPending(true);
    await toggleContactStatus(id, initialStatus);
    setIsPending(false);
    router.refresh(); // Refresh the page to get updated data
  };

  return (
    <button 
      onClick={handleToggle}
      disabled={isPending}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
        initialStatus 
          ? "bg-green-100 text-green-700 hover:bg-green-200" 
          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
      }`}
    >
      {initialStatus ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
      {initialStatus ? "Contacted" : "Mark Contacted"}
    </button>
  );
}
