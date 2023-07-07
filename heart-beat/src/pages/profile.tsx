import React, { useState } from 'react';
import ProfileNurse from '../components/profileNurse';
import ProfileEmployer from '../components/profileEmployer';
import { useSelector } from 'react-redux';


export default function Jobs() {
  const reduxEmployer = useSelector((state: any) => state.user.employer)
  return <ProfileEmployer />



  // return <div>{reduxEmployer ? <ProfileEmployer /> : <ProfileNurse />}</div>
}