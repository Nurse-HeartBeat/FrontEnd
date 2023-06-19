import Nav from '../../components/nav';
import Footer from '../../components/footer';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Router, useRouter } from 'next/router';

export default function AddJobs () {
  // let router = useRouter();
  // const reduxState = useSelector((state: any) => state.user);

  // useEffect(() => {
  //   if(!reduxState.user || !reduxState.user.employer) {
  //     const redirectRoute = '/jobs';
  //     router.push(redirectRoute);
  //   }
  // }, [reduxState, router])
  const [job, setJob] = useState({
    category: '',
    year_required:0,
    title: '',
    address1: '',
    address2:'',
    city:'',
    state:'',
    postal:'',
    latitude:'',
    longitude:'',
    startDate: '',
    endDate:'',
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday:false,
    Sunday:false,
    start:'',
    end:'',
    shiftHour:'',
    patient_population: '',
    patient_number:0,
    stipend:'',
    weekly_pay:'',
    bonus:'',
    contact_person:'',
    contact_email:'',
    parkingFree: false,
    additionalDetails: ''
  })

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

  let changeState = (cat:string, value:any) => {
    setJob((prevState) => ({
      ...prevState,
      [cat]: value
    }))
  }

  return (
    <div>
      <Nav />
      <form>
        <div>
          <label htmlFor='category'>Category:</label>
          <select id='dropdown' name='category' value={job.category} onChange={(e) => changeState('category', e.target.value)}
          className='flex text-black'>
            {category.map((cat, index) => {
              return (
                <option value={cat} key={index}>{cat}</option>
              )
            })}
          </select>
        </div>
        <div>
          <label htmlFor='year_required'>year required</label>
          <input type='number' name='year_required' value={job.year_required} onChange={(e) => changeState('year_required', Number(e.target.value))}
          className='text-black'/>
        </div>
        <div>
          <label htmlFor='title'>title</label>
          <input type='text' name='title' value={job.title} onChange={(e) => changeState('title', e.target.value)}
          className='text-black'/>
        </div>
      </form>
      <Footer />
    </div>
  )
}