import React, { useState, useEffect } from 'react';
import { Employer } from '../utils/types.js';

export default function ProfileEmployer() {
  const [employer, setEmployer] = useState<Employer>({
    companyName: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    postal: 0,
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
        companyName: "ABC Company",
        email: "employer@example.com",
        phone: "1234567890",
        address1: "123 Main St",
        address2: "Apt 3",
        city: "Los Angeles",
        state: "CA",
        postal: 12345,
      }
      setEmployer(data);
    } catch (error) {
      console.log('Error fetching user info:', error);
    }
  };

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
    // Add cancel logic here, such as making a GET request to fetch the user info again
  };

  return (
    <div className="flex flex-col items-center justify-center flex-1">
      <h1 className="text-3xl font-bold m-4">Employer Profile</h1>
      <form className="w-full w-2/3 lg:w-1/2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 gap-x-10">


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
