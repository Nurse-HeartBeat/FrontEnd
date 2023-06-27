import React, { FormEvent, MouseEventHandler } from 'react';

interface ObjProps {
  nurseFirst: string;
  setNurseFirst: (value: string) => void;
  nurseLast: string;
  setNurseLast: (value: string) => void;
  license: string;
  setLicense: (value: string) => void;
  yoe: number;
  setyoe: (value: number) => void;
  expire?: Date;
  setExpire: (value: Date) => void;
  phone: string;
  setPhone: (value: string) => void;
  address1: string;
  setAddress1: (value: string) => void;
  address2?: string;
  setAddress2: (value: string) => void;
  postal?: number | null;
  setPostal: (value: number) => void;
  gender?: string;
  setGender: (value: string) => void;
  handleSubmit: MouseEventHandler<HTMLButtonElement>;
  continueBut: boolean;
  setContinueBut: (value: boolean) => void;
  city: string;
  setCity: (value: string) => void;
  state: string;
  setState: (value: string) => void;
}
const continueNurse: React.FC<{obj: ObjProps}> = ({obj}) => {
  return (
    <div className="" style={{ marginTop:"0%", marginLeft: "10px", width: "500px" }}>
            <div className="mb-4">
              <div className='mx-auto flex justify-between'>
                <label htmlFor="nurseFirst" className="mr-5 block text-gray-700">First Name
                  <input
                    type="text"
                    id="nurse1"
                    value={obj.nurseFirst}
                    onChange={(e) => {
                      obj.setNurseFirst(e.target.value)
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 text-black"
                  />
                </label>
                <label htmlFor="nurseLast" className="block text-gray-700">Last Name
                  <input
                    type="text"
                    id="nurseLast"
                    value={obj.nurseLast}
                    onChange={(e) => {
                      obj.setNurseLast(e.target.value)
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 text-black"
                  />
                </label>
              </div>
              <div className='mt-5 flex justify-between mb-2'>
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
                <label htmlFor="city" className="block text-gray-700 text-white mr-2">
                  <input
                    type="text"
                    id="city"
                    value={obj.city}
                    onChange={(e) => {
                      obj.setCity(e.target.value)
                    }}
                    className="w-full px-4
                     py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 text-black "
                    placeholder="City"/>
                </label>
                <label htmlFor="state" className="block text-gray-700 text-white mr-2">
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
                    value={obj.postal || ''}
                    onChange={(e) => {
                      const numericValue = e.target.value.replace(/\D/g, '')
                      obj.setPostal(Number(numericValue))
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 text-black"
                    placeholder="Postal Code"
                  />
                </label>
              </div>
              <div className='mt-5 mx-auto flex justify-between'>
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
                <label htmlFor="gender" className="block text-gray-700">Gender
                  <select
                    id="dropdown"
                    value={obj.gender}
                    onChange={(e) => obj.setGender(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 text-black"
                  >
                    <option value="">{''}</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </label>
              </div>
              <div className='mt-5 mx-auto flex justify-between'>
                <label htmlFor="yoe" className="mr-5 block text-gray-700">Years of Experience
                  <select
                    id="dropdown"
                    value={obj.yoe}
                    onChange={(e) => obj.setyoe(Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 text-black"
                  >
                    <option value={0}>0</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={7}>7+</option>
                  </select>
                </label>
              </div>
              <div className='mt-5 mx-auto flex justify-between'>
                <label htmlFor="license" className="mr-5 block text-gray-700">License
                  <input
                    type="text"
                    id="license"
                    value={obj.license}
                    onChange={(e) => {
                      obj.setLicense(e.target.value)
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 text-black"
                  />
                </label>
                <label htmlFor="expire" className="mr-5 block text-gray-700">Expiration Date
                  <input
                    type="date"
                    id="expire"
                    value={obj.expire ? obj.expire.toISOString().split('T')[0] : ''}
                    onChange={(e) => {
                      obj.setExpire(new Date(e.target.value))
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 text-black"
                  />
                </label>
              </div>
            </div>
            <div className ='flex flex-row items-center justify-between'>
              <button type="button" className="justify-start flex px-4 py-2 text-white rounded-md bg-primary-light hover:bg-primary focus:outline-none focus:ring focus:ring-blue-500 mt-5" onClick={() => {
                obj.setContinueBut(!obj.continueBut)
              }}>
                Back
              </button>
              <button type="button" className="justify-end flex px-4 py-2 text-white rounded-md bg-primary-light hover:bg-primary focus:outline-none focus:ring focus:ring-blue-500 mt-5" onClick={obj.handleSubmit}>
                Submit
              </button>
            </div>
          </div>
  )
}

export default  continueNurse