import React, { useMemo, useState } from 'react';
import { Job } from '../utils/types.js';
import { FaComments, FaMapMarkerAlt, FaRegCalendarAlt, FaRegClock, FaUsers} from 'react-icons/fa';
import { FaUser, FaPersonBooth, FaEnvelope, FaParking, FaInfoCircle } from 'react-icons/fa';
import Tooltip from "./tooltip";
import { useSelector } from 'react-redux';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';
import ChatRoom from '../components/chatRoom';



interface JobDetailProps {
  job: Job;
  handleBook?: (job: Job) => void;
}
interface DayCircleProps {
  day: string;
  active: boolean;
}

const JobDetail: React.FC<JobDetailProps> = ({ job, handleBook }) => {
  const reduxUser = useSelector((state: any) => state.user);
  const [chat, setChat] = useState(false)
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLE_MAP}`
  })
  const center = useMemo(() => ({ lat: job.latitude, lng: job.longitude }), [job]);
  // console.log(job)
  return (
    <div className='my-10 sm:mr-5 sm:border sm:border-gray-300 text-black rounded-2xl'>
      <div className='px-4 sm:px-5 mb-6 sm:border-b sm:border-gray-300 my-4 shadow-lg'>
        <div className="flex flex-col md:flex-row justify-start items-start mb-2  md:space-x-0 md:space-y-0 space-y-4 md:justify-between">
          <a href={`/job/${job.id}`} className="text-blue-600 hover:text-blue-800 no-underline">
            <h2 className="text-2xl font-bold">{job.title}</h2>
          </a>
          <h2 className="text-2xl font-bold">${job.weeklyPay}</h2>
        </div>
        <h2 className="text-lg mb-2">
          <span className="mr-2 font-bold ">{job.employer?.companyName}</span>|<span className="ml-2">{job.category}</span>
        </h2>
        <div className="flex items-center">
          <FaMapMarkerAlt className="mr-2 mb-2" />
          <p className="text-gray-600 mb-2">{job.city}, {job.state}</p>
        </div>

        <div className='flex flex-col lg:flex-row gap-2 pb-5 relative'>
          <button
            className={`w-52 h-10 py-2 text-white rounded-md ${job.assignTo ? 'bg-gray-500 cursor-not-allowed' : 'bg-primary-light hover:bg-primary'}`}
            onClick={() => { if (handleBook) handleBook(job) }}
            disabled={!!job.assignTo} // disables the button if job is booked
          >
            {job.assignTo
              ? (reduxUser.user
                ? (job.assignTo.id === reduxUser.user.id
                  ? 'Your booking, pending'
                  : 'Booked by others')
                : 'Booked')
              : 'Book'}
          </button>
          <Tooltip text="Coming soon">
            <button className="w-36 h-10 py-2 text-white rounded-md bg-green-500 hover:bg-green-600">
              Mock with AI
            </button>
          </Tooltip>
          {reduxUser.employer === false ? (
            <button className="flex justify-center items-center w-12 h-10 py-1 text-white rounded-md bg-accent hover:bg-primary"
              onClick={() => {
                if (reduxUser.employer === false) {
                  setChat(true)
                }
              }}>
                <FaComments />
            </button>
          ): (
            <Tooltip text="Please log in as a nurse">
              <button className="flex justify-center items-center w-12 h-10 py-1 text-white rounded-md bg-accent hover:bg-primary">
                <FaComments />
              </button>
            </Tooltip>
          )
          }

        </div>
      </div>

      <div className='px-5 max-h-[500px] overflow-auto'>
        {!isLoaded ? (<div>Loading...</div>) :
          (<GoogleMap
            zoom={10}
            center={center}
            mapContainerClassName="w-full h-64"
          >
            <MarkerF position={center} />
          </GoogleMap>)}
        <hr className="border-t border-gray-300 my-6" />
        <div className="flex space-x-2">
          <DayCircle day='M' active={job.Monday} />
          <DayCircle day='T' active={job.Tuesday} />
          <DayCircle day='W' active={job.Wednesday} />
          <DayCircle day='Th' active={job.Thursday} />
          <DayCircle day='F' active={job.Friday} />
          <DayCircle day='St' active={job.Saturday} />
          <DayCircle day='Sn' active={job.Sunday} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center">
            <FaRegCalendarAlt className="mr-2" />
            <p>Start Date: {new Intl.DateTimeFormat('en-US').format(new Date(job.startDate))}</p>
          </div>
          <div className="flex items-center">
            <FaRegCalendarAlt className="mr-2" />
            <p>End Date: {new Intl.DateTimeFormat('en-US').format(new Date(job.endDate))}</p>
          </div>
          <div className="flex items-center">
            <FaRegClock className="mr-2" />
            <p>Shift: {job.startTime} - {job.endTime} ({job.shiftHour} hours)</p>
          </div>
          <div className="flex items-center">
            <FaUsers className="mr-2" />
            <p>Patient Number: {job.patientNumber}</p>
          </div>

          <div className="flex items-center">
            <FaPersonBooth className="mr-2" />
            <p>Population: {job.patientPopulation}</p>
          </div>
        </div>

        <hr className="border-t border-gray-300 my-6" />

        <h2 className="text-xl font-bold mb-4">Compensation</h2>
        <div className="flex items-center mb-4">
          <p>Stipend: {job.stipend}</p>
        </div>
        <div className="flex items-center  mb-4">
          <p>Weekly Pay: {job.weeklyPay}</p>
        </div>
        <div className="flex items-center  mb-4">
          <p>Bonus: {job.bonus}</p>
        </div>
        <hr className="border-t border-gray-300 my-6" />
        <h2 className="text-xl font-bold mb-4">Contact</h2>

        <div className="flex items-center mb-4">
          <FaUser className="mr-2" />
          <p>{job.contactPerson}</p>
        </div>

        <div className="flex items-center mb-4">
          <FaEnvelope className="mr-2" />
          <p>{job.contactEmail}</p>
        </div>
        <hr className="border-t border-gray-300 my-6" />
        <h2 className="text-xl font-bold mb-4">Additonal Information</h2>

        <div className="flex items-center mb-4">
          <FaParking className="mr-2" />
          <p>{job.parkingFree ? 'Free Parking' : 'No Free Parking'}</p>
        </div>
        <div className="flex items-start mb-4 px-5">
          {/* <FaInfoCircle className="mr-2 w-5" /> */}
          {job.additionalDetails?.split('\n').map((line, i) => (
            <React.Fragment key={i}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </div>
      </div>

      {chat && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={(e) => setChat(false)}>
          <div className="flex bg-white p-8 rounded-lg h-[75%] w-[50%] overflow-y-auto z-100"
          onClick={(e) => e.stopPropagation()}>
            <button onClick={(e) => setChat(false)} className='flex top-4 right-4 text-gray-600 hover:text-gray-800'> x </button>
            <ChatRoom id={job.employer?.id} />
          </div>
        </div>
      )}
    </div>
  );
};

const DayCircle: React.FC<DayCircleProps> = ({ day, active }) => (
  <div className={`w-6 h-6 mb-5 rounded-full flex justify-center items-center text-white ${active ? 'bg-primary-light' : 'bg-gray-500'}`}>
    {day}
  </div>
);

export default JobDetail;
