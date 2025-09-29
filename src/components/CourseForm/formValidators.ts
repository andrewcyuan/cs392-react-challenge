import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';


export const CourseSchema = z.object({
    term: z.enum(['Fall', 'Winter', 'Spring', 'Summer'], {
        errorMap: () => ({ message: "Term must be Fall, Winter, Spring, or Summer" })
    }),
    number: z.string().regex(/\d{3}-?\d?/, "Must be a class number with optional section; e.g. 213-2"),
    meets: z.string().regex(/^((M|Tu|W|Th|F|Sa|Su)+ \d{2}:\d{2}-\d{2}:\d{2})?$/, "Must be in format 'MTuWThF 10:00-11:00' or empty"),
    title: z.string().min(2, "Title must be at least 2 characters")

})

export type CourseSchemaType = z.infer<typeof CourseSchema>;

export const CourseSchemaResolver = zodResolver(CourseSchema);

