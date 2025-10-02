import type { CourseSchemaType } from "./formValidators"
import { useFormContext, useController } from "react-hook-form"

// term
// number
// meets
// title

export const TermField = () => {
    const { control } = useFormContext<CourseSchemaType>();

    const { field, fieldState } = useController({ name: 'term', control });

    return (
        <label htmlFor="term" className="flex flex-col">
            <p>Term</p>
            <input
                id="term"
                {...field}
                className="border rounded px-2 py-1"
            />
            {fieldState.error && (
                <span className="text-red-500">
                    {fieldState.error.message}
                </span>
            )}
        </label>
    )

}

export const NumberField = () => {
    const { control } = useFormContext<CourseSchemaType>();

    const { field, fieldState } = useController({ name: 'number', control });

    return (
        <label htmlFor="number" className="flex flex-col">
            <p>Number</p>
            <input
                id="number"
                {...field}
                className="border rounded px-2 py-1"
            />
            {fieldState.error && (
                <span className="text-red-500">
                    {fieldState.error.message}
                </span>
            )}
        </label>
    )
}

export const MeetsField = () => {
    const { control } = useFormContext<CourseSchemaType>();

    const { field, fieldState } = useController({ name: 'meets', control });

    return (
        <label htmlFor="meets" className="flex flex-col">
            <p>Meets</p>
            <input
                id="meets"
                {...field}
                className="border rounded px-2 py-1"
            />
            {fieldState.error && (
                <span className="text-red-500">
                    {fieldState.error.message}
                </span>
            )}
        </label>
    )
}

export const TitleField = () => {
    const { control } = useFormContext<CourseSchemaType>();

    const { field, fieldState } = useController({ name: 'title', control });

    return (
        <label htmlFor="title" className="flex flex-col">
            <p>Title</p>
            <input
                id="Title"
                {...field}
                className="border rounded px-2 py-1"
            />
            {fieldState.error && (
                <span className="text-red-500">
                    {fieldState.error.message}
                </span>
            )}
        </label>
    )
}