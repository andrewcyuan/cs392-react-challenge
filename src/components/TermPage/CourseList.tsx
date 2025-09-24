import { useState } from "react"

export interface Course {
    term: string;
    number: string;
    meets: string;
    title: string;
}

export interface CourseListProps {
    courses: Record<string, Course>;
    selectedTerm: string;
}

export const CourseList = (props: CourseListProps) => {

    const [selectedCourses, setSelectedCourses] = useState<string[]>([]);

    const toggleSelectedItem = (key: string) => {
        setSelectedCourses(selectedCourses.includes(key) ? selectedCourses.filter(x => x !== key) : [...selectedCourses, key])
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 w-full overflow-auto">
            {Object.entries(props.courses).filter(([_key, course]) => course.term === props.selectedTerm).map(([key, course]) => (
                <button
                    key={key}
                    className={`border border-gray rounded-md shadow w-full min-h-[150px] p-2 hover:cursor-pointer ${
                        selectedCourses.includes(key) ? "bg-green-300 hover:bg-green-400" : "hover:bg-gray-100"
                    }`}
                    onClick={() => toggleSelectedItem(key)}
                >
                    <div className="flex flex-col justify-between w-full h-full">

                        <div>
                            <h2>{course.term} CS {course.number}</h2>
                            <p>{course.title}</p>
                        </div>
                        <div>
                            <hr />
                            <p>{course.meets}</p>
                        </div>
                    </div>
                </button>
            ))}
        </div>
    )
}