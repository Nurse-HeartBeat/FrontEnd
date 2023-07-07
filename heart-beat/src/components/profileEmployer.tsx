import React, { useState, useEffect } from 'react';
import { Employer } from '../utils/types.js';
import { useSelector } from 'react-redux';

export default function ProfileEmployer() {
  const reduxUser = useSelector((state: any) => state.user);

  const [employer, setEmployer] = useState<Employer>(reduxUser.user);
  const [isEditable, setIsEditable] = useState(false);


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEmployer(prevEmployer => ({
      ...prevEmployer,
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
    setEmployer(reduxUser.user);
  };

  return (
    <div className="flex flex-col items-center flex-1 text-black">
      <h1 className="text-2xl font-bold m-4">Employer Profile</h1>
      <form className="w-2/3 lg:w-1/2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-1 gap-x-10">
          <label className="flex flex-col mb-4">
            <span className="text-lg font-medium">Company Name:</span>
            <input
              type="text"
              name="companyName"
              value={employer.companyName}
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
              value={employer.email}
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
              value={employer.address1}
              onChange={handleInputChange}
              disabled={!isEditable}
              className="rounded-md p-2 border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400"
            />
            <input
              type="text"
              name="address1"
              value={employer.address2}
              onChange={handleInputChange}
              disabled={!isEditable}
              className="mt-2 rounded-md p-2 border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400"
            />
          </label>
          <label className="flex flex-col mb-4">
            <span className="text-lg font-medium">Phone:</span>
            <input
              type="tel"
              name="phone"
              value={employer.phone}
              onChange={handleInputChange}
              disabled={!isEditable}
              className="rounded-md p-2 border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400"
            />
          </label>
          <label className="flex flex-col mb-4">
            <span className="text-lg font-medium">City:</span>
            <input
              type="text"
              name="city"
              value={employer.city}
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
              value={employer.state}
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
              value={employer.postal}
              onChange={handleInputChange}
              disabled={!isEditable}
              className="mt-2 rounded-md p-2 border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400"
            />
          </label>
        </div>
      </form>
      <div className='mb-10'>
        {isEditable ? (
          <div className="flex space-x-16">
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
