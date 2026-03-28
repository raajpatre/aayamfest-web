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
    <div className="space-y-3">
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Paste an image URL or upload below"
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
          className="rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          {isUploading ? "Uploading..." : `Upload ${label}`}
        </button>
        {value ? (
          <a href={value} target="_blank" rel="noreferrer" className="text-sm text-sky-700 hover:underline">
            Preview asset
          </a>
        ) : null}
      </div>
      {error ? <p className="text-sm text-rose-600">{error}</p> : null}
    </div>
  );
}
