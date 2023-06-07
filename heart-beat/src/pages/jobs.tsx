import Nav from '../components/nav';
import JobDetail from '../components/jobDetail';
import { jobs } from '../components/data';

export default function Jobs () {
  return (
    <div>
      <Nav />
      Jobs Placeholder
      <JobDetail job={jobs[1]}/>
    </div>
  )
}