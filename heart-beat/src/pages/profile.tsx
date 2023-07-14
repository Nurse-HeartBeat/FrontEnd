import React, { useState } from 'react';
import ProfileNurse from '../components/profileNurse';
import ProfileEmployer from '../components/profileEmployer';
import { useSelector } from 'react-redux';
import Nav from '../components/nav';
import Footer from '../components/footer';


export default function Jobs() {
  const reduxUser = useSelector((state: any) => state.user);
  console.log(reduxUser.user)

  return (
    <div className="flex flex-col min-h-screen bg-white justify-between">
      <Nav />
      <div className="flex-grow">

      {reduxUser.user && reduxUser.employer ? (
        <ProfileEmployer />
      ) : reduxUser.user && !reduxUser.employer ? (
        <ProfileNurse />
      ) : (
        <p className="text-red-500 mt-4 text-center">
          Please log in to view your profile information.
        </p>
      )}
      </div>
      <Footer />
    </div>
  )
}