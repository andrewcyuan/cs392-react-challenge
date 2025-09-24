import Modal from "./Modal";
import type { Course } from "./TermPage/CourseList";

interface CoursePlanModalProps {
    courses: Record<string, Course>;
    selectedCourses: string[];
    isOpen: boolean;
    onClose: () => void;
}

export const CoursePlanModal = ({ courses, selectedCourses, isOpen, onClose }: CoursePlanModalProps) => {

    const currentCourses: Course[] = selectedCourses.map(id => courses[id]).filter(Boolean)
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="">
                {currentCourses.length > 0 ? 
                <div className="flex flex-col gap-3">
                    <h2>Your Current Courses</h2>
                    {currentCourses.map(course => (
                        <div>
                            <h2>{course.term} CS {course.number}</h2>
                            <p>{course.meets}</p>
                        </div>
                    ))}
                    </div>
                    :
                    <div className="flex flex-col">
                        <h2>You don't have any selected courses yet!</h2>
                        <p>Click on courses to select them.</p>
                    </div>
                }
            </div>
        </Modal>
    )
}

