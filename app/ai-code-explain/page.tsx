"use client";
import React, { useState } from "react";

export default function AiCodeExplainPage() {
  const [code, setCode] = useState("");
  const [explanation, setExplanation] = useState("");

  const handleExplain = () => {
    // Demo: Kodun ilk satırını açıklama olarak gösteriyor, gerçek AI için API eklenebilir
    if (code.trim()) {
      setExplanation(`Kodun ilk satırı: ${code.split("\n")[0]}`);
    } else {
      setExplanation("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <h1 className="text-2xl font-bold mb-4">Kod Açıklama Modülü</h1>
      <textarea
        className="border rounded p-2 w-full max-w-xl mb-4 font-mono"
        rows={8}
        value={code}
        onChange={e => setCode(e.target.value)}
        placeholder="Açıklamasını almak istediğiniz kodu girin..."
      />
      <button className="bg-orange-600 text-white px-4 py-2 rounded" onClick={handleExplain}>Açıkla</button>
      {explanation && (
        <div className="mt-6 p-4 bg-gray-100 rounded w-full max-w-xl">
          <strong>Açıklama:</strong>
          <div>{explanation}</div>
        </div>
      )}
    </div>
  );
}
