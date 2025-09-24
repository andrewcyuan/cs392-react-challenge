import { useState } from 'react'

import { CoursePlanModal } from './CoursePlanModal';

import type { Course } from './TermPage/CourseList';
import { CourseList } from "./TermPage/CourseList"
import { TermSelector } from './TermPage/TermSelector';

interface TermPageProps {
    courses: Record<string, Course>;
}

export default function TermPage(props: TermPageProps) {

    const [selected, setSelected] = useState("Fall");
    const [coursePlanOpen, setCoursePlanOpen] = useState(false);
    const [currentlySelectedCourses, setCurrentlySelectedCourses] = useState<string[]>([]);

    const termSelectorOptions = ["Fall", "Winter", "Spring"];

    const toggleCoursePlanModal = () => setCoursePlanOpen(!coursePlanOpen);

    return (
        <div className="flex flex-col">
            <div className="flex flex-row gap-8 w-full mb-5">

                <div className="">
                    <h2>Select Term</h2>
                    <TermSelector options={termSelectorOptions} selected={selected} setSelected={setSelected} />
                </div>
                <div>
                    <button
                        onClick={toggleCoursePlanModal}
                        className="p-2 border border-black rounded-md hover:cursor-pointer hover:bg-amber-400"
                    >
                        <h2>

                        Open Course Plan
                        </h2>
                    </button>
                </div>
            </div>
            <CourseList selectedTerm={selected} courses={props.courses} currentlySelectedCourses={currentlySelectedCourses} setCurrentlySelectedCourses={setCurrentlySelectedCourses} />

            <CoursePlanModal courses={props.courses} isOpen={coursePlanOpen} onClose={toggleCoursePlanModal} selectedCourses={currentlySelectedCourses} />
        </div>
    );
}