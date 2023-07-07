import React, { useState } from 'react';
import { Nurse } from '../utils/types.js';



export default function ProfileNurse() {
  const myNurse: Nurse = {
    id: "8",
    firstName: "Quanjing3",
    lastName: "Chen",
    address1: "HERE Waiting",
    city: "LA",
    state: "CA",
    postal: 12345,
    email: "nathanaeltjen@gmail.com",
    phone: "8186002213",
    gender: "male",
    yearOfExperience: 2,
    license: "thisismylicense",
    expiration: "2023-06-30"
  };



  return <div>nurse</div>
}