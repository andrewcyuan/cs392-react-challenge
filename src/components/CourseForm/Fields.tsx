import type { CourseSchemaType } from "./formValidators"
import { useFormContext, useController } from "react-hook-form"



export const TermField = () => {
    const { control } = useFormContext<CourseSchemaType>();

    const { field, fieldState } = useController({ name: 'term', control });

    console.log('TermField value:', field.value, 'error:', fieldState.error);

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