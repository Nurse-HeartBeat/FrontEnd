import React, { useState } from 'react';
import ProfileNurse from '../components/profileNurse';
import ProfileEmployer from '../components/profileEmployer';


export default function Jobs() {
  const [employer, setEmployer] = useState(false);


  return <div>{employer ? <ProfileEmployer /> : <ProfileNurse />}</div>
}