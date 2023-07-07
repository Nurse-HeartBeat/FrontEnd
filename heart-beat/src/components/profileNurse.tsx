import React, { useState, useEffect } from 'react';
import { Nurse } from '../utils/types.js';
import { useSelector } from 'react-redux';

export default function ProfileNurse() {
  const reduxUser = useSelector((state:any) => state.user);
  const [nurse, setNurse] = useState<Nurse>(reduxUser.user);
  const [isEditable, setIsEditable] = useState(false);

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
            value={nurse.firstName}
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
            value={nurse.lastName}
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
            value={nurse.email}
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
            value={nurse.phone}
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
            value={nurse.address1}
            onChange={handleInputChange}
            disabled={!isEditable}
            className="rounded-md p-2 border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400"
          />
          <input
            type="text"
            name="address1"
            value={nurse.address2}
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
            value={nurse.city}
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
            value={nurse.state}
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
            value={nurse.postal}
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
            value={nurse.gender}
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
            value={nurse.yearOfExperience}
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
            value={nurse.license}
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
            value={nurse.expiration}
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
