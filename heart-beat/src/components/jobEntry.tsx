import { Job } from '../utils/types.js';
import { formatDate } from '../utils/formatDate';

interface JobEntryProps {
  job: Job;
  onJobClick: (job: Job) => void;
  selectedJob: Job | undefined;
}

const JobEntry: React.FC<JobEntryProps> = ({ job, onJobClick, selectedJob }) => {

  return (
    <div onClick={() => onJobClick(job)} className={`mx-5 mb-5 px-5 py-5 border border-gray-300 text-black hover:border-primary-light  ${selectedJob?.id === job.id ? 'border-2 border-primary shadow-lg' : 'border-gray-300'} rounded-xl`}
    >
      <h2 className="text-lg font-bold">
        <span className="mr-2">{job.title}</span>
        |
        <span className="ml-2">{job.category}</span>
      </h2>
      <h2 className="text-lg font-bold">${job.weekly_pay}</h2>

      <div className="flex items-center">
        <p className="text-gray-600 ">{job.city}, {job.state}</p>
      </div>
      <div className="flex items-center">
        <p>{new Intl.DateTimeFormat('en-US').format(new Date(job.startDate))} - {new Intl.DateTimeFormat('en-US').format(new Date(job.endDate))}</p>
      </div>
      <div className="flex items-center">
        <p>{job.start} - {job.end} ({job.shiftHour} hours)</p>
      </div>
    </div>

  );
};

export default JobEntry;
