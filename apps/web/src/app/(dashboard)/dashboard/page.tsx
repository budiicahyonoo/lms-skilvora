'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/axios';

export default function DashboardIndex() {
  const router = useRouter();

  useEffect(() => {
    api.get('/auth/me')
      .then(res => {
        const role = res.data.role;
        if (role === 'INSTRUCTOR') {
          router.replace('/dashboard/instructor');
        } else if (role === 'ADMIN') {
          router.replace('/dashboard/admin');
        } else {
          router.replace('/dashboard/student');
        }
      })
      .catch(() => {
        router.replace('/auth/login');
      });
  }, [router]);

  return (
    <div className="flex h-[80vh] items-center justify-center">
      <div className="animate-pulse flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-[#0033FF]/20 border-t-[#0033FF] rounded-full animate-spin mb-4"></div>
        <p className="text-[#00033D]/60 font-medium">Mengarahkan ke dasbor Anda...</p>
      </div>
    </div>
  );
}