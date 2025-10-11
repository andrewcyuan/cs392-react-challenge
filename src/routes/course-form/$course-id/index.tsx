import { createFileRoute, useParams, useSearch } from '@tanstack/react-router'
import { useNavigate } from '@tanstack/react-router';
import { useForm, FormProvider } from 'react-hook-form'

import { CourseSchema, CourseSchemaResolver } from '../../../components/CourseForm/formValidators';
import type { CourseSchemaType } from '../../../components/CourseForm/formValidators';

import { TermField, NumberField, MeetsField, TitleField } from '../../../components/CourseForm/Fields';

import { getDatabase, ref, update } from 'firebase/database';

import { useState, useEffect } from 'react';



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

    const db = getDatabase();

    const [valid, setValid] = useState(false);

    const [fbError, setFbError] = useState("");

    useEffect(() => {
        const sub = methods.watch(async () => {
            const ok = await methods.trigger(['term', 'number', 'meets', 'title']);
            setValid(ok);
        });
        return () => sub.unsubscribe();
    }, [methods]);

    const submitForm = async (data: CourseSchemaType) => {
        console.log("Attempting submit")

        try {
            await update(ref(db, `courses/${courseId}`), {
                term: data.term,
                number: data.number,
                meets: data.meets,
                title: data.title
            });
            navigate({
                to: '/'
            })
        } catch {
            setFbError("You must be signed in as an admin to edit courses!")
        }

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
                                className={`px-2 py-1 rounded-lg border border-black hover:cursor-pointer ${!valid ? 'bg-gray-400' : 'bg-blue-400 hover:bg-blue-500'}`}
                                type="submit"
                                disabled={!valid}
                            >
                                Submit
                            </button>
                        </div>
                        <p className="text-red-500">{fbError}</p>
                    </form>
                </FormProvider>
            </div>
        </div>
    );
}
