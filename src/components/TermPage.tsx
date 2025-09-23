import { useState } from 'react'

import type { Course } from './TermPage/CourseList';
import { CourseList } from "./TermPage/CourseList"
import { TermSelector } from './TermPage/TermSelector';

interface TermPageProps {
    courses: Record<string, Course>;
}

function filterCourses(newTerm: string, courses: Course[]) {
    return courses.filter(course => course.term === newTerm);
}

export default function TermPage(props: TermPageProps) {

    const courseList: Course[] = Object.values(props.courses)

    const [courses, setCourses] = useState(filterCourses("Fall", courseList));

    const termSelectorOptions = ["Fall", "Winter", "Spring"];


    const changeTerm = (newTerm: string) => {
        setCourses(filterCourses(newTerm, courseList))
    }

    return (
        <div className="flex flex-col gap-5">
            <TermSelector options={termSelectorOptions} defaultSelected={"Fall"} setSelected={changeTerm} />
            <CourseList courses={courses} />
        </div>
    );
}