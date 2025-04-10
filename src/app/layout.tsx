'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { config } from '~/lib/wagmi';
import { AuthKitProvider } from '@farcaster/auth-kit';
import '@farcaster/auth-kit/styles.css';
import './globals.css';

const queryClient = new QueryClient();
const farcasterConfig = {
  domain: 'airdropapp-iota.vercel.app', // Diperbarui ke domain Vercel Anda
  siweUri: 'https://airdropapp-iota.vercel.app/login', // Diperbarui ke URL login Vercel Anda
  rpcUrl: 'https://mainnet.optimism.io',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <AuthKitProvider config={farcasterConfig}>
              {children}
            </AuthKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}