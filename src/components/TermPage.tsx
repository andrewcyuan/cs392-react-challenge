import { useState } from 'react'

import type { Course } from './TermPage/CourseList';
import { CourseList } from "./TermPage/CourseList"
import { TermSelector } from './TermPage/TermSelector';

interface TermPageProps {
    courses: Record<string, Course>;
}

export default function TermPage(props: TermPageProps) {

    const [selected, setSelected] = useState("Fall");

    const termSelectorOptions = ["Fall", "Winter", "Spring"];


    return (
        <div className="flex flex-col">
            <div className="mb-5">
                <h2>Select Term</h2>
                <TermSelector options={termSelectorOptions} selected={selected} setSelected={setSelected} />
            </div>
            <CourseList selectedTerm={selected} courses={props.courses} />
        </div>
    );
}