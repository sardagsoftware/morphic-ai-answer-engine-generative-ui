import React, { useState } from "react";

export default function AiSummarizerPage() {
  const [input, setInput] = useState("");
  const [summary, setSummary] = useState("");

  const handleSummarize = async () => {
    // Demo: Sadece metni kısaltıyor, gerçek AI entegrasyonu için API eklenebilir
    setSummary(input.length > 100 ? input.slice(0, 100) + "..." : input);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <h1 className="text-2xl font-bold mb-4">Metin Özetleyici</h1>
      <textarea
        className="border rounded p-2 w-full max-w-xl mb-4"
        rows={6}
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Özetlemek istediğiniz metni girin..."
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleSummarize}>Özetle</button>
      {summary && (
        <div className="mt-6 p-4 bg-gray-100 rounded w-full max-w-xl">
          <strong>Özet:</strong>
          <div>{summary}</div>
        </div>
      )}
    </div>
  );
}
