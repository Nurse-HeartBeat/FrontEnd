import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Nav from '../components/nav';


export default function Jobs() {
  const reduxUser = useSelector((state:any) => state.user);
  console.log(reduxUser.user)

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Nav />

    </div>
  )
}