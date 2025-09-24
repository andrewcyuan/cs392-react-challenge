import { type Dispatch, type SetStateAction } from "react"

export interface Course {
    term: string;
    number: string;
    meets: string;
    title: string;
}

export interface CourseListProps {
    courses: Record<string, Course>;
    currentlySelectedCourses: string[];
    setCurrentlySelectedCourses: Dispatch<SetStateAction<string[]>>;
    selectedTerm: string;
}

export const CourseList = ({ courses, currentlySelectedCourses, setCurrentlySelectedCourses, selectedTerm}: CourseListProps) => {

    const toggleSelectedItem = (key: string) => {
        setCurrentlySelectedCourses(currentlySelectedCourses.includes(key) ? currentlySelectedCourses.filter(x => x !== key) : [...currentlySelectedCourses, key])
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 w-full overflow-auto">
            {Object.entries(courses).filter(([_key, course]) => course.term === selectedTerm).map(([key, course]) => (
                <button
                    key={key}
                    className={`border border-gray rounded-md shadow w-full min-h-[150px] p-2 hover:cursor-pointer ${
                        currentlySelectedCourses.includes(key) ? "bg-green-300 hover:bg-green-400" : "hover:bg-gray-100"
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