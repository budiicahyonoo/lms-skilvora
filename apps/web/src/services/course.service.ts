import { api } from '@/lib/axios';

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  level: string;
  thumbnail: string;
  price: number;
  category: { name: string };
  instructor: { name: string; profilePicture: string };
  modules?: Array<{ id: string; title: string; order: number; isFreePreview: boolean }>;
}

export const CourseService = {
  // Dipanggil dari Client Component jika butuh interaktivitas
  getAllPublished: async (): Promise<Course[]> => {
    const response = await axios.get('/courses');
    return response.data;
  },

  getBySlug: async (slug: string): Promise<Course> => {
    const response = await axios.get(`/courses/${slug}`);
    return response.data;
  },
};