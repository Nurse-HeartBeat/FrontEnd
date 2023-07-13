import Nav from '../components/nav';
import Filter from '../components/filterJobs';
import Footer from '../components/footer';
import React, { use, useState, useEffect } from 'react';
import JobDetail from '../components/jobDetail';
import JobList from '../components/jobList';
import { FilterPassTypes, Job as JobType, SetCategoryType, SetPatientPopType } from '../utils/types.js';
import { generateJobs } from '../utils/seedJobs';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import {QUERY_AllJOB, QUERY_JOB} from '../utils/graphQL'
// Set up Apollo Client
// const client = new ApolloClient({
//   uri: `${process.env.NEXT_PUBLIC_API_URL}/api/jobs_test`, // replace with your API endpoint
//   cache: new InMemoryCache(),
// });

const clientGraphQL = new ApolloClient({
  uri: `${process.env.NEXT_PUBLIC_GRAPHQL_URL}`, // replace with your API endpoint
  cache: new InMemoryCache(),
});

// { jobs }: { jobs: JobType[] }
export default function Jobs() {
  const [jobs, setJobs] = useState<JobType[]>([])

  //making client side rendering
  useEffect(() => {
    const fetchData = async () => {
      const response = await clientGraphQL.query({ query: QUERY_AllJOB });
      const jobs = response.data.allJobs.edges.map((edge: { node: JobType }) => edge.node);
      console.log('get all jobs when first rendered: ', jobs)
      setJobs(jobs);
      setSelectedJob(jobs[0]);
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
  const [category, setCategory] = useState<{ [key: string]: boolean }>({
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
  const categoryMapping: { [key: string]: string }  = {
    'Registered Nurse (RN)': 'registeredNurseRn',
    'Licensed Practical Nurse (LPN)': 'licensedPracticalNurseLpn',
    'Certified Nursing Assistant (CNA)': 'certifiedNursingAssistantCna',
    'Nurse Practitioner (NP)': 'nursePractitionerNp',
    'Pediatric Nurse': 'pediatricNurse',
    'Geriatric Nurse': 'geriatricNurse',
    'Critical Care Nurse': 'criticalCareNurse',
    'Emergency Room Nurse': 'emergencyRoomNurse',
    'Operating Room Nurse': 'operatingRoomNurse',
    'Neonatal Intensive Care Unit (NICU) Nurse': 'neonatalIntensiveCareUnitNicuNurse',
    'Obstetric Nurse': 'obstetricNurse',
    'Psychiatric Nurse': 'psychiatricNurse',
    'Oncology Nurse': 'oncologyNurse',
    'Rehabilitation Nurse': 'rehabilitationNurse',
    'Home Health Nurse': 'homeHealthNurse',
    'Intensive Care Unit (ICU) Nurse': 'intensiveCareUnitIcuNurse',
    'Surgical Nurse': 'surgicalNurse',
    'Cardiac Nurse': 'cardiacNurse',
    'Hospice Nurse': 'hospiceNurse',
    'Public Health Nurse': 'publicHealthNurse',
  };
  const [patientPop, setPatientPop] = useState<{ [key: string]: boolean }>({
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
  const patientPopMapping: { [key: string]: string } ={
    "Neonatal": 'neonatal',
    'Infant':'infant',
    'Toddler':'toddler',
    'Preschool':'preschool',
    'Pediatric':'pediatric',
    'Adolescent':'adolescent',
    'Young Adult':'young_adult',
    'Adult':'adult',
    'Geriatric':'geriatric'
  }
  const [patientNum, setPatientNum] = useState(100);
  const [weeklyPay, setWeeklyPay] = useState(1000);
  const [days, setDays] = useState(daysObj);
  const [startTime, setStartTime] = useState("00:00");
  const [endTime, setEndTime] = useState("23:59");
  // const [dates, setDates] = useState(new Date());

  let now = new Date();
  let formattedDate = now.toISOString().slice(0, 10);
  const [startDate, setStartDate] = useState(formattedDate);
  const [endDate, setEndDate] = useState(formattedDate);

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
    const categoryInput: { [key: string]: boolean } = Object.keys(categoryMapping).reduce((input: { [key: string]: boolean }, categoryName) => {
      const categoryKey = categoryMapping[categoryName];
      input[categoryKey] = category[categoryName];
      return input;
    }, {});

    const patientPopInput: { [key: string]: boolean } = Object.keys(patientPopMapping).reduce((input: { [key: string]: boolean }, patientPopName) => {
      const patientPopKey = patientPopMapping[patientPopName];
      input[patientPopKey] = patientPop[patientPopName];
      return input;
    }, {});

    const fetchData = async () => {
      let variables = {
        category: categoryInput,
        patientPop: patientPopInput,
        days, patientNum, weeklyPay, startDate, endDate, startTime, endTime, latitude, longitude, distance
      }
      const { data } = await clientGraphQL.query<{ jobs: JobType[]}>({query: QUERY_JOB, variables})
      try {
        console.log(data)
      }
      catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }


  let filterPass: FilterPassTypes = {
    distance, setDistance,
    category, setCategory: setCategory as unknown as SetCategoryType,
    patientNum, setPatientNum,
    patientPop, setPatientPop: setPatientPop as unknown as SetPatientPopType,
    weeklyPay, setWeeklyPay,
    days, setDays,
    startTime, setStartTime,
    endTime, setEndTime,
    // dates, setDates,
    startDate, setStartDate,
    endDate, setEndDate,
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