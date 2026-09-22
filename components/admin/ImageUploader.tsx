"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { UploadCloud, X, RefreshCw, CheckCircle2, Image as ImageIcon, AlertCircle } from "lucide-react";

interface ImageUploaderProps {
  name?: string;
  urlName?: string;
  label?: string;
  initialImageUrl?: string | null;
  helperText?: string;
  aspectRatio?: "video" | "landscape" | "square";
}

const MAX_FILE_SIZE_BYTES = 18 * 1024 * 1024; // 18MB limit

export function ImageUploader({
  name = "image",
  urlName = "image_url",
  label = "Image",
  initialImageUrl,
  helperText,
  aspectRatio = "video",
}: ImageUploaderProps) {
  const [mode, setMode] = useState<"file" | "url">("file");
  const [stagedFile, setStagedFile] = useState<File | null>(null);
  const [stagedPreviewUrl, setStagedPreviewUrl] = useState<string | null>(null);
  const [directUrl, setDirectUrl] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Manage object URL lifecycle
  useEffect(() => {
    if (!stagedFile) {
      setStagedPreviewUrl(null);
      return;
    }
    const objectUrl = URL.createObjectURL(stagedFile);
    setStagedPreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [stagedFile]);

  const processFile = (file: File) => {
    if (file.size > MAX_FILE_SIZE_BYTES) {
      setFileError(
        `Selected file is too large (${(file.size / (1024 * 1024)).toFixed(1)}MB). Please choose an image under 18MB.`
      );
      return false;
    }
    setFileError(null);
    setStagedFile(file);
    setDirectUrl("");
    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const ok = processFile(file);
      if (!ok && fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const ok = processFile(file);
      if (ok && fileInputRef.current) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        fileInputRef.current.files = dataTransfer.files;
      }
    }
  };

  const handleClearStaged = () => {
    setStagedFile(null);
    setStagedPreviewUrl(null);
    setDirectUrl("");
    setFileError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const hasNewImage = Boolean(stagedPreviewUrl || (directUrl.trim() && directUrl !== initialImageUrl));
  const activePreviewUrl = stagedPreviewUrl || (directUrl.trim() ? directUrl : null);

  const aspectRatioClass = {
    video: "aspect-video",
    landscape: "aspect-[16/10]",
    square: "aspect-square",
  }[aspectRatio];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2">
          <ImageIcon className="w-4 h-4 text-brand-orange" />
          {label}
        </label>
        <div className="flex items-center gap-1 bg-gray-100 p-0.5 rounded-lg text-xs font-medium">
          <button
            type="button"
            onClick={() => {
              setMode("file");
              setFileError(null);
            }}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              mode === "file" ? "bg-white text-brand-dark shadow-xs font-semibold" : "text-gray-500 hover:text-gray-900"
            }`}
          >
            File Upload
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("url");
              setFileError(null);
            }}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              mode === "url" ? "bg-white text-brand-dark shadow-xs font-semibold" : "text-gray-500 hover:text-gray-900"
            }`}
          >
            Image URL
          </button>
        </div>
      </div>

      {/* File Size Error Alert */}
      {fileError && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl text-xs flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
          <span className="flex-1">{fileError}</span>
          <button
            type="button"
            onClick={() => setFileError(null)}
            className="text-red-400 hover:text-red-600 p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        id={name}
        name={name}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Hidden or active direct URL input */}
      <input
        type="hidden"
        name={urlName}
        value={directUrl}
      />

      {/* Comparison View when an image is being swapped */}
      {initialImageUrl && hasNewImage ? (
        <div className="bg-orange-50/70 border border-brand-orange/30 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-orange flex items-center gap-1.5">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Swapping Image
            </span>
            <button
              type="button"
              onClick={handleClearStaged}
              className="text-xs text-gray-500 hover:text-red-600 font-medium flex items-center gap-1 bg-white px-2.5 py-1 rounded-md border border-gray-200 transition-colors shadow-xs"
            >
              <X className="w-3.5 h-3.5" /> Cancel Swap
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            {/* Current Image */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-gray-500 font-medium">
                <span>Current Active</span>
                <span className="text-[10px] px-1.5 py-0.5 bg-gray-200 text-gray-600 rounded">Will Be Replaced</span>
              </div>
              <div className={`relative ${aspectRatioClass} w-full rounded-lg overflow-hidden border border-gray-200 bg-gray-100 opacity-75`}>
                <Image src={initialImageUrl} alt="Current active image" fill className="object-cover" />
              </div>
            </div>

            {/* Replacement Staged Image */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold text-brand-green">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> New Image (Staged)
                </span>
                {stagedFile && (
                  <span className="text-[10px] text-gray-400 font-normal">
                    {formatFileSize(stagedFile.size)}
                  </span>
                )}
              </div>
              <div className={`relative ${aspectRatioClass} w-full rounded-lg overflow-hidden border-2 border-brand-orange bg-black shadow-sm`}>
                {activePreviewUrl && (
                  <Image src={activePreviewUrl} alt="New replacement preview" fill className="object-cover" unoptimized />
                )}
              </div>
            </div>
          </div>
          <p className="text-xs text-brand-dark/70 italic text-center pt-1">
            Click &ldquo;Save&rdquo; below to commit this swap.
          </p>
        </div>
      ) : initialImageUrl && !hasNewImage ? (
        /* Current Image Display with Swap Button */
        <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Current Image</span>
            <button
              type="button"
              onClick={() => {
                if (mode === "file") {
                  fileInputRef.current?.click();
                }
              }}
              className="text-xs text-brand-orange hover:text-brand-orange/80 font-semibold flex items-center gap-1 bg-brand-orange/10 px-3 py-1.5 rounded-lg border border-brand-orange/20 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Swap Image
            </button>
          </div>

          <div className={`relative ${aspectRatioClass} w-full max-w-md rounded-lg overflow-hidden border border-gray-200 bg-gray-100`}>
            <Image src={initialImageUrl} alt="Current tour image" fill className="object-cover" />
          </div>

          {mode === "file" ? (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`p-4 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${
                isDragging
                  ? "border-brand-orange bg-brand-orange/5"
                  : "border-gray-200 hover:border-brand-orange/50 hover:bg-gray-50/50"
              }`}
            >
              <UploadCloud className="w-5 h-5 text-gray-400 mx-auto mb-1" />
              <p className="text-xs font-medium text-gray-700">
                Click or drag &amp; drop a new image to replace
              </p>
              <p className="text-[10px] text-gray-400 mt-0.5">JPG, PNG, WebP up to 18MB</p>
            </div>
          ) : (
            <div className="flex gap-2">
              <input
                type="url"
                placeholder="https://example.com/image.jpg"
                value={directUrl}
                onChange={(e) => setDirectUrl(e.target.value)}
                className="flex-1 p-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none bg-gray-50"
              />
            </div>
          )}
        </div>
      ) : hasNewImage ? (
        /* New Image Preview for Create Mode */
        <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-brand-green flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Ready to Upload
            </span>
            <button
              type="button"
              onClick={handleClearStaged}
              className="text-xs text-gray-500 hover:text-red-600 font-medium flex items-center gap-1 bg-gray-50 px-2.5 py-1 rounded-md border border-gray-200 transition-colors"
            >
              <X className="w-3.5 h-3.5" /> Remove
            </button>
          </div>

          <div className={`relative ${aspectRatioClass} w-full max-w-md rounded-lg overflow-hidden border border-brand-orange/40 bg-black`}>
            {activePreviewUrl && (
              <Image src={activePreviewUrl} alt="Selected preview" fill className="object-cover" unoptimized />
            )}
          </div>
          {stagedFile && (
            <div className="flex items-center justify-between text-xs text-gray-500 pt-1 border-t border-gray-100">
              <span className="truncate max-w-xs">{stagedFile.name}</span>
              <span>{formatFileSize(stagedFile.size)}</span>
            </div>
          )}
        </div>
      ) : (
        /* Empty Upload State */
        <div className="space-y-3">
          {mode === "file" ? (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`p-8 border-2 border-dashed rounded-xl text-center cursor-pointer transition-all ${
                isDragging
                  ? "border-brand-orange bg-brand-orange/5 scale-[1.01]"
                  : "border-gray-200 hover:border-brand-orange/50 hover:bg-gray-50/60 bg-white"
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-brand-orange/10 text-brand-orange flex items-center justify-center mx-auto mb-3">
                <UploadCloud className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-brand-dark mb-1">
                Choose an image file or drag &amp; drop here
              </p>
              <p className="text-xs text-gray-400">PNG, JPG, WebP or GIF up to 18MB</p>
              <button
                type="button"
                className="mt-4 px-4 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-lg transition-colors inline-block"
              >
                Browse Files
              </button>
            </div>
          ) : (
            <div className="bg-white p-4 border border-gray-200 rounded-xl space-y-2">
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="https://example.com/photos/belize-tour.jpg"
                  value={directUrl}
                  onChange={(e) => setDirectUrl(e.target.value)}
                  className="flex-1 p-3 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none bg-gray-50"
                />
              </div>
              <p className="text-[11px] text-gray-400">Enter a direct URL to an image hosted online.</p>
            </div>
          )}
        </div>
      )}

      {helperText && <p className="text-[11px] text-gray-400 italic">{helperText}</p>}
    </div>
  );
}
