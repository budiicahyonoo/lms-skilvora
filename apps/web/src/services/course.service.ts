import { api } from '@/lib/axios';

export const CourseService = {
  getAllPublished: async () => {
    const response = await api.get('/courses');
    return response.data;
  }
};