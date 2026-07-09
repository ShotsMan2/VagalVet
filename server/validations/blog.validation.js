import { z } from 'zod';

export const createBlogSchema = z.object({
  title: z.string({ required_error: 'Başlık zorunludur' }).min(3, 'Başlık çok kısa'),
  excerpt: z.string({ required_error: 'Özet zorunludur' }).min(10, 'Özet çok kısa'),
  content: z.string().optional().default(''),
  author: z.string().optional().default('VagalVet Ekibi'),
  date: z.string().optional().default(''),
  category: z.string({ required_error: 'Kategori zorunludur' }),
  image: z.string({ required_error: 'Resim URL zorunludur' }).url('Geçerli bir resim URL giriniz')
});
