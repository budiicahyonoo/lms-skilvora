import { api } from '@/lib/axios';

export const EnrollmentService = {
  enroll: async (classId: string) => {
    const response = await api.post(`/enrollments/${classId}`);
    return response.data;
  },
  
  getMyEnrollments: async () => {
    // Diubah dari axios.get menjadi api.get
    const response = await api.get('/enrollments/my');
    return response.data;
  },
  
  getEnrollmentDetails: async (classId: string) => {
    const response = await api.get(`/enrollments/my/${classId}`);
    return response.data;
  },
  
  updateProgress: async (enrollmentId: string, moduleId: string, status: 'IN_PROGRESS' | 'COMPLETED') => {
    const response = await api.patch(`/enrollments/${enrollmentId}/modules/${moduleId}`, { status });
    return response.data;
  }
};