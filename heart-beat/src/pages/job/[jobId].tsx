import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { Job as JobType } from '../../utils/types';
import { QUERY_JOBID, client } from '../../utils/graphQL';
import Nav from '../../components/nav';
import JobDetail from '../../components/jobDetail';

const JobPage = () => {
  const router = useRouter()
  const { jobId } = router.query
  const [job, setJob] = useState<JobType | null>(null);

  const fetchData = async () => {
    const response = await client.query({ query: QUERY_JOBID, variables: { id: jobId } });
    const fetchedJob = response.data.jobId;
    setJob(fetchedJob);
    console.log('get job by Id: ', fetchedJob)
  }


  useEffect(() => {
    if (jobId) {
      fetchData();
    }
  }, [jobId]);


  return (
    <div className='flex flex-col bg-white min-h-screen'>
      <Nav />
      <div className='lg:w-2/3 px-10  mx-auto'>
        {job ? <JobDetail job={job} /> : <p className='text-center text-lg mt-10'>loading...</p>}
      </div>
    </div>
  )

}

export default JobPage;
