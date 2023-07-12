import Nav from '../components/nav';
import Filter from '../components/filterJobs';
import Footer from '../components/footer';
import React, { use, useState, useEffect } from 'react';
import JobDetail from '../components/jobDetail';
import JobList from '../components/jobList';
import { FilterPassTypes, Job as JobType } from '../utils/types.js';
import { generateJobs } from '../utils/seedJobs';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import axios from 'axios';
import { postal as axiosPostal } from '../utils/postalLatLon';
// Set up Apollo Client
const client = new ApolloClient({
  uri: `${process.env.NEXT_PUBLIC_API_URL}/api/jobs_test`, // replace with your API endpoint
  cache: new InMemoryCache(),
});

const JobQuery = gql`
query GetJobs {
  jobs {
    id
    category
    year_required
    title
    employer
    assignTo
    approve
    completed
    address1
    address2
    city
    state
    postal
    latitude
    longitude
    startDate
    endDate
    Monday
    Tuesday
    Wednesday
    Thursday
    Friday
    Saturday
    Sunday
    start
    end
    shiftHour
    patient_population
    patient_number
    stipend
    weekly_pay
    bonus
    contact_person
    contact_email
    parkingFree
    additionalDetails
  }
}`
// { jobs }: { jobs: JobType[] }
export default function Jobs() {
  const [jobs, setJobs] = useState<JobType[]>([])

  //making client side rendering
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await client.query<{ jobs: JobType[]}>({query: JobQuery})
      setJobs(data.jobs)
      setSelectedJob(data.jobs[0])
    }
    fetchData()
  }, [])


  let daysObj = {
    Monday: true,
    Tuesday: true,
    Wednesday: true,
    Thursday: true,
    Friday: true,
    Saturday: true,
    Sunday: true
  }
  const [distance, setDistance] = useState(25);
  const [category, setCategory] = useState({
    'Registered Nurse (RN)': true,
    'Licensed Practical Nurse (LPN)': true,
    'Certified Nursing Assistant (CNA)': true,
    'Nurse Practitioner (NP)': true,
    'Pediatric Nurse': true,
    'Geriatric Nurse': true,
    'Critical Care Nurse': true,
    'Emergency Room Nurse': true,
    'Operating Room Nurse': true,
    'Neonatal Intensive Care Unit (NICU) Nurse': true,
    'Obstetric Nurse': true,
    'Psychiatric Nurse': true,
    'Oncology Nurse': true,
    'Rehabilitation Nurse': true,
    'Home Health Nurse': true,
    'Intensive Care Unit (ICU) Nurse': true,
    'Surgical Nurse': true,
    'Cardiac Nurse': true,
    'Hospice Nurse': true,
    'Public Health Nurse': true
  });
  const [patientPop, setPatientPop] = useState({
      "Neonatal": true, // 0 - 28 days
      "Infant": true, // 1 month - 1 year
      "Toddler": true, // 1 - 3 years
      "Preschool": true, // 3 - 5 years
      "Pediatric": true, // 6 - 12 years
      "Adolescent": true, // 13 - 18 years
      "Young Adult": true, // 19 - 24 years
      "Adult": true, // 25 - 64 years
      "Geriatric": true, // 65 years and above
  })
  const [patientNum, setPatientNum] = useState(100);
  const [weeklyPay, setWeeklyPay] = useState(1000);
  const [days, setDays] = useState(daysObj);
  const [startHour, setStartHour] = useState(0);
  const [endHour, setEndHour] = useState(23.59);
  const [dates, setDates] = useState(new Date('2023-06-15'));
  const [longitude, setLongitude] = useState<number | null>(null);;
  const [latitude, setLatitude] = useState<number | null>(null);;
  const [postal, setPostal] = useState<number | null>(null); //later default using the nurse profile (redux)
  const [filteredJobs, setFilteredJobs] = useState([]); // use dummy data for now. should fetch data from the server


  // const [jobs, setJobs] = useState<JobType[]>([]);

  const [selectedJob, setSelectedJob] = useState<JobType>(); //default job selected


  const handleJobClick = (job: JobType) => {
    setSelectedJob(job); //update selectedJob state when job entry is clicked
  }

  const applyFilter = async () => {
    console.log(latitude, distance, 'here it is')
  }

  let filterPass: FilterPassTypes = {
    distance, setDistance,
    category, setCategory,
    patientNum, setPatientNum,
    patientPop, setPatientPop,
    weeklyPay, setWeeklyPay,
    days, setDays,
    startHour, setStartHour,
    endHour, setEndHour,
    dates, setDates,
    postal, setPostal,
    applyFilter,
    setLatitude, setLongitude
  }


  return (

    <div className='bg-white flex-col min-h-screen'>
      <Nav />
      <Filter FilterPass={filterPass} />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-0 md:mx-5'>
        <div className='max-h-[800px] overflow-auto'>
          <JobList jobs={jobs} onJobClick={handleJobClick} selectedJob={selectedJob} />
        </div>
        <div className='hidden md:block '>
          {selectedJob && <JobDetail job={selectedJob} />}
        </div>
      </div>
      <Footer />
    </div>
  )
}

// export async function getServerSideProps() {
//   // Fetch data from  API
//   const { data } = await client.query<{ jobs: JobType[]}>({query: JobQuery})

//   // Pass data to the page via props
//   return { props: { jobs: data.jobs } }

// }