import React, { useState, FormEvent, MouseEventHandler } from 'react';
import { FilterPassTypes } from '../../utils/types';
import PatPop from './patPop';

const FilterPatient: React.FC<{ filterPass: FilterPassTypes }> = ({ filterPass }) => {
  const handleApply = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (filterPass.patientNum === 0) {
      setWarning(true)
    } else {
      filterPass.applyFilter()
    }
  }
  const [warning, setWarning] = useState(false)
  const [selectPop, setSelectPop] = useState(false)
  const [selectBut, setSelectBut] = useState('Select Population')
  return (
    <div className="filter-dropdown-container  md:w-[300px] md:max-h-[800px] md:-translate-x-10">
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
            className='bg-slate-200 px-2 mt-2 w-[70px]'

          />
          {' '}patients
        </label>
      </div>
      <div className='flex flex-col justify-center items-center'>
        <button className='filter-dropdown-btn mt-5 mb-2 justify-center'
        onClick={() => {
          if (selectPop) {
            setSelectBut('Select Population')
          } else {
            setSelectBut('Close')
          }
          setSelectPop(!selectPop)
        }}>{selectBut}</button>
        {selectPop && (
          <PatPop populationData={filterPass.patientPop} setPopulationData={filterPass.setPatientPop}/>
        )}
      </div>
      {warning && (
        <h1 className='flex text-red-500 mt-5'>please input number other than 0</h1>
      )}
      <button className='filter-dropdown-btn mt-5 mb-2 width-full' onClick={handleApply}>Apply</button>
    </div>
  )
}

export default FilterPatient;