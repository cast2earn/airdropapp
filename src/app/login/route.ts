import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const redirectUrl = url.searchParams.get('redirect') || 'https://airdropapp-iota.vercel.app/profile';
  return NextResponse.redirect(redirectUrl);
}