
interface BannerProps {
  title: string
}

const Banner = (props: BannerProps) => {
  return (
    <h1>{props.title}</h1>
  )
}

interface Course {
  term: string;
  number: string;
  meets: string;
  title: string;
}

interface ScheduleProps {
  courses: Record<string, Course>
}

const Schedule = (props: ScheduleProps) => {
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

const App = () => {
  const schedule = {
    "title": "CS Courses for 2018-2019",
    "courses": {
      "F101": {
        "term": "Fall",
        "number": "101",
        "meets": "MWF 11:00-11:50",
        "title": "Computer Science: Concepts, Philosophy, and Connections"
      },
      "F110": {
        "term": "Fall",
        "number": "110",
        "meets": "MWF 10:00-10:50",
        "title": "Intro Programming for non-majors"
      },
      "S313": {
        "term": "Spring",
        "number": "313",
        "meets": "TuTh 15:30-16:50",
        "title": "Tangible Interaction Design and Learning"
      },
      "S314": {
        "term": "Spring",
        "number": "314",
        "meets": "TuTh 9:30-10:50",
        "title": "Tech & Human Interaction"
      }
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full min-h-[80vh] items-center justify-center px-5">
      <Banner title={schedule.title} />
      <Schedule courses={schedule.courses} />
    </div>
  )
}

export default App
