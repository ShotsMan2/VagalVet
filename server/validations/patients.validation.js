import { z } from 'zod';

export const createPatientSchema = z.object({
  user_id: z.union([z.string(), z.number()]).transform(Number),
  petName: z.string({ required_error: 'Evcil hayvan adı zorunludur' }),
  petType: z.string({ required_error: 'Tür zorunludur' }),
  age: z.string().optional(),
  weight: z.string().optional(),
  nextVaccine: z.string().optional()
});
