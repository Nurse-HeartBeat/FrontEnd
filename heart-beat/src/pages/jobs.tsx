import Nav from '../components/nav';
import Filter from '../components/filterJobs';
import Footer from '../components/footer';
import React, {useState} from 'react';


export default function Jobs () {
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
      <Filter filterPass={filterPass}/>
      Jobs Placeholder
    </div>
  )
}