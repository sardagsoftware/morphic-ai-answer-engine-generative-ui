"use client";
import InfoTicker from '@/components/info-ticker';
import MatrixCode from '@/components/matrix-code';
import { Chat } from '@/components/chat';

export default function HomeClient({ id, models }: { id: string, models: any }) {
  return (
    <>
      <div className="w-full max-w-4xl mx-auto mt-2">
        <InfoTicker />
      </div>
      <MatrixCode color="#fff" bg="#222" height={80} />
      <Chat id={id} models={models} />
    </>
  );
}
