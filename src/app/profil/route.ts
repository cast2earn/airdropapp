import { NextResponse } from 'next/server';
import { getNeynarClient } from '~/lib/neynar';

export async function GET() {
  const client = getNeynarClient();
  // Contoh FID statis untuk testing, ganti dengan autentikasi asli
  const fid = 123; // Anda perlu cara untuk mendapatkan FID pengguna
  const castsResponse = await client.fetchCastsForUser({ fid });
  const casts = castsResponse.casts.length;

  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="fc:frame" content="vNext" />
        <meta name="fc:frame:button:1" content="View Airdrop" />
        <meta name="fc:frame:button:1:action" content="post" />
        <meta name="fc:frame:button:1:target" content="https://airdropapp-iota.vercel.app/airdrop" />
        <title>Your Profile</title>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; padding: 20px; }
          h1 { font-size: 24px; }
          p { font-size: 16px; }
        </style>
      </head>
      <body>
        <h1>Your Profile</h1>
        <p>Casts: ${casts}</p>
        <p>Points: ${casts * 1}</p>
        <script>
          window.parent.postMessage({ type: 'frame:ready' }, '*');
        </script>
      </body>
    </html>
  `;

  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html',
    },
  });
}