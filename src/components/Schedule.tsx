export interface Course {
    term: string;
    number: string;
    meets: string;
    title: string;
}

export interface ScheduleProps {
    courses: Record<string, Course>
}

export const Schedule = (props: ScheduleProps) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 w-full overflow-auto">
            {Object.entries(props.courses).map(([_key, course]) => (
                <div className="border border-gray rounded-md shadow flex flex-col justify-between w-full min-h-[150px] p-2">
                    <div>
                        <h2>{course.term} CS {course.number}</h2>
                        <p>{course.title}</p>
                    </div>
                    <div>
                        <hr />
                        <p>{course.meets}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}