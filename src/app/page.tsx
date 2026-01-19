'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/dashboard');
  }, [router]);

  return (
    <div className="min-h-screen bg-[#002418] flex items-center justify-center">
      <div className="text-center">
        <div className="text-2xl font-bold text-white mb-2">Damisa</div>
        <div className="text-white/60">Loading CorridorOS...</div>
      </div>
    </div>
  );
}