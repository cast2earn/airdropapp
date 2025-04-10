import { NextResponse } from 'next/server';

export async function GET() {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="fc:frame" content="vNext" />
        <meta name="fc:frame:button:1" content="Sign In" />
        <meta name="fc:frame:button:1:action" content="post_redirect" />
        <meta name="fc:frame:button:1:target" content="https://airdropapp-iota.vercel.app/login" />
        <meta name="og:title" content="Airdrop App" />
        <meta name="og:description" content="Sign in to view your airdrop points" />
        <meta name="og:image" content="https://airdropapp-iota.vercel.app/opengraph-image" />
        <title>Airdrop App</title>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; padding: 20px; }
          h1 { font-size: 24px; }
          p { font-size: 16px; }
        </style>
      </head>
      <body>
        <h1>Airdrop App</h1>
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