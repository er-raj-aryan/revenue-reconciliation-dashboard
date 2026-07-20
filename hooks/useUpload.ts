"use client";

import { useState } from "react";

export default function useUpload(
  endpoint: string
) {
  const [file, setFile] =
    useState<File | null>(null);

  const [loading, setLoading] =
    useState(false);

  async function upload() {
    if (!file) return;

    setLoading(true);

    const form = new FormData();

    form.append("file", file);

    const res = await fetch(endpoint, {
      method: "POST",
      body: form,
    });

    setLoading(false);

    if (!res.ok) {
      alert("Upload failed");
      return;
    }

    alert("Upload successful");
  }

  return {
    file,
    setFile,
    loading,
    upload,
  };
}