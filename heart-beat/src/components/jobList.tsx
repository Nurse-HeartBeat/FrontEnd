import React from 'react';
import JobEntry from './jobEntry';
import { Job } from './types.js';

interface JobListProps {
  jobs: Job[];
  onJobClick: (job: Job) => void;
  selectedJob: Job | undefined;
}

const JobList: React.FC<JobListProps> = ({ jobs, onJobClick, selectedJob }) => {
  return (
    <div className='px-5 my-10'>
      {jobs.map((job, index) => (
        <JobEntry key={index} job={job} selectedJob={selectedJob} onJobClick={ onJobClick }/>
      ))}
    </div>
  );
};

export default JobList;
