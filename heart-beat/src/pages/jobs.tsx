import Nav from '../components/nav';
import Filter from '../components/filterJobs';
import Footer from '../components/footer';
import React, { use, useState, useEffect } from 'react';
import JobDetail from '../components/jobDetail';
import JobList from '../components/jobList';
import { Job as JobType } from '../utils/types.js';
import { generateJobs } from '../utils/seedJobs';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
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

export default function Jobs({ jobs }: { jobs: JobType[] }) {

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
  const [patientNum, setPatientNum] = useState(100);
  const [weeklyPay, setWeeklyPay] = useState(1000);
  const [days, setDays] = useState(daysObj);
  const [startHour, setStartHour] = useState(0)
  const [endHour, setEndHour] = useState(23.59)
  const [dates, setDates] = useState(new Date())
  const [postal, setPostal] = useState(0) //later default using the nurse profile (redux)
  const [filteredJobs, setFilteredJobs] = useState([]); // use dummy data for now. should fetch data from the server


  // const [jobs, setJobs] = useState<JobType[]>([]);

  const [selectedJob, setSelectedJob] = useState<JobType>(jobs[0]); //default job selected


  const handleJobClick = (job: JobType) => {
    setSelectedJob(job); //update selectedJob state when job entry is clicked
  }

  let filterPass = {
    distance, setDistance,
    category, setCategory,
    patientNum, setPatientNum,
    weeklyPay, setWeeklyPay,
    days, setDays,
    startHour, setStartHour,
    endHour, setEndHour,
    dates, setDates,
    postal, setPostal
  }

  // useEffect(() => {
  //   const jobData = generateJobs(10);
  //   setJobs(jobData);
  //   setSelectedJob(jobData[0])
  //   // Now do something with 'jobs'
  // }, []);

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

export async function getServerSideProps() {
  // Fetch data from  API
  const { data } = await client.query<{ jobs: JobType[]}>({query: JobQuery})

  // Pass data to the page via props
  return { props: { jobs: data.jobs } }
}