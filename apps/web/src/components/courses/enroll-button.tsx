'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { EnrollmentService } from '@/services/enrollment.service';

interface EnrollButtonProps {
  classId: string;
  isFree: boolean;
}

export function EnrollButton({ classId, isFree }: EnrollButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleEnroll = async () => {
    setIsLoading(true);
    try {
      await EnrollmentService.enroll(classId);
      toast.success(isFree ? 'Berhasil mendaftar kelas gratis!' : 'Pendaftaran berhasil, silakan selesaikan pembayaran.');
      
      // Redirect ke dashboard untuk mulai belajar atau membayar
      router.push('/dashboard/classes');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Gagal mendaftar kelas. Silakan login terlebih dahulu.';
      toast.error(message);
      
      if (error.response?.status === 401) {
        router.push('/login');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      size="lg" 
      className="w-full mb-4" 
      onClick={handleEnroll} 
      disabled={isLoading}
    >
      {isLoading 
        ? 'Memproses...' 
        : (isFree ? 'Daftar Kelas Gratis' : 'Beli Kelas Sekarang')}
    </Button>
  );
}