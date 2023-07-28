import React, {useState} from 'react';
import JobEntry from './jobEntry';
import { Job } from '../utils/types.js';
import { FaComments, FaMapMarkerAlt, FaRegCalendarAlt, FaRegClock, FaUsers} from 'react-icons/fa';
import ChatRoom from '../components/chatRoom';
import { useSelector } from 'react-redux';

interface JobListProps {
  jobs: Job[];
  onJobClick: (job: Job) => void;
  selectedJob: Job | undefined;
  isJobManagementPortal?: boolean; // optional boolean to determine if the job list is for the job management portal
  unbookJob?: (job: Job) => void; // optional unbooking function
  toggleApprove?: (job: Job) => void; // optional approve function
  handleComplete?: (job: Job) => void; // optional complete function
  deleteJob?: (job: Job) => void;
  chatBut?:boolean
}

const JobList: React.FC<JobListProps> = ({ jobs, onJobClick, selectedJob, isJobManagementPortal, unbookJob, toggleApprove, handleComplete, deleteJob, chatBut }) => {
  const reduxUser = useSelector((state: any) => state.user);
  const [chat, setChat] = useState(false)
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
              <div className="md:col-span-1 mb-6 flex flex-col justify-center md:justify-end">
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
                {deleteJob &&
                  <button className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700' onClick={() => deleteJob(job)}>
                  Delete Job
                </button>
                }
                {chatBut && (
                  <button className="flex justify-center items-center w-[100%] h-10 px-3 py-1 text-white rounded-md bg-accent hover:bg-primary"
                  onClick={() => setChat(true)}>
                    <FaComments />
                  </button>
                )}

                {chat && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={(e) => setChat(false)}>
                    <div className="flex bg-white p-8 rounded-lg h-[75%] w-[50%] overflow-y-auto z-100"
                    onClick={(e) => e.stopPropagation()}>
                      <button onClick={(e) => setChat(false)} className='flex top-4 right-4 text-gray-600 hover:text-gray-800'> x </button>
                      <ChatRoom id={reduxUser.employer === false ? job.employer?.id : job.assignTo?.id} />
                    </div>
                  </div>
                )}

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
