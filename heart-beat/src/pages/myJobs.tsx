import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import JobList from '../components/jobList';
import { Job as JobType } from '../utils/types';
import Nav from '../components/nav';
import { QUERY_JOBNURSE, UPDATE_BOOKJOB, client } from '../utils/graphQL';
import { useRouter } from 'next/router';

// Define the type
type GraphQLErrorType = {
  message: string;
  locations: string;
  path: string;
};

export default function Jobs() {
  const router = useRouter();

  const reduxUser = useSelector((state: any) => state.user);
  console.log(reduxUser.user)
  const [jobs, setJobs] = useState<JobType[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<JobType[]>([]); // Filtered jobs
  const [selectedJob, setSelectedJob] = useState<JobType | undefined>(undefined);

  // Separate jobs into pending and approved
  const pendingJobs = jobs.filter(job => !job.approved);
  const approvedJobs = jobs.filter(job => job.approved);

  // State to track current selection
  const [showApproved, setShowApproved] = useState(false);

  const fetchData = async () => {
    if (!reduxUser.user) return;
    let variables = {
      assignTo: reduxUser.user.id,
    }
    const response = await client.query({ query: QUERY_JOBNURSE, variables, fetchPolicy: 'network-only' });
    const fetchedJobs = response.data.jobNurse;
    console.log('get job by nurse: ', fetchedJobs)
    setJobs(fetchedJobs);
    // Separate jobs into pending and approved
    const pendingJobs = fetchedJobs.filter((job: JobType) => !job.approved);
    const approvedJobs = fetchedJobs.filter((job: JobType) => job.approved);
  }


  const handelCancelJob = async (job: JobType) => {

    console.log('unbook job: ', job.id)
    const id = job.id;
    await client.mutate({
      mutation: UPDATE_BOOKJOB,
      variables: { id },
      context: {
        credentials: 'include', // Add this line
      },
    })
      .then((data: any) => {
        console.log('Update assign to: ', data);
        fetchData();
      })
      .catch((err) => {
        console.error(err);
        if (err.graphQLErrors) {
          err.graphQLErrors.map(({ message, locations, path }: GraphQLErrorType) =>
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
            ),
          );
        }

        if (err.networkError) {
          console.log(`[Network error]: ${err.networkError}`);
        }
      })
  }

  const handleJobClick = (job: JobType) => {
    setSelectedJob(job);
    router.push(`/job/${job.id}`);
  }



  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let updatedJobs: JobType[] = [];
    if (showApproved) {
      updatedJobs = approvedJobs;
    } else {
      updatedJobs = pendingJobs;
    }
    setFilteredJobs(updatedJobs);
  }, [jobs, showApproved]);


  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Nav />
      {reduxUser.user ?
        <div className='flex flex-col justify-center'>
          <h1 className="text-3xl font-bold text-center mt-10">My Jobs</h1>
          <div className="flex justify-center mt-5">
            <button
              className={`px-4 py-2 ${showApproved ? '' : 'font-bold'}`}
              onClick={() => setShowApproved(false)}
            >
              Pending
            </button>

            <button
              className={`px-4 py-2 ${showApproved ? 'font-bold' : ''}`}
              onClick={() => setShowApproved(true)}
            >
              Approved
            </button>
          </div>
          {filteredJobs.length === 0 && <p className='text-center text-md mt-10 '>{showApproved ? "No jobs have been approved yet. Check back soon!" : "No jobs have been booked yet. Start booking now!"}</p>}
          <div className='md:w-3/4 mx-auto sm:px-10'>
            <JobList jobs={filteredJobs} onJobClick={handleJobClick} selectedJob={selectedJob} unbookJob={handelCancelJob}/>
          </div>
        </div>
        : <p>you need to log in to see my jobs</p>}

    </div>
  )
}