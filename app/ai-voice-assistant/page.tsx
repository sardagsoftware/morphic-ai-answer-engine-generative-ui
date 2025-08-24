import React, { useState } from "react";

export default function AiVoiceAssistantPage() {
  const [result, setResult] = useState("");
  const [listening, setListening] = useState(false);

  const handleStart = () => {
    setListening(true);
    setResult("Demo: Sesli komut dinleniyor...");
    // Gerçek AI entegrasyonu için Web Speech API veya başka bir API eklenebilir
  };

  const handleStop = () => {
    setListening(false);
    setResult("Demo: Dinleme durduruldu.");
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <h1 className="text-2xl font-bold mb-4">Sesli Komut Asistanı</h1>
      <div className="flex gap-4 mb-4">
        <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={handleStart} disabled={listening}>Dinlemeye Başla</button>
        <button className="bg-red-600 text-white px-4 py-2 rounded" onClick={handleStop} disabled={!listening}>Durdur</button>
      </div>
      {result && (
        <div className="mt-6 p-4 bg-gray-100 rounded w-full max-w-xl">
          <strong>Durum:</strong>
          <div>{result}</div>
        </div>
      )}
    </div>
  );
}
