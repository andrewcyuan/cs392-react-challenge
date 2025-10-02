import { createFileRoute, useParams, useSearch } from '@tanstack/react-router'
import { useNavigate } from '@tanstack/react-router';
import { useForm, FormProvider } from 'react-hook-form'

import { CourseSchema, CourseSchemaResolver } from '../../../components/CourseForm/formValidators';
import type { CourseSchemaType } from '../../../components/CourseForm/formValidators';

import { TermField, NumberField, MeetsField, TitleField } from '../../../components/CourseForm/Fields';



export const Route = createFileRoute('/course-form/$course-id/')({
    component: RouteComponent,
    validateSearch: CourseSchema.parse,
})

function RouteComponent() {

    const navigate = useNavigate();

    const { "course-id": courseId } = useParams({ from: '/course-form/$course-id/' })
    const { term, number, meets, title } = useSearch({ from: '/course-form/$course-id/' });

    const methods = useForm<CourseSchemaType>({
        defaultValues: {
            term: term,
            number: number,
            meets: meets,
            title: title
        },
        resolver: CourseSchemaResolver,
        mode: "onChange",
        reValidateMode: "onChange"
    })

    const submitForm = (data: CourseSchemaType) => {
        console.log(data);
    }

    const cancel = () => {
        navigate({
            to: '/'
        })
    }

    return (
        <div className="w-full min-h-[70vh] flex flex-col items-center">
            <div className="mt-10">
                <h1 className="mb-5">Configure {courseId}</h1>
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(submitForm)} className="flex flex-col gap-2">

                        <TermField />
                        <NumberField />
                        <MeetsField />
                        <TitleField />

                        {/** Submit and cancel buttons */}
                        <div className="flex flex-row gap-2 mt-2">
                            <button
                                type="button"
                                className="px-2 py-1 bg-red-400 hover:bg-red-500 rounded-lg border border-black hover:cursor-pointer"
                                onClick={cancel}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-2 py-1 bg-blue-400 hover:bg-blue-500 rounded-lg border border-black hover:cursor-pointer"
                                type="submit"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </FormProvider>
            </div>
        </div>
    );
}
