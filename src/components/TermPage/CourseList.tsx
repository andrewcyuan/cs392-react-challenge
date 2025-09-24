import { type Dispatch, type SetStateAction } from "react"
import { isOverlapping } from "../../utils/calcTimeOverlap";

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

    // utility function that calculates formatting based on:
    // 1. if the course is selected
    // 2. if the current course is overlapping with a selected course
    // 3. if the course is being hovered
    const calcFormatting = (key: string) => {
        if (currentlySelectedCourses.includes(key)) {
            return "bg-green-300 hover:bg-green-400 hover:cursor-pointer"
        }
        else if (isOverlapping(courses, currentlySelectedCourses, key)) {
            return "bg-red-300 pointer-events-none";
        }
        else {
            return "hover:bg-gray-100 hover:cursor-pointer";
        }
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 w-full overflow-auto">
            {Object.entries(courses).filter(([_key, course]) => course.term === selectedTerm).map(([key, course]) => (
                <button
                    key={key}
                    className={`border border-gray rounded-md shadow w-full min-h-[150px] p-2 ${calcFormatting(key)}`}
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