import Nav from '../../components/nav';
import Footer from '../../components/footer';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Router, useRouter } from 'next/router';
import {Job} from '../../utils/types';
import RadioBut from '../../components/radioBut';
import LoadingPage from '../../components/loadingPage';
import { selectionSetMatchesResult } from '@apollo/client/cache/inmemory/helpers';

export default function AddJobs () {
  // let router = useRouter();
  // const reduxState = useSelector((state: any) => state.user);

  // useEffect(() => {
  //   if(!reduxState.user || !reduxState.user.employer) {
  //     const redirectRoute = '/jobs';
  //     router.push(redirectRoute);
  //   }
  // }, [reduxState, router])
  const [job, setJob] = useState<Job>({
    id: '',
    category: '',
    year_required: 0,
    title: '',
    employer: '',
    assignTo: undefined,
    approve: false,
    completed: false,
    address1: '',
    address2: '',
    city: '',
    state: '',
    postal: '',
    latitude: 0,
    longitude: 0,
    startDate: new Date(),
    endDate: new Date(),
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    Sunday: false,
    start: '',
    end: '',
    shiftHour: 0,
    patient_population: 'Neonatal',
    patient_number: 0,
    stipend: 0,
    weekly_pay: 0,
    bonus: 0,
    contact_person: '',
    contact_email: '',
    parkingFree: false,
    additionalDetails: '',
  });

  let now = new Date();
  let formattedDate = now.toISOString().slice(0, 10);
  const [startDate, setStartDate] = useState(formattedDate);
  const [endDate, setEndDate] = useState(formattedDate);
  const [startHour, setStartHour] = useState(0);
  const [startMin, setStartMin] = useState(0);
  const [startM, setStartM] = useState('AM');
  const [endHour, setEndHour] = useState(11);
  const [endMin, setEndMin] = useState(59);
  const [endM, setEndM] = useState('PM');

  const [loading, setLoading] = useState(false);

  let category = ['Registered Nurse (RN)',
  'Licensed Practical Nurse (LPN)',
  'Certified Nursing Assistant (CNA)',
  'Nurse Practitioner (NP)',
  'Pediatric Nurse',
  'Geriatric Nurse',
  'Critical Care Nurse',
  'Emergency Room Nurse',
  'Operating Room Nurse',
  'Neonatal Intensive Care Unit (NICU) Nurse',
  'Obstetric Nurse',
  'Psychiatric Nurse',
  'Oncology Nurse',
  'Rehabilitation Nurse',
  'Home Health Nurse',
  'Intensive Care Unit (ICU) Nurse',
  'Surgical Nurse',
  'Cardiac Nurse',
  'Hospice Nurse',
  'Public Health Nurse']

  let patientPopulations = [
    "Neonatal", // 0 - 28 days
    "Infant", // 1 month - 1 year
    "Toddler", // 1 - 3 years
    "Preschool", // 3 - 5 years
    "Pediatric", // 6 - 12 years
    "Adolescent", // 13 - 18 years
    "Young Adult", // 19 - 24 years
    "Adult", // 25 - 64 years
    "Geriatric" // 65 years and above
];


  let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  let changeState = (cat:string, value:any) => {
    setJob((prevState) => ({
      ...prevState,
      [cat]: value
    }))
  }

  let onSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    setLoading(!loading)
    setTimeout(()=>setLoading(false), 3000)
  }

  return (
    <div>
      {loading ? ( <LoadingPage/>) : (
      <>
    <Nav />
    <div className="flex lg:flex-row flex-col flex-grow items-center justify-items-center bg-white text-black">
      <div className="flex lg:w-1/2">
        <form className="mx-auto lg:my-0 my-20 flex flex-col" onSubmit={onSubmit}>
          <div className='mt-5 flex mb-2 flex flex-col'>
            <label htmlFor='category'>Category:</label>
            <select id='dropdown' name='category' value={job.category} onChange={(e) => changeState('category', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 text-black">
                {category.map((cat, index) => {
                  return (
                    <option value={cat} key={index}>{cat}</option>
                  )
                })}
              </select>
            </div>
            <div className='mt-5 flex mb-2 flex flex-col'>
              <label htmlFor='year_required'>Years Required</label>
              <input type='number' name='year_required' value={job.year_required} onChange={(e) => changeState('year_required', Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 text-black"/>
          </div>
          <div className='mt-5 flex mb-2 flex flex-col'>
            <label htmlFor='title'>Title
              <input type='text' name='title' value={job.title} onChange={(e) => changeState('title', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 text-black"/>
            </label>
          </div>
          <div className='mt-5 flex mb-2 flex flex-col'>
              <label htmlFor="address1" className="flex appearance-none block text-gray-700 text-black">Address</label>
              <div className='flex'>
                <input
                  required={true}
                  type="text"
                  id="address1"
                  value={job.address1}
                  onChange={(e) => {
                    changeState('address1', e.target.value)
                  }}
                  className="mr-2 flex w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 text-black"
                  placeholder="Address 1"/>
                <input
                  type="text"
                  id="address2"
                  value={job.address2}
                  onChange={(e) => {
                    changeState('address2', e.target.value)
                  }}
                  className=" flex w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 text-black"
                  placeholder="Address 2"
                />
              </div>
            </div>
            <div className='flex justify-between'>
              <label htmlFor="city" className="block text-gray-700 text-white mr-2">
                <input
                  required={true}
                  type="text"
                  id="city"
                  value={job.city}
                  onChange={(e) => {
                    changeState('city', e.target.value)
                  }}
                  className="w-full px-4
                   py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 text-black"
                  placeholder="City"/>
              </label>
              <label htmlFor="state" className="block text-gray-700 text-white mr-2">
                <input
                  required={true}
                  type="text"
                  id="state"
                  value={job.state}
                  onChange={(e) => {
                    changeState('state', e.target.value)
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 text-black"
                  placeholder="State"
                />
              </label>
              <label htmlFor="postal" className="appearance-none block text-gray-700 text-white">
                <input
                  required={true}
                  type="text"
                  id="postal"
                  value={job.postal}
                  onChange={(e) => {
                    const numericValue = e.target.value.replace(/\D/g, '')
                    changeState('postal', numericValue)
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 text-black"
                  placeholder="Postal Code"
                />
              </label>
            </div>
            <div className='mt-5 flex mb-2 flex flex-col px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 hover:cursor-pointer'>
              <label htmlFor='days'>Select Days</label>
              <div className='flex flex-row mt-2'>
                {days.map((day, index) =>
                    <div key={index} className='flex size-auto mr-3'>
                      <input type='checkbox' checked={job[day]} onChange={() => changeState(day, !job[day])}
                      className='mr-0.5 hover:cursor-pointer'/>
                      <span onClick={() => changeState(day, !job[day])}>{day}</span>
                    </div>
                  )}
              </div>
            </div>
            <div className='mt-5 flex mb-5 flex flex-col px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500'>
              <label className='mb-3'>Select Hours</label>
              <div className='flex flex-col'>
                <label>Start:</label>
                <div className='flex flex-row'>
                  <label htmlFor="hours">Hour:</label><br />
                    <input type="number" id="hours" name="hours" min="1" max="12" value={startHour} onChange={(e) => setStartHour(Number(e.target.value))} className='bg-slate-200 px-1 mx-2' /><br />
                    <label htmlFor="minutes">Minutes:</label><br />
                    <input type="number" id="minutes" name="minutes" min="0" max="59" value={startMin} onChange={(e) => setStartMin(Number(e.target.value))} className='bg-slate-200 px-1 mx-2' /><br />
                    <select id="ampm" name="ampm" className='ml-1 bg-slate-200' value={startM} onChange={(e) => setStartM(e.target.value)}>
                      <option value="AM">AM</option>
                      <option value="PM">PM</option>
                    </select>
                </div>
              </div>
              <div className='flex flex-col mt-5 mb-2'>
                <label>End:</label>
                <div className='flex flex-row'>
                  <label htmlFor="hours">Hour:</label><br />
                    <input type="number" id="hours" name="hours" min="1" max="12" value={endHour} onChange={(e) => setEndHour(Number(e.target.value))} className='bg-slate-200 px-1 mx-2' /><br />
                    <label htmlFor="minutes">Minutes:</label><br />
                    <input type="number" id="minutes" name="minutes" min="0" max="59" value={endMin} onChange={(e) => setEndMin(Number(e.target.value))} className='bg-slate-200 px-1 mx-2' /><br />
                    <select id="ampm" name="ampm" className='ml-1 bg-slate-200' value={endM} onChange={(e) => setEndM(e.target.value)}>
                      <option value="AM">AM</option>
                      <option value="PM">PM</option>
                    </select>
                </div>
              </div>
            </div>
            <div className='mt-5 flex mb-5 flex flex-row px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500'>
                <div className='flex my-4 mr-5'>
                  <label htmlFor="date">Start Date:</label>
                  <input type="date" id="date" name="date" value={startDate} min="2023-01-01" max={String(Number(formattedDate.slice(0, 4)) + 1) + formattedDate.slice(4)} onChange={(e) => setStartDate(e.target.value)} className='bg-slate-200 px-1 mx-2' />
                </div>
                <div className='flex my-4'>
                  <label htmlFor="date">End Date:</label>
                  <input type="date" id="date" name="date" value={endDate} min={startDate} max={String(Number(formattedDate.slice(0, 4)) + 1) + formattedDate.slice(4)} onChange={(e) => setEndDate(e.target.value)} className='bg-slate-200 px-1 mx-2' />
                </div>
              </div>
              <div className='mt-5 flex mb-5 flex flex-col px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500'>
                <div className='flex my-5'>
                  <label>Patient Number: </label>
                  <input required={true} type='number' onChange={(e) => changeState('patient_number', Number(e.target.value))}
                  className='flex ml-3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500'/>
                </div>
                <div className='flex my-4 flex-row'>
                  <label>Patient Population:</label>
                  <select id='dropdown' name='patientPopulation' value={job.patient_population} onChange={(e) => changeState('patient_population', e.target.value)}
                className="w-1/2 ml-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 text-black">
                  {patientPopulations.map((patient, index) => {
                    return (
                      <option value={patient} key={index}>{patient}</option>
                    )
                  })}
                  </select>
                </div>
              </div>
              <div className='mt-5 flex mb-5 flex flex-col px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500'>
                {/* for weekly_pay */}
                <div className='flex flex-row mb-1'>
                  <label>Weekly-pay $</label>
                  <input required={true} type='number' onChange={(e) => changeState('weekly_pay', Number(e.target.value))}
                  className='flex border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 ml-1'/>
                </div >
                {/* stipend */}
                <div className='flex flex-row mb-1'>
                  <label>Stipend $</label>
                  <input type='number' onChange={(e) => changeState('stipend', Number(e.target.value))}
                  className='flex border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 ml-1'/>
                </div>
                {/* bonus */}
                <div className='flex flex-row mb-1'>
                  <label>Bonus $</label>
                  <input type='number' onChange={(e) => changeState('bonus', Number(e.target.value))}
                  className='flex border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 ml-1'/>
                </div>
              </div>
              <div className='mt-5 flex mb-5 flex flex-col px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500'>
                <div className='flex flex-row'>
                  <h1 className="flex text-text flex-row">Free Parking?</h1>
                  <RadioBut checked={job.parkingFree} onChange={() => changeState('parkingFree', !job.parkingFree)} label={''} />
                </div>
                <div className='flex flex-row mt-2'>
                  <label>Contact Person: </label>
                  <input required={true} type='text' value={job.contact_person} onChange={(e) => changeState('contact_person', e.target.value)}
                  className='flex w-3/4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 ml-3'/>
                </div>
                <div className='flex flex-row mt-2'>
                  <label>Email: </label>
                    <input required={true} type='email' value={job.contact_email} onChange={(e) => changeState('contact_email', e.target.value)}
                    className='flex w-3/4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 ml-3'/>
                </div>
                <div className='flex flex-row mt-2'>
                  <label>Additional Details: </label>
                  <textarea
                    value={job.additional_details}
                    onChange={(e) => changeState('additional_details', e.target.value)}
                    className='flex w-3/4 l-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 ml-3'
                    rows={4}
                    placeholder='Enter additional details here...'
                  />
                </div>
              </div>
              <button
              type="submit"
              className="flex px-4 py-2 text-white rounded-md  bg-primary-light hover:bg-primary focus:outline-none focus:ring focus:ring-blue-500 mt-5 justify-center"
              >
              Submit
            </button>
        </form>
      </div>
    </div>
    <Footer />
      </>
      )}
  </div>
  )
}