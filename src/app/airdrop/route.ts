import { NextResponse } from 'next/server';

export async function POST() {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="fc:frame" content="vNext" />
        <title>Airdrop</title>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; padding: 20px; }
          h1 { font-size: 24px; }
          p { font-size: 16px; }
        </style>
      </head>
      <body>
        <h1>Airdrop</h1>
        <p>Total Tokens: 100 (placeholder)</p>
        <script>
          import { sdk } from '@farcaster/frame-sdk'
          await sdk.actions.ready();
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