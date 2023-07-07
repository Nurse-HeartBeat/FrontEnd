import Nav from '../../components/nav';
import Footer from '../../components/footer';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Router, useRouter } from 'next/router';
import { Job } from '../../utils/types';
import RadioBut from '../../components/radioBut';
import LoadingPage from '../../components/loadingPage';
import { selectionSetMatchesResult } from '@apollo/client/cache/inmemory/helpers';
import store, { RootState } from '../../redux/store'
import axios from 'axios';
import { postal as axiosPostal } from '../../utils/postalLatLon';
import { CREATE_JOB, client } from '../../utils/graphQL';

// Define the type
type GraphQLErrorType = {
  message: string;
  locations: string;
  path: string;
};


export default function AddJobs({ userState }: { userState: any }) {

  let router = useRouter();
  const [submitSuccess, setSubmitSuccess] = useState(false);


  useEffect(() => {
    if (!userState.employer) {
      const redirectRoute = '/jobs';
      router.push(redirectRoute);
      return
    }
    changeState('employer', userState.user.id)
  }, [])

  let now = new Date();
  let formattedDate = now.toISOString().slice(0, 10);

  const [job, setJob] = useState<Job>({
    category: 'Registered Nurse (RN)',
    yearRequired: null,
    title: '',
    employer: '',
    assignTo: null,
    approve: false,
    completed: false,
    address1: '',
    address2: '',
    city: '',
    state: '',
    postal: undefined,
    latitude: 0,
    longitude: 0,
    startDate: formattedDate,
    endDate: formattedDate,
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    Sunday: false,
    start: "12:00",
    end: "12:00",
    shiftHour: null,
    patientPopulation: 'Neonatal',
    patientNumber: 0,
    stipend: 0,
    weeklyPay: 0,
    bonus: 0,
    contactPerson: '',
    contactEmail: '',
    parkingFree: false,
    additionalDetails: '',
  });

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

  let changeState = (cat: string, value: any) => {
    setJob((prevState) => ({
      ...prevState,
      [cat]: value
    }))
  }

  let onSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    setLoading(!loading)
    const { assignTo, approve, completed, start: startTime, end: endTime, ...jobObject } = job;
    const finalJobObject = { ...jobObject, startTime, endTime };
    console.log('finaljob: ', finalJobObject);
    await client.mutate({
      mutation: CREATE_JOB,
      variables: finalJobObject,
      context: {
        credentials: 'include', // Add this line
      },
    })
      .then((data: any) => {
        console.log(data);
        setSubmitSuccess(true);
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

  useEffect(() => {
    if (loading) {
      //do a call
      //then set the loading to false
      console.log(job);
      setLoading(false)
    }
  }, [loading])

  return (
    <div>
      {loading ? (<LoadingPage />) : (
        <>
          <Nav />

          <div className="flex flex-col flex-grow items-center justify-items-center justify-center bg-white text-black pb-10 min-h-screen">
            {submitSuccess ? <p className='mt-20 bg-white text-black'>Job submitted successfully!</p> :
            <div className="flex lg:w-1/2">
              <form className="mx-auto lg:my-0 my-20 flex flex-col" onSubmit={onSubmit}>
                <div className='mt-5 flex mb-2 flex flex-col'>
                  <label htmlFor='category' className='mb-1'>Category:</label>
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
                  <label htmlFor='year_required' className='mb-1'>Years Required</label>
                  <input type='text' name='year_required'
                    value={job.yearRequired || ''}
                    onChange={(e) => {
                      const numericValue = e.target.value.replace(/\D/g, '').slice(0, 2);
                      changeState('yearRequired', Number(numericValue))
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 text-black" />
                </div>
                <div className='mt-5 flex mb-2 flex flex-col'>
                  <label htmlFor='title' className='mb-1'>Title
                    <input type='text' name='title' value={job.title} onChange={(e) => changeState('title', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 text-black" />
                  </label>
                </div>
                <div className='mt-5 flex mb-2 flex flex-col'>
                  <label htmlFor="address1" className="flex appearance-none block text-gray-700 text-black mb-1">Address</label>
                  <div className='flex flex-col md:flex-row space-y-1 md:space-y-0'>
                    <input
                      required={true}
                      type="text"
                      id="address1"
                      value={job.address1}
                      onChange={(e) => {
                        changeState('address1', e.target.value)
                      }}
                      className="mr-2 flex w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 text-black"
                      placeholder="Address 1" />
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
                <div className='flex justify-between flex-col md:flex-row space-y-1 md:space-y-0'>
                  <label htmlFor="city" className="appearance-none block text-gray-700 text-white">
                    <input
                      required={true}
                      type="text"
                      id="city"
                      value={job.city}
                      onChange={(e) => {
                        changeState('city', e.target.value)
                      }}
                      className="mr-2 flex w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 text-black"
                      placeholder="City" />
                  </label>
                  <label htmlFor="state" className="appearance-none block text-gray-700 text-white">
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
                      value={job.postal || ''}
                      onChange={async (e) => {
                        const numericValue = e.target.value.replace(/\D/g, '').slice(0, 5);
                        changeState('postal', Number(numericValue))
                        if (e.target.value.length === 5) {
                          let options: { method: string, url: string, headers: any } = axiosPostal(Number(numericValue))
                          await axios.request(options)
                            .then((response) => {
                              console.log(response.data)
                              changeState('state', response.data.places[0]['state abbreviation'])
                              changeState('city', response.data.places[0]['place name'])
                              changeState('latitude', Number(response.data.places[0]['latitude']))
                              changeState('longitude', Number(response.data.places[0]['longitude']))
                            })
                            .catch((err) => {
                              window.alert('Invalid Postal')
                            })
                        }
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 text-black"
                      placeholder="Postal Code"
                    />
                  </label>
                </div>
                <div className='mt-5 flex mb-2 flex flex-col px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 hover:cursor-pointer'>
                  <label htmlFor='days'>Select Days</label>
                  <div className='flex flex-col md:flex-row mt-2 '>
                    {days.map((day, index) =>
                      <div key={index} className='flex size-auto mr-3 my-1'>
                        <input type='checkbox' checked={job[day]} onChange={() => changeState(day, !job[day])}
                          className='mr-0.5 hover:cursor-pointer' />
                        <span onClick={() => changeState(day, !job[day])}>{day}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className='mt-5 flex mb-5 flex flex-col px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500'>
                  <label className='mb-3'>Select Hours</label>
                  <div className='flex flex-col md:flex-row md:justify-between'>
                    <div className='flex flex-col'>
                      <label>Start:</label>
                      <div className='flex flex-row'>
                        <input type='time' value={job.start}
                          onChange={(e) => { changeState('start', e.target.value) }}
                          className='px-4 py-2 border border-gray-300 rounded-md  flex' />
                      </div>
                    </div>
                    <div className='flex flex-col'>
                      <label>End:</label>
                      <div className='flex flex-row'>
                        <input type='time' value={job.end}
                          onChange={(e) => { changeState('end', e.target.value) }}
                          className='px-4 py-2 border border-gray-300 rounded-md flex' />
                      </div>
                    </div>
                    <div className='flex flex-col'>
                      <label>Shift Hours:</label>
                      <div className='flex flex-row'>
                        <input required={true} type='text' value={job.shiftHour || ''}
                          onChange={(e) => {
                            const numericValue = e.target.value.replace(/\D/g, '').slice(0, 2);
                            changeState('shiftHour', Number(numericValue))
                          }}
                          className='px-4 py-2 border border-gray-300 rounded-md flex' />
                      </div>
                    </div>
                  </div>
                </div>
                <div className='mt-5 flex mb-5 flex flex-col md:flex-row px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500'>
                  <div className='flex my-4 mr-5'>
                    <label htmlFor="date" className='py-2'>Start Date:</label>
                    <input type="date" id="date" name="date" value={job.startDate} min="2023-01-01" max={String(Number(formattedDate.slice(0, 4)) + 1) + formattedDate.slice(4)} onChange={(e) => changeState('startDate', e.target.value)} className='bg-slate-200 px-4 mx-2 rounded-md py-2' />
                  </div>
                  <div className='flex my-4'>
                    <label htmlFor="date" className='py-2'>End Date:</label>
                    <input type="date" id="date" name="date" value={job.endDate} min={job.startDate} max={String(Number(formattedDate.slice(0, 4)) + 1) + formattedDate.slice(4)} onChange={(e) => changeState('endDate', e.target.value)} className='bg-slate-200 px-4 mx-2 rounded-md py-2' />
                  </div>
                </div>

                <div className='my-5 flex flex-col md:flex-row px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500'>
                  <div className='flex my-3'>
                    <label className='w-26 py-1'>Patient Number: </label>
                    <input required={true} type='number' onChange={(e) => changeState('patientNumber', Number(e.target.value))}
                      className='flex ml-2 mr-5 py-1 w-24 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500' />
                  </div>
                  <div className='flex flex-row my-3'>
                    <label className='w-36 py-1'>Patient Population:</label>
                    <select id='dropdown' name='patientPopulation' value={job.patientPopulation} onChange={(e) => changeState('patientPopulation', e.target.value)}
                      className="py-1 w-36 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 text-black">
                      {patientPopulations.map((patient, index) => {
                        return (
                          <option value={patient} key={index}>{patient}</option>
                        )
                      })}
                    </select>
                  </div>
                </div>

                <div className='mt-5 mb-5 flex flex-col md:flex-row justify-between gap-5'>
                  {/* for weekly_pay */}
                  <div className='flex flex-col'>
                    <label className='mb-1'>Weekly-pay $</label>
                    <input required={true} type='number' onChange={(e) => changeState('weeklyPay', Number(e.target.value))}
                      className='p-1 border border-gray-300 w-36 rounded-md focus:outline-none focus:ring focus:ring-blue-500' />
                  </div>
                  {/* stipend */}
                  <div className='flex flex-col'>
                    <label className='mb-1'>Stipend $</label>
                    <input type='number' onChange={(e) => changeState('stipend', Number(e.target.value))}
                      className='p-1 border border-gray-300 w-36 rounded-md focus:outline-none focus:ring focus:ring-blue-500' />
                  </div>
                  {/* bonus */}
                  <div className='flex flex-col'>
                    <label className='mb-1'>Bonus $</label>
                    <input type='number' onChange={(e) => changeState('bonus', Number(e.target.value))}
                      className='p-1 border border-gray-300 w-36 rounded-md focus:outline-none focus:ring focus:ring-blue-500' />
                  </div>
                </div>

                <div className='mt-5 flex mb-5 flex flex-col px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500'>
                  <div className='flex flex-row'>
                    <h1 className="flex text-text flex-row">Free Parking?</h1>
                    <RadioBut checked={job.parkingFree} onChange={() => changeState('parkingFree', !job.parkingFree)} label={''} />
                  </div>
                  <div className='flex flex-row mt-2'>
                    <label className="flex-shrink-0 w-24">Contact Person:</label>
                    <input required={true} type='text' value={job.contactPerson} onChange={(e) => changeState('contactPerson', e.target.value)}
                      className='flex-grow border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 ml-3' />
                  </div>
                  <div className='flex flex-row mt-2'>
                    <label className="flex-shrink-0 w-24">Email:</label>
                    <input required={true} type='email' value={job.contactEmail} onChange={(e) => changeState('contactEmail', e.target.value)}
                      className='flex-grow border p-2 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 ml-3' />
                  </div>
                  <div className='flex flex-row mt-2'>
                    <label className="flex-shrink-0 w-24">Additional Details:</label>
                    <textarea
                      value={job.additionalDetails}
                      onChange={(e) => changeState('additionalDetails', e.target.value)}
                      className='flex-grow border p-2 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 ml-3'
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
            </div>}


          </div>
          <Footer />
        </>
      )}
    </div>
  )
}

AddJobs.getInitialProps = async () => {
  // Fetch data from an API or perform any server-side operations
  const state: RootState = store.getState()
  const userState = state.user

  // Pass the fetched data as props to the page component
  return {
    userState
  };
}