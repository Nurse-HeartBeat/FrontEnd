import React, { useMemo } from 'react';
import { Job } from '../utils/types.js';
import { FaComments, FaMapMarkerAlt, FaRegCalendarAlt, FaRegClock, FaUsers, FaDollarSign, FaCircle } from 'react-icons/fa';
import { FaUser, FaPersonBooth, FaEnvelope, FaParking, FaInfoCircle } from 'react-icons/fa';
import Image from 'next/image';
import Tooltip from "./tooltip";
import { useSelector } from 'react-redux';
import { UPDATE_BOOKJOB, client } from '../utils/graphQL'
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';

// Define the type
type GraphQLErrorType = {
  message: string;
  locations: string;
  path: string;
};

interface JobDetailProps {
  job: Job;
  update?: boolean;
  setUpdate?: (update: boolean) => void;
}
interface DayCircleProps {
  day: string;
  active: boolean;
}

const JobDetail: React.FC<JobDetailProps> = ({ job, update = false, setUpdate = () => { } }) => {
  const reduxUser = useSelector((state: any) => state.user);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLE_MAP}`
  })
  const center = useMemo(() => ({ lat: job.latitude, lng: job.longitude }), [job]);


  const handleBook = async () => {
    console.log('reduxUser: ', reduxUser.user)
    if (!reduxUser.user) {
      alert('Log in to book')
    } else {
      const id = job.id;
      const assignTo = reduxUser.user.id;
      await client.mutate({
        mutation: UPDATE_BOOKJOB,
        variables: { id, assignTo },
        context: {
          credentials: 'include', // Add this line
        },
      })
        .then((data: any) => {
          console.log('Update assign to: ', data);
          setUpdate(!update);
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

  }
  return (
    <div className='my-10 mr-5 border border-gray-300 text-black rounded-2xl'>
      <div className='px-5 mb-6 border-b border-gray-300 my-4 shadow-lg'>
        <div className="flex flex-col md:flex-row justify-start items-start mb-2  md:space-x-0 md:space-y-0 space-y-4 md:justify-between">
          <h2 className="text-2xl font-bold">{job.title}</h2>
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
            onClick={handleBook}
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
          <Tooltip text="Coming soon">
            <button className="flex justify-center items-center w-12 h-10 py-1 text-white rounded-md bg-accent hover:bg-primary">
              <FaComments />
            </button>
          </Tooltip>
        </div>
      </div>

      <div className='px-5 max-h-[500px] overflow-auto'>
        {/* <Image src='/mapPicHolder.png' alt="Map" className="" width={600} height={400} /> */}
        {/* HERE */}
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
    </div>

  );
};

const DayCircle: React.FC<DayCircleProps> = ({ day, active }) => (
  <div className={`w-6 h-6 mb-5 rounded-full flex justify-center items-center text-white ${active ? 'bg-primary-light' : 'bg-gray-500'}`}>
    {day}
  </div>
);

export default JobDetail;
