'use client';

import { useAccount, useWriteContract } from 'wagmi';

export default function AirdropTab({ points }: { points: number }) {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();

  const claimTokens = () => {
    if (!address) {
      alert('Please connect your wallet first');
      return;
    }
    writeContract({
      address: '0x59574ec1467BDe0BA1d7D690ce5a55C46c50370B',
      abi: [
        {
          name: 'claimTokens',
          type: 'function',
          inputs: [
            { name: 'recipient', type: 'address' },
            { name: 'points', type: 'uint256' },
          ],
          outputs: [],
          stateMutability: 'nonpayable',
        },
      ],
      functionName: 'claimTokens',
      args: [address, BigInt(points)],
    });
  };

  const tokens = points * 100;
  const claimDate = new Date('2025-05-01T00:00:00Z');
  const isClaimable = new Date() >= claimDate;

  return (
    <div>
      <h2 className="text-xl">Airdrop</h2>
      <p>Total Tokens: {tokens}</p>
      <button
        onClick={claimTokens}
        disabled={!isClaimable}
        className="p-2 bg-blue-500 text-white disabled:bg-gray-400"
      >
        {isClaimable ? 'Claim' : 'Claim (Available May 1st)'}
      </button>
    </div>
  );
}