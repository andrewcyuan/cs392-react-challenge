import { useJsonQuery } from "./utils/fetchJSON"

interface BannerProps {
  title: string
}

const Banner = (props: BannerProps) => {
  return (
    <h1 className="mt-5">{props.title}</h1>
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

type Schedule = {
  title: string;
  courses: Record<string, Course>;
}

const App = () => {

  const [schedule, loading, err] = useJsonQuery<Schedule>('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');

  if (err) {
    console.error("Error in fetch: ", err)
  }

  return (
    <div className="w-full min-h-[80vh] items-center justify-center px-5">
      {loading ?
        <h1>Data loading...</h1> :
        <div className="flex flex-col gap-8">
          <Banner title={schedule.title} />
          <Schedule courses={schedule.courses} />
        </div>
      }
    </div>
  )
}

export default App
