import { api } from '@/lib/axios';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'INSTRUCTOR' | 'STUDENT';
  profilePicture?: string;
}

export const AuthService = {
  getProfile: async (): Promise<UserProfile> => {
    // Ubah kembali menjadi /auth/me
    const response = await api.get('/auth/me'); 
    return response.data;
  },

  register: async (data: { name: string; email: string; password: string }) => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },
};