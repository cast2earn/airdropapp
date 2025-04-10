'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { config } from '~/lib/wagmi';
import { AuthKitProvider } from '@farcaster/auth-kit';
import './globals.css';

const queryClient = new QueryClient();
const farcasterConfig = {
  domain: 'localhost', // Ganti dengan domainmu saat deploy
  siweUri: 'http://localhost:3000/login', // Ganti saat deploy
  rpcUrl: 'https://mainnet.optimism.io', // RPC URL untuk Optimism
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