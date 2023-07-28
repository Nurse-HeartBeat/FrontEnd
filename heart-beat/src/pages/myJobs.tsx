import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import JobList from '../components/jobList';
import { Job as JobType } from '../utils/types';
import Nav from '../components/nav';
import { QUERY_JOBNURSE, QUERY_JOBEMPLOYER, UPDATE_BOOKJOB, UPDATE_APPROVEJOB, client, DELETE_JOB } from '../utils/graphQL';
import { useRouter } from 'next/router';
import Footer from '../components/footer';

// Define the type
type GraphQLErrorType = {
  message: string;
  locations: string;
  path: string;
};

export default function MyJobs() {
  const router = useRouter();

  const reduxUser = useSelector((state: any) => state.user);
  console.log(reduxUser.user)
  const [jobs, setJobs] = useState<JobType[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<JobType[]>([]); // Filtered jobs
  const [selectedJob, setSelectedJob] = useState<JobType | undefined>(undefined);

  // Separate jobs into pending, approved, and completed
  const pendingJobs = jobs.filter(job => !job.completed && !job.approve && job.assignTo);
  const approvedJobs = jobs.filter(job => !job.completed && job.approve);
  const completedJobs = jobs.filter(job => job.completed && job.approve);
  const allJobs = jobs


  // State to track current selection
  enum JobState {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    COMPLETED = 'COMPLETED',
    ALL = 'ALL'
  }
  const [currentJobState, setCurrentJobState] = useState(JobState.PENDING);


  const fetchData = async () => {
    if (!reduxUser.user) return;

    if (reduxUser.employer) {
      console.log('get job by employer: ', reduxUser.user.id)
      const variables = {
        employer: reduxUser.user.id,
      }
      const response = await client.query({ query: QUERY_JOBEMPLOYER, variables, fetchPolicy: 'network-only' });
      const fetchedJobs = response.data.jobEmployer;
      console.log('get job by employer: ', fetchedJobs)
      setJobs(fetchedJobs);

    } else {
      console.log('get job by nurse: ', reduxUser.user.id)
      const variables = {
        assignTo: reduxUser.user.id,
      }
      const response = await client.query({ query: QUERY_JOBNURSE, variables, fetchPolicy: 'network-only' });
      const fetchedJobs = response.data.jobNurse;
      console.log('get job by nurse: ', fetchedJobs)
      setJobs(fetchedJobs);
    }
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

  const toggleApproveJob = async (job: JobType) => {
    console.log('unbook job: ', job.id, job.approve)
    const id = job.id;
    await client.mutate({
      mutation: UPDATE_APPROVEJOB,
      variables: { id, approve: !job.approve },
      context: {
        credentials: 'include', // Add this line
      },
    })
      .then((data: any) => {
        console.log('Update appprove: ', data);
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

  const deleteJob = async (job: JobType) => {
    console.log('deletejob: ', job.id)
    const id = job.id
    await client.mutate({
      mutation: DELETE_JOB,
      variables: { id },
      context: {
        credentials: 'include', // Add this line
      },
    })
      .then((data: any) => {
        console.log('Update appprove: ', data);
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
    if (currentJobState === JobState.PENDING) {
      updatedJobs = pendingJobs;
    } else if (currentJobState === JobState.APPROVED) {
      updatedJobs = approvedJobs;
    } else {
      if (currentJobState === JobState.COMPLETED) {
        updatedJobs = completedJobs;
      } else {
        updatedJobs = allJobs
    }
  }
    setFilteredJobs(updatedJobs);
  }, [jobs, currentJobState]);


  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Nav />
      {reduxUser.user ?
        <div className='flex flex-col justify-center'>
          <h1 className="text-3xl text-black font-bold text-center mt-10">My Jobs</h1>
          <div className="flex justify-center mt-5">
            {reduxUser.employer && (
              <button
              className={`px-4 py-2 text-black ${currentJobState === JobState.ALL ? 'font-bold' : ''}`}
              onClick={() => setCurrentJobState(JobState.ALL)}
              >
              ALL
            </button>
            )}
            <button
              className={`px-4 py-2 text-black ${currentJobState === JobState.PENDING ? 'font-bold' : ''}`}
              onClick={() => setCurrentJobState(JobState.PENDING)}
            >
              Pending
            </button>

            <button
              className={`px-4 py-2 text-black ${currentJobState === JobState.APPROVED ? 'font-bold' : ''}`}
              onClick={() => setCurrentJobState(JobState.APPROVED)}
            >
              Approved
            </button>

            <button
              className={`px-4 py-2 text-black ${currentJobState === JobState.COMPLETED ? 'font-bold' : ''}`}
              onClick={() => setCurrentJobState(JobState.COMPLETED)}
            >
              Completed
            </button>

          </div>
          {filteredJobs.length === 0 && (
            <p className='text-center text-black px-4 text-md mt-10 '>
              {
                currentJobState === JobState.PENDING
                  ? reduxUser.employer
                    ? "No jobs have been posted yet. Start posting now!"
                    : "No jobs have been booked yet. Start booking now!"
                  : currentJobState === JobState.APPROVED
                    ? "No jobs have been approved yet. Check back soon!"
                    : "No jobs have been completed/posted yet. Start completing/posting now!"
              }
            </p>
          )}
          <div className='md:w-5/6 mx-auto sm:px-10'>
            {currentJobState === JobState.ALL &&
            (reduxUser.employer ?
            <JobList jobs={filteredJobs} onJobClick={handleJobClick} selectedJob={selectedJob} deleteJob={deleteJob} isJobManagementPortal={true} /> :
            <JobList jobs={filteredJobs} onJobClick={handleJobClick} selectedJob={selectedJob} unbookJob={handelCancelJob} isJobManagementPortal={true} chatBut={true}/>) }

            {currentJobState === JobState.PENDING &&
            (reduxUser.employer ?
            <JobList jobs={filteredJobs} onJobClick={handleJobClick} selectedJob={selectedJob} toggleApprove={toggleApproveJob} unbookJob={handelCancelJob} isJobManagementPortal={true} chatBut={true}/> :
            <JobList jobs={filteredJobs} onJobClick={handleJobClick} selectedJob={selectedJob} unbookJob={handelCancelJob} isJobManagementPortal={true} chatBut={true}/>) }

            {currentJobState === JobState.APPROVED &&
            (reduxUser.employer ?
            <JobList jobs={filteredJobs} onJobClick={handleJobClick} selectedJob={selectedJob} toggleApprove={toggleApproveJob} isJobManagementPortal={true} chatBut={true}/> :
            <JobList jobs={filteredJobs} onJobClick={handleJobClick} selectedJob={selectedJob} isJobManagementPortal={true} chatBut={true}/>) }

            {currentJobState === JobState.COMPLETED &&
            <JobList jobs={filteredJobs} onJobClick={handleJobClick} selectedJob={selectedJob} handleComplete={()=> {console.log("handle complete")}} isJobManagementPortal={true} chatBut={true}/>}
          </div>
        </div>
        : <p>you need to log in to see my jobs</p>}
      <Footer />
    </div>
  )
}