import { Job } from './types.js';
import { FaCalendarAlt, FaComments, FaMapMarkerAlt } from 'react-icons/fa';
import { FaRegCalendarAlt, FaRegClock, FaUsers, FaDollarSign, FaCircle } from 'react-icons/fa';
import { FaUser, FaPersonBooth, FaEnvelope, FaParking, FaInfoCircle } from 'react-icons/fa';

interface JobDetailProps {
  job: Job;
}
interface DayCircleProps {
  day: string;
  active: boolean;
}

const JobDetail: React.FC<JobDetailProps> = ({ job }) => {
  return (
    <div className='mx-5 px-5 border border-gray-300 text-black'>
      placeholder for map
      <div className="flex justify-start items-center mb-2 space-x-4">
        <h2 className="text-2xl font-bold">{job.title}</h2>
        <h2 className="text-2xl font-bold">${job.weekly_pay}</h2>
      </div>
      <p className="text-lg text-gray-600 mb-2">{job.category}</p>
      <div className="flex items-center">
        <FaMapMarkerAlt className="mr-2 mb-2" />
        <p className="text-gray-600 mb-2">{job.location}</p>
      </div>

      <div className='flex flex-col md:flex-row md:space-x-4 '>
        <button className="flex justify-center items-center w-60 h-10 px-4 py-2 text-white rounded-md bg-primary-light hover:bg-primary mt-2">
          Book
        </button>
        <button className="flex justify-center items-center w-12 h-10 px-1 py-1 text-white rounded-md bg-accent hover:bg-primary mt-2">
          <FaComments />
        </button>
      </div>

      <hr className="border-t border-gray-300 my-4" />
      <div className="flex space-x-2">
        <DayCircle day='M' active={job.M} />
        <DayCircle day='T' active={job.T} />
        <DayCircle day='W' active={job.W} />
        <DayCircle day='Th' active={job.Th} />
        <DayCircle day='F' active={job.F} />
        <DayCircle day='St' active={job.St} />
        <DayCircle day='Sn' active={job.Sn} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center">
          <FaRegCalendarAlt className="mr-2" />
          <p>Start Date: {job.startDate}</p>
        </div>
        <div className="flex items-center">
          <FaRegCalendarAlt className="mr-2" />
          <p>End Date: {job.endDate}</p>
        </div>
        <div className="flex items-center">
          <FaRegClock className="mr-2" />
          <p>Shift: {job.start} - {job.end} ({job.shiftHour} hours)</p>
        </div>
        <div className="flex items-center">
          <FaUsers className="mr-2" />
          <p>Patient Number: {job.patient_number}</p>
        </div>

        <div className="flex items-center">
          <FaUsers className="mr-2" />
          <p>Patient Population: {job.patient_population}</p>
        </div>
      </div>

      <hr className="border-t border-gray-300 my-6" />
      <h2 className="text-xl font-bold ">Compensation</h2>
      <div className="flex items-center mb-4">
        <p>Stipend: {job.stipend}</p>
      </div>
      <div className="flex items-center  mb-4">
        <p>Weekly Pay: {job.weekly_pay}</p>
      </div>
      <div className="flex items-center  mb-4">
        <p>Bonus: {job.bonus}</p>
      </div>
      <div className="flex items-center">
        <FaPersonBooth className="mr-2" />
        <p>{job.contact_person}</p>
      </div>

      <div className="flex items-center">
        <FaEnvelope className="mr-2" />
        <p>{job.contact_email}</p>
      </div>

      <div className="flex items-center">
        <FaParking className="mr-2" />
        <p>{job.parkingFree ? 'Free Parking' : 'No Free Parking'}</p>
      </div>







      {/* <div className="flex items-center space-x-2">
            <FaInfoCircle />
            <span>{job.additionalDetails}</span>
        </div> */}




    </div>

  );
};

const DayCircle: React.FC<DayCircleProps> = ({ day, active }) => (
  <div className={`w-6 h-6 mb-5 rounded-full flex justify-center items-center text-white ${active ? 'bg-primary-light' : 'bg-gray-500'}`}>
    {day}
  </div>
);

export default JobDetail;
