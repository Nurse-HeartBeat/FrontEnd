import Nav from '../components/nav';
import Filter from '../components/filterJobs';
import Footer from '../components/footer';
import React, { use, useState, useEffect } from 'react';
import JobDetail from '../components/jobDetail';
import JobList from '../components/jobList';
import { Job as JobType } from '../components/types.js';
import { generateJobs } from '../utils/seedJobs';


export default function Jobs() {


  let daysObj = {
    M: true,
    T: true,
    W: true,
    Th: true,
    F: true,
    St: true,
    Sn: true
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
  const [weeklyPay, setWeeklyPay] = useState(3000);
  const [days, setDays] = useState(daysObj);
  const [startHour, setStartHour] = useState(0)
  const [endHour, setEndHour] = useState(23.59)
  const [dates, setDates] = useState(new Date())
  const [postal, setPostal] = useState(0) //later default using the nurse profile (redux)
  const [filteredJobs, setFilteredJobs] = useState([]); // use dummy data for now. should fetch data from the server


  const [jobs, setJobs] = useState<JobType[]>([]);

  const [selectedJob, setSelectedJob] = useState<JobType>(); //default job selected


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

  useEffect(() => {
    const jobData = generateJobs(10);
    setJobs(jobData);
    setSelectedJob(jobData[0])
    // Now do something with 'jobs'
  }, []);

  return (
    <div className='bg-white flex-col min-h-screen'>
      <Nav />
      <Filter FilterPass={filterPass} />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-0'>
      <JobList jobs={jobs} onJobClick={handleJobClick} selectedJob={selectedJob}/>
        <div className="hidden md:block">
          {selectedJob && <JobDetail job={selectedJob} />}
        </div>
      </div>
      <Footer />
    </div>
  )
}