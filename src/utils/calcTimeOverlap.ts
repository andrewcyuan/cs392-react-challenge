import type { Course } from "../components/TermPage/CourseList";

// function to calculate if the new course has time overlap with any of the selected courses
export function isOverlapping(allCourses: Record<string, Course>, currentlySelectedCourses: string[], key: string): boolean {
    const keyCourse = allCourses[key];


    const final =  Object.entries(allCourses)
        .filter(([key, x]) => x !== keyCourse && currentlySelectedCourses.includes(key))
        .some(([_key, course]) => binaryIsOverlapping(keyCourse, course));

    return final;
}

function binaryIsOverlapping(c1: Course, c2: Course): boolean {
    if (c1.term !== c2.term || c1.meets === "" || c2.meets === "") {
        return false;
    }

    const meets1 = c1.meets.split(" ");
    const meets2 = c2.meets.split(" ");

    const days1 = splitByUppercase(meets1[0]);
    const days2 = splitByUppercase(meets2[0]);

    // Check if there are any overlapping days
    const hasOverlappingDays = days1.some(day => days2.includes(day));
    if (!hasOverlappingDays) {
        return false;
    }

    const times1 = meets1[1].split("-").map(t => parseInt(t.replace(":", "")));
    const times2 = meets2[1].split("-").map(t => parseInt(t.replace(":", "")));

    // Classes overlap if one doesn't end before the other starts
    return !(times1[1] < times2[0] || times2[1] < times1[0]);

}

// split word by uppercase; i.e. TuTh -> ["Tu", "Th"]
function splitByUppercase(s: string): string[] {
    // Match all valid day codes: M, Tu, W, Th, F, Sa, Su
    const regex = /(M|Tu|W|Th|F|Sa|Su)/g;
    return s.match(regex) || [];
}