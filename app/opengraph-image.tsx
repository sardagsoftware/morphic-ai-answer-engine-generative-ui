import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          background: '#fff',
        }}
      >
        <img src="https://www.aitbondie.ai/aitbondie-favicon.png" width={128} height={128} alt="AitBondie" />
        <h1 style={{ fontSize: 48, color: '#222', marginTop: 32 }}>AitBondie</h1>
        <p style={{ fontSize: 24, color: '#555', marginTop: 16 }}>IQ Sahibi Lideriniz.Olarak</p>
      </div>
    ),
    {
      width: 1200,
      height: 627,
    }
  );
}
