"use client";
import React, { useState } from "react";

export default function AiSentimentPage() {
  const [input, setInput] = useState("");
  const [sentiment, setSentiment] = useState("");

  const handleAnalyze = () => {
    // Demo: Basit anahtar kelime ile duygu analizi, gerçek AI için API eklenebilir
    if (input.includes("mutlu") || input.includes("iyi")) {
      setSentiment("Pozitif");
    } else if (input.includes("kötü") || input.includes("üzgün")) {
      setSentiment("Negatif");
    } else {
      setSentiment("Nötr veya Belirsiz");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <h1 className="text-2xl font-bold mb-4">Duygu Analizi</h1>
      <textarea
        className="border rounded p-2 w-full max-w-xl mb-4"
        rows={4}
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Duygu analizi yapmak için metni girin..."
      />
      <button className="bg-purple-600 text-white px-4 py-2 rounded" onClick={handleAnalyze}>Analiz Et</button>
      {sentiment && (
        <div className="mt-6 p-4 bg-gray-100 rounded w-full max-w-xl">
          <strong>Analiz Sonucu:</strong>
          <div>{sentiment}</div>
        </div>
      )}
    </div>
  );
}
