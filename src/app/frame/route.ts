import { NextResponse } from 'next/server';

export async function GET() {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="fc:frame" content="vNext" />
        <title>Airdrop App Frame</title>
      </head>
      <body>
        <h1>Welcome to Airdrop App</h1>
        <p>Please sign in with Farcaster to continue.</p>
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