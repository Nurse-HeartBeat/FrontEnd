import React, { useState, useEffect } from 'react';
import { Nurse } from '../utils/types.js';

export default function ProfileNurse() {
  const [Nurse, setNurse] = useState<Nurse>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    postal: 0,
    gender: "",
    yearOfExperience: 0,
    license: "",
    expiration: ""
  });
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      // const response = await fetch('/api/user'); // Replace with your actual API endpoint
      // const data = await response.json();
      const data = {
        "id": "8",
        "firstName": "Quanjing3",
        "lastName": "Chen",
        "address1": "HERE Waiting",
        "address2": "HERE Waiting",
        "city": "LA",
        "state": "CA",
        "postal": 12345,
        "email": "nathanaeltjen@gmail.com",
        "phone": "8186002213",
        "gender": "male",
        "yearOfExperience": 2,
        "license": "thisismylicense",
        "expiration": "2023-06-30"
      }
      setNurse(data);
    } catch (error) {
      console.log('Error fetching user info:', error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNurse(prevNurse => ({
      ...prevNurse,
      [name]: value
    }));
  };

  const handleModifyClick = () => {
    setIsEditable(true);
  };

  const handleSaveClick = () => {
    setIsEditable(false);
    // Add save logic here, such as making a PUT request to update the user info
  };

  const handleCancelClick = () => {
    setIsEditable(false);
    // Add cancel logic here, such as making a GET request to fetch the user info again
  };

  return (
    <div className="flex flex-col items-center justify-center flex-1">
      <h1 className="text-3xl font-bold m-4">Nurse Profile</h1>
      <form className="w-full w-2/3 lg:w-1/2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 gap-x-10">
        <label className="flex flex-col mb-4">
          <span className="text-lg font-medium">First name:</span>
          <input
            type="text"
            name="companyName"
            value={Nurse.firstName}
            onChange={handleInputChange}
            disabled={!isEditable}
            className="rounded-md p-2 border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400"
          />
        </label>
        <label className="flex flex-col mb-4">
          <span className="text-lg font-medium">Last name:</span>
          <input
            type="text"
            name="companyName"
            value={Nurse.lastName}
            onChange={handleInputChange}
            disabled={!isEditable}
            className="rounded-md p-2 border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400"
          />
        </label>
        <label className="flex flex-col mb-4">
          <span className="text-lg font-medium">Email:</span>
          <input
            type="email"
            name="email"
            value={Nurse.email}
            onChange={handleInputChange}
            disabled={!isEditable}
            className="rounded-md p-2 border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400"
          />
        </label>
        <label className="flex flex-col mb-4">
          <span className="text-lg font-medium">Phone:</span>
          <input
            type="tel"
            name="phone"
            value={Nurse.phone}
            onChange={handleInputChange}
            disabled={!isEditable}
            className="rounded-md p-2 border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400"
          />
        </label>
        <label className="flex flex-col mb-4">
          <span className="text-lg font-medium">Address:</span>
          <input
            type="text"
            name="address1"
            value={Nurse.address1}
            onChange={handleInputChange}
            disabled={!isEditable}
            className="rounded-md p-2 border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400"
          />
          <input
            type="text"
            name="address1"
            value={Nurse.address2}
            onChange={handleInputChange}
            disabled={!isEditable}
            className="mt-2 rounded-md p-2 border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400"
          />
        </label>
        <label className="flex flex-col mb-4">
          <span className="text-lg font-medium">City:</span>
          <input
            type="text"
            name="city"
            value={Nurse.city}
            onChange={handleInputChange}
            disabled={!isEditable}
            className="mt-2 rounded-md p-2 border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400"
          />
        </label>
        <label className="flex flex-col mb-4">
          <span className="text-lg font-medium">State:</span>
          <input
            type="text"
            name="state"
            value={Nurse.state}
            onChange={handleInputChange}
            disabled={!isEditable}
            className="mt-2 rounded-md p-2 border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400"
          />
        </label>
        <label className="flex flex-col mb-4">
          <span className="text-lg font-medium">Postal Code:</span>
          <input
            type="text"
            name="postal"
            value={Nurse.postal}
            onChange={handleInputChange}
            disabled={!isEditable}
            className="mt-2 rounded-md p-2 border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400"
          />
        </label>
        <label className="flex flex-col mb-4">
          <span className="text-lg font-medium">Gender:</span>
          <input
            type="text"
            name="postal"
            value={Nurse.gender}
            onChange={handleInputChange}
            disabled={!isEditable}
            className="mt-2 rounded-md p-2 border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400"
          />
        </label>
        <label className="flex flex-col mb-4">
          <span className="text-lg font-medium">Year of experience:</span>
          <input
            type="text"
            name="postal"
            value={Nurse.yearOfExperience}
            onChange={handleInputChange}
            disabled={!isEditable}
            className="mt-2 rounded-md p-2 border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400"
          />
        </label>
        <label className="flex flex-col mb-4">
          <span className="text-lg font-medium">License:</span>
          <input
            type="text"
            name="postal"
            value={Nurse.license}
            onChange={handleInputChange}
            disabled={!isEditable}
            className="mt-2 rounded-md p-2 border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400"
          />
        </label>
        <label className="flex flex-col mb-4">
          <span className="text-lg font-medium">Expiration:</span>
          <input
            type="text"
            name="postal"
            value={Nurse.expiration}
            onChange={handleInputChange}
            disabled={!isEditable}
            className="mt-2 rounded-md p-2 border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400"
          />
        </label>
        </div>
      </form>
      <div className='mb-10'>
        {isEditable ? (
          <div className="flex space-x-5">
            <button
              className="flex px-4 py-2 text-white rounded-md  bg-primary-light hover:bg-primary focus:outline-none focus:ring focus:ring-blue-500 mt-5" onClick={handleCancelClick}>Cancel
            </button>
            <button
              className="flex px-4 py-2 text-white rounded-md  bg-primary-light hover:bg-primary focus:outline-none focus:ring focus:ring-blue-500 mt-5"
              onClick={handleSaveClick}>Save
            </button>
          </div>
        ) : (
          <button
            className="flex px-4 py-2 text-white rounded-md  bg-primary-light hover:bg-primary focus:outline-none focus:ring focus:ring-blue-500 mt-5"
            onClick={handleModifyClick}>Modify
          </button>
        )}
      </div>
    </div>
  );
}
