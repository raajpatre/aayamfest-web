"use client";

import { useRef, useState } from "react";
import { inputStyles } from "@/components/admin/FormField";

export function AssetUploader({
  label,
  value,
  onChange,
  folder
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  folder: string;
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement | null>(null);

  async function handleUpload(file: File) {
    setIsUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Upload failed");
      }

      onChange(result.data.url);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Upload failed");
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div className="space-y-4">
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Paste image URL or upload file"
        className={inputStyles()}
      />
      <div className="flex flex-wrap items-center gap-3">
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) {
              handleUpload(file);
            }
          }}
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="command-btn bg-pinkGlow px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#510051]"
        >
          {isUploading ? "Uploading..." : `Upload ${label}`}
        </button>
        {value ? (
          <a
            href={value}
            target="_blank"
            rel="noreferrer"
            className="system-label text-[10px] text-cyanGlow hover:text-white"
          >
            Preview asset
          </a>
        ) : null}
      </div>
      {error ? <p className="text-sm text-rose-400">{error}</p> : null}
    </div>
  );
}
