import React, { useState, FormEvent, MouseEventHandler } from 'react';
import {FilterPassTypes} from '../types';

const FilterPatient: React.FC<{filterPass: FilterPassTypes}> = ({filterPass}) => {
  const handleApply = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (filterPass.patientNum === 0) {
      setWarning(true)
    }
  }
  const [warning, setWarning] = useState(false)
return (
<div className="mt-0 flex rounded-lg bg-gray-300 mt-2 z-100 absolute flex-col items-center justify-center shadow-lg ring-2 ring-Primary" style={{ width: '300px', maxHeight: '500px' }}>
  <label htmlFor="patientNum"></label>
  <div className='flex flex-col items-center'>
    <h1 className='flex mb-5 mt-5 ml-2'>Please Input the number of patient you want to be responsible for (1-1000)</h1>
    <label htmlFor="patientNum1">up to: {' '}
      <input
        type='text'
        value={filterPass.patientNum}
        onChange={(e) => {
          const enteredValue = e.target.value;
          const numericValue = enteredValue.replace(/[^0-9]/g, ''); // Remove non-numeric characters
          const sanitizedValue = Math.min(Number(numericValue), 1000); // Limit to a maximum of 1000
          filterPass.setPatientNum(sanitizedValue);
          setWarning(false)
          // filterPass.setPatientNum(Number(e.target.value))
        }}
      />
      {' '}patients
    </label>
  </div>
  {warning && (
    <h1 className='flex text-red-500 mt-5'>please input number other than 0</h1>
  )}
  <button className='flex px-4 py-2 text-white rounded-md bg-primary-light hover:bg-primary mt-5' onClick={handleApply}>Apply</button>
</div>
)
}

export default FilterPatient;