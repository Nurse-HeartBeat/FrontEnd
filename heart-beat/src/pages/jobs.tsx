import Nav from '../components/nav';
import Filter from '../components/filterJobs';
import Footer from '../components/footer';
import React, { useState } from 'react';
import JobDetail from '../components/jobDetail';
import JobList from '../components/jobList';
import { Job as JobType } from '../components/types.js';

import { jobs } from '../components/data';


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
  const [category, setCategory] = useState(null);
  const [patientNum, setPatientNum] = useState(100);
  const [weeklyPay, setWeeklyPay] = useState(3000);
  const [days, setDays] = useState(daysObj);
  const [startHour, setStartHour] = useState(0)
  const [endHour, setEndHour] = useState(23.59)
  const [dates, setDates] = useState(new Date())
  const [filteredJobs, setFilteredJobs] = useState(jobs); // use dummy data for now. should fetch data from the server


  const [selectedJob, setSelectedJob] = useState(jobs[0]); //default job selected
  const [selectedJobID, setSelectedJobID] = useState(jobs[0].id); //default job selected


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
    dates, setDates
  }
  return (
    <div className='bg-white flex-col min-h-screen'>
      <Nav />
      <Filter filterPass={filterPass} />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-0'>
      <JobList jobs={jobs} onJobClick={handleJobClick} selectedJob={selectedJob}/>
        <div className="hidden md:block">
          {selectedJob && <JobDetail job={selectedJob} />}
        </div>
      </div>
    </div>
  )
}