"use client";

import { deleteTour } from "@/app/actions/tours";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { DeleteConfirmModal } from "@/components/admin/DeleteConfirmModal";

export function DeleteTourButton({ id, tourTitle }: { id: string; tourTitle?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleConfirmDelete = async () => {
    setIsPending(true);
    setError(null);
    try {
      const result = await deleteTour(id);
      if (result?.error) {
        setError(result.error);
        setIsPending(false);
      } else {
        setIsOpen(false);
        setIsPending(false);
        router.refresh();
      }
    } catch (err: any) {
      setError(err.message || "Failed to delete tour");
      setIsPending(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 border border-red-200/60"
        title="Delete Tour"
      >
        <Trash2 className="w-3.5 h-3.5" /> Delete
      </button>

      <DeleteConfirmModal
        isOpen={isOpen}
        title="Delete Tour"
        description={
          tourTitle
            ? `Are you sure you want to permanently delete "${tourTitle}"? All associated tour images will also be removed. This action cannot be undone.`
            : "Are you sure you want to permanently delete this tour? All associated tour images will also be removed. This action cannot be undone."
        }
        isPending={isPending}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          if (!isPending) setIsOpen(false);
        }}
      />
    </>
  );
}
