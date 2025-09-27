import { createFileRoute, useParams, useSearch } from '@tanstack/react-router'
import { z } from 'zod';
import { useNavigate } from '@tanstack/react-router';
import { type FormEvent } from 'react';

const CourseSchema = z.object({
    course: z.object({
        term: z.string(),
        number: z.coerce.number(),
        meets: z.string(),
        title: z.string()
    })
})

export const Route = createFileRoute('/course-form/$course-id/')({
    component: RouteComponent,
    validateSearch: CourseSchema.parse
})

function RouteComponent() {

    const navigate = useNavigate();
    
    const { "course-id": courseId } = useParams({ from: '/course-form/$course-id/' })
    const { course } = useSearch({ from: '/course-form/$course-id/' });

    const submitForm = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData.entries())
        console.log(data);
    }

    const cancel = () => {
        navigate({
            to: '/'
        })
    }

    const capitalizeFirstLetter = (str: string) => str[0].toUpperCase() + str.substring(1)

    return (
        <div className="w-full min-h-[70vh] flex flex-col items-center">
            <div className="mt-10">
                <h1 className="mb-5">Configure {courseId}</h1>
                <form onSubmit={(e) => submitForm(e)} className="flex flex-col gap-2">
                    {Object.entries(course).map(([k, v]) => (
                        <label key={k}>
                            <h2>{capitalizeFirstLetter(k)}</h2>
                            <input type={typeof v} name={k} value={v} size={65}></input>
                        </label>
                    ))}
                    <div className="flex flex-row gap-2">
                        <button
                            className="px-2 py-1 bg-red-400 hover:bg-red-500 rounded-lg border border-black"
                            onClick={cancel}
                        >
                            Cancel
                        </button>
                        <button
                            className="px-2 py-1 bg-blue-400 hover:bg-blue-500 rounded-lg border border-black"
                            type="submit"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
