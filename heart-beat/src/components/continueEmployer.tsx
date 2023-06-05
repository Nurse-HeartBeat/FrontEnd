import React, { FormEvent, MouseEventHandler } from 'react';

interface ObjProps {
  employer: string;
  setEmployer: (value: string) => void;
  phone: string;
  setPhone: (value: string) => void;
  address1: string;
  setAddress1: (value: string) => void;
  address2?: string;
  setAddress2: (value: string) => void;
  postal?: string;
  setPostal: (value: string) => void;
  handleSubmit: MouseEventHandler<HTMLButtonElement>;
  continueBut: boolean;
  setContinueBut: (value: boolean) => void;
  city: string;
  setCity: (value: string) => void;
  state: string;
  setState: (value: string) => void;
  facilityType: string;
  setFacilityType: (value: string) => void;
}
const continueEmployer: React.FC<{obj: ObjProps}> = ({obj}) => {
  const healthcareFacilities = [
    "Hospital",
    "Ambulatory Care Center",
    "Nursing Home",
    "Home Healthcare",
    "Urgent Care Center",
    "Rehabilitation Center",
    "Primary Care Clinic",
    "Specialty Clinic",
    "Community Health Center",
    "Schools and Educational Institutions"
  ];
  return (
    <form className="mx-auto" style={{ marginTop:"0%", marginLeft: "-30%", width: "500px" }}>
            <div className="mb-4">
              <div className='mx-auto flex justify-between'>
                <label htmlFor="employer" className="mr-5 block text-gray-700">Company Name
                  <input
                    type="text"
                    id="employer"
                    value={obj.employer}
                    onChange={(e) => {
                      obj.setEmployer(e.target.value)
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 text-black"
                  />
                </label>
                <label htmlFor="phone" className="mr-5 block text-gray-700">Phone Number
                  <input
                    type="text"
                    id="phone"
                    value={obj.phone}
                    onChange={(e) => {
                      const numericValue = e.target.value.replace(/\D/g, '')
                      obj.setPhone(numericValue)
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 text-black"
                  />
                </label>
              </div>
              <div className='mt-5 flex justify-between'>
                <label htmlFor="address1" className="mr-5 block text-gray-700">Address
                  <input
                    type="text"
                    id="address1"
                    value={obj.address1}
                    onChange={(e) => {
                      obj.setAddress1(e.target.value)
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 text-black"
                    placeholder="Address 1"/>
                </label>
                <label htmlFor="address2" className="block text-gray-700 text-white">Address
                  <input
                    type="text"
                    id="nurseLast"
                    value={obj.address2}
                    onChange={(e) => {
                      obj.setAddress2(e.target.value)
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 text-black"
                    placeholder="Address 2"
                  />
                </label>
              </div>
              <div className='flex justify-between'>
                <label htmlFor="city" className="block text-gray-700 text-white">
                  <input
                    type="text"
                    id="city"
                    value={obj.city}
                    onChange={(e) => {
                      obj.setCity(e.target.value)
                    }}
                    className="w-full px-4
                     py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 text-black"
                    placeholder="City"/>
                </label>
                <label htmlFor="state" className="block text-gray-700 text-white">
                  <input
                    type="text"
                    id="state"
                    value={obj.state}
                    onChange={(e) => {
                      obj.setState(e.target.value)
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 text-black"
                    placeholder="State"
                  />
                </label>
                <label htmlFor="postal" className="appearance-none block text-gray-700 text-white">
                  <input
                    type="text"
                    id="postal"
                    value={obj.postal}
                    onChange={(e) => {
                      const numericValue = e.target.value.replace(/\D/g, '')
                      obj.setPostal(numericValue)
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 text-black"
                    placeholder="Postal Code"
                  />
                </label>
              </div>
              <div className='mt-5 mx-auto flex justify-between'>
                <label htmlFor="facilityType" className="mr-5 block text-gray-700">Type
                  <select
                    id="dropdown"
                    value={obj.facilityType}
                    onChange={(e) => obj.setFacilityType(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 text-black"
                  >
                    {healthcareFacilities.map((facility, index) => {
                      return (
                        <option key={index} value={facility}>{facility}</option>
                      )
                    })}
                  </select>
                </label>
              </div>
            </div>
            <div className ='flex flex-row items-center justify-between'>
              <button type="button" className="justify-start flex px-4 py-2 text-white bg-accent rounded-md hover:bg-primary focus:outline-none focus:ring focus:ring-blue-500 mt-5" onClick={() => {
                obj.setContinueBut(!obj.continueBut)
              }}>
                Back
              </button>
              <button type="button" className="justify-end flex px-4 py-2 text-white bg-accent rounded-md hover:bg-primary focus:outline-none focus:ring focus:ring-blue-500 mt-5" onClick={obj.handleSubmit}>
                Submit
              </button>
            </div>
          </form>
  )
}

export default  continueEmployer;