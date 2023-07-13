import { Job } from '../utils/types.js';
import moment from 'moment';
import { formatDate } from '../utils/formatDate';

interface JobEntryProps {
  job: Job;
  onJobClick: (job: Job) => void;
  selectedJob: Job | undefined;
}

const JobEntry: React.FC<JobEntryProps> = ({ job, onJobClick, selectedJob }) => {

  return (
    <div onClick={() => onJobClick(job)} className={`mb-5 px-5 py-4 border border-gray-300 text-black hover:border-primary-light  ${selectedJob?.id === job.id ? 'border-2 border-primary shadow-lg' : 'border-gray-300'} rounded-xl`}
    >
      <div className="flex justify-between items-center mb-1">
        <h2 className="text-lg font-bold">{job.title}</h2>
        <h2 className="text-lg font-bold">${job.weeklyPay}</h2>
      </div>

      <span className="mr-2 font-bold">{job.employer.companyName}</span>|<span className="ml-2">{job.category}</span>

      <div className="flex items-center">
        <p className="text-gray-600 ">{job.city}, {job.state}</p>
      </div>
      <div className="flex items-center">
        <p>
          {formatDate(job.startDate)} - {formatDate(job.endDate)}
        </p>
      </div>
      <div className="flex items-center">
        <p>{job.startTime} - {job.endTime} ({job.shiftHour} hours)</p>
      </div>
      <p className='text-xs mt-2'>Created {moment(job.createdBy).fromNow()}</p>

    </div>

  );
};

export default JobEntry;
