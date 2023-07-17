import React from 'react';
import JobEntry from './jobEntry';
import { Job } from '../utils/types.js';

interface JobListProps {
  jobs: Job[];
  onJobClick: (job: Job) => void;
  selectedJob: Job | undefined;
  isJobManagementPortal?: boolean; // optional boolean to determine if the job list is for the job management portal
  unbookJob?: (job: Job) => void; // optional unbooking function
  toggleApprove?: (job: Job) => void; // optional approve function
  handleComplete?: (job: Job) => void; // optional complete function
}

const JobList: React.FC<JobListProps> = ({ jobs, onJobClick, selectedJob, isJobManagementPortal, unbookJob, toggleApprove, handleComplete }) => {
  return (
    <div className='px-5 my-10'>
      {jobs.map((job, index) => (
        isJobManagementPortal ?
          (
            <div key={index} className="grid md:grid-cols-6 md:gap-2 items-center">
              <div className="md:col-span-1"> </div>
              <div className="md:col-span-4">
                <JobEntry job={job} selectedJob={selectedJob} onJobClick={onJobClick} />
              </div>
              <div className="md:col-span-1 mb-6 flex justify-center md:justify-end">
                {unbookJob &&
                  <button className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700' onClick={() => unbookJob(job)}>
                    Unbook
                  </button>
                }
                {toggleApprove &&
                  <button className={`bg-${job.approve ? 'red' : 'green'}-500 text-white px-3 py-1 rounded hover:bg-${job.approve ? 'red' : 'green'}-700`} onClick={() => toggleApprove(job)}>
                    {job.approve ? 'Disapprove' : 'Approve'}
                  </button>
                }
                {handleComplete &&
                  <button className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700' onClick={() => handleComplete(job)}>
                    Complete
                  </button>
                }

              </div>
            </div>
          )
          :
          <JobEntry key={index} job={job} selectedJob={selectedJob} onJobClick={onJobClick} />
      ))}
    </div>
  );
};

export default JobList;
