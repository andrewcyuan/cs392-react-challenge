import { useNavigate } from "@tanstack/react-router"
import { type Dispatch, type SetStateAction } from "react"
import { isOverlapping } from "../../utils/calcTimeOverlap";
import SquarePen from "./SquarePenSVG";
import { useIsAdmin } from "../../utils/getUser";

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

export const CourseList = ({ courses, currentlySelectedCourses, setCurrentlySelectedCourses, selectedTerm }: CourseListProps) => {

    const navigate = useNavigate();

    const toggleSelectedItem = (key: string) => {
        setCurrentlySelectedCourses(currentlySelectedCourses.includes(key) ? currentlySelectedCourses.filter(x => x !== key) : [...currentlySelectedCourses, key])
    }

    const isAdmin = useIsAdmin();

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

    const edgeButtonClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, key: string, course: Course) => {
        e.stopPropagation();
        console.log("Navigating to course " + key);

        await navigate({
            to: `/course-form/$course-id`,
            params: {
                "course-id": key
            },
            search: {
                term: course.term as "Fall" | "Winter" | "Spring" | "Summer",
                number: course.number,
                meets: course.meets,
                title: course.title
            }
        })
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 w-full overflow-auto">
            {Object.entries(courses).filter(([_key, course]) => course.term === selectedTerm).map(([key, course]) => (
                <div
                    key={key}
                    role="button"
                    className={`group relative border border-gray rounded-md shadow w-auto min-h-[150px] p-2 ${calcFormatting(key)}`}
                    onClick={() => toggleSelectedItem(key)}
                >
                    {/**Edge Button */}
                    {isAdmin &&
                        < div className="pointer-events-none absolute top-2 right-2 flex 
                    opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                type="button"
                                aria-label="Button"
                                className="pointer-events-auto border-2 border-black p-1 hover:bg-amber-400 rounded-full shadow"
                                onClick={(e) => edgeButtonClick(e, key, course)}
                            >
                                <SquarePen />
                            </button>
                        </div>
                    }
                    {/** card content */}
                    <div className="flex flex-col justify-between w-full h-full text-left">
                        <div>
                            <h2>{course.term} CS {course.number}</h2>
                            <p>{course.title}</p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <hr />
                            <p>{course.meets}</p>
                        </div>
                    </div>
                </div>
            ))
            }
        </div >
    )
}