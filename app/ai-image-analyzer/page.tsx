"use client";
import React, { useState } from "react";

export default function AiImageAnalyzerPage() {
  const [result, setResult] = useState("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // Demo: Sadece dosya adını gösteriyor, gerçek AI entegrasyonu için API eklenebilir
      setResult(`Yüklenen dosya: ${e.target.files[0].name}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <h1 className="text-2xl font-bold mb-4">Görselden İçerik Analizi</h1>
      <input type="file" accept="image/*" onChange={handleImageUpload} className="mb-4" />
      {result && (
        <div className="mt-6 p-4 bg-gray-100 rounded w-full max-w-xl">
          <strong>Analiz Sonucu:</strong>
          <div>{result}</div>
        </div>
      )}
    </div>
  );
}
