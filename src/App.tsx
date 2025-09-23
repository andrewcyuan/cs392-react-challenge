import { useJsonQuery } from "./utils/fetchJSON"
import { Schedule } from "./components/Schedule"
import type { Course } from "./components/Schedule"
import { Banner } from "./components/Banner"

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
