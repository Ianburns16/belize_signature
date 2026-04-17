"use client";

import { deleteBlog } from "@/app/actions/blogs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

export function DeleteBlogButton({ id }: { id: string }) {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this blog post? This cannot be undone.")) return;
    setIsPending(true);
    const result = await deleteBlog(id);
    if (result?.error) {
      alert(result.error);
    }
    setIsPending(false);
    router.refresh();
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="px-3 py-1.5 bg-red-100 text-red-600 text-sm rounded-lg hover:bg-red-200 transition-colors flex items-center gap-1 disabled:opacity-50"
    >
      <Trash2 className="w-3.5 h-3.5" /> {isPending ? "Deleting..." : "Delete"}
    </button>
  );
}
