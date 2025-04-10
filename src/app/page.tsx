'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getNeynarClient } from '@/lib/neynar';
import AirdropTab from '@/components/AirdropTab';
import { SignInButton, useProfile } from '@farcaster/auth-kit';

export default function Home() {
  const [activeTab, setActiveTab] = useState('profile');

  const { isAuthenticated, profile } = useProfile();
  const fid = profile?.fid;
  const username = profile?.username;

  const { data: userData, isLoading } = useQuery({
    queryKey: ['userActivity', fid],
    queryFn: async () => {
      if (!fid) throw new Error('User not authenticated');
      const client = getNeynarClient();
      const castsResponse = await client.fetchCastsForUser({ fid });
      const casts = castsResponse.casts.length;
      return {
        casts,
        likes: 10,
        recasts: 5,
        replies: 8,
        streaks: 3,
      };
    },
    enabled: !!fid,
  });

  const calculatePoints = () => {
    if (!userData) return 0;
    return (
      userData.casts * 1 +
      (userData.likes + userData.recasts) * 0.5 +
      userData.replies * 0.75 +
      userData.streaks * 3
    );
  };

  const points = calculatePoints();

  return (
    <div className="p-4">
      {!isAuthenticated && (
        <div>
          <p>Please sign in with Farcaster to continue:</p>
          <SignInButton />
        </div>
      )}
      {isAuthenticated && (
        <>
          <div className="tabs flex gap-2 mb-4">
            <button className="p-2 bg-gray-200" onClick={() => setActiveTab('profile')}>
              Profile
            </button>
            <button className="p-2 bg-gray-200" onClick={() => setActiveTab('airdrop')}>
              Airdrop
            </button>
            <button className="p-2 bg-gray-200" onClick={() => setActiveTab('leaderboard')}>
              Leaderboard
            </button>
          </div>

          {activeTab === 'profile' && (
            <div>
              <h2 className="text-xl">Profile</h2>
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <div>
                  <p>Username: {username || 'Unknown'}</p>
                  <p>FID: {fid}</p>
                  <p>Total Points: {points}</p>
                  <p>Casts: {userData?.casts}</p>
                  <p>Likes: {userData?.likes}</p>
                  <p>Recasts: {userData?.recasts}</p>
                  <p>Replies: {userData?.replies}</p>
                  <p>Streaks: {userData?.streaks}</p>
                </div>
              )}
            </div>
          )}
          {activeTab === 'airdrop' && <AirdropTab points={points} />}
          {activeTab === 'leaderboard' && (
            <div>
              <h2 className="text-xl">Leaderboard</h2>
              <ul>
                <li>1. UserA - {points + 10} points</li>
                <li>2. UserB - {points + 5} points</li>
                <li>3. {username || 'You'} - {points} points</li>
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
}