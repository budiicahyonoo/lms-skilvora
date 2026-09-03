import { api } from '@/lib/axios';

export const PaymentService = {
  getMyPayments: async () => {
    const response = await api.get('/enrollments/payments/me');
    return response.data;
  },
  uploadProof: async (paymentId: string, proofUrl: string) => {
    const response = await api.patch(`/enrollments/payments/${paymentId}/proof`, { proofUrl });
    return response.data;
  }
};