import React, { useState, FormEvent, MouseEventHandler } from 'react';
interface FilterPass {
  distance: number;
  setDistance: (value: number) => void;
  category: object;
  setCategory: (value: object) => void;
  patientNum: number;
  setPatientNum: (value: number) => void;
  weeklyPay: number;
  setWeeklyPay: (value: number) => void;
  days: object;
  setDays: (value: object) => void;
  startHour: number;
  setStartHour: (value: number) => void;
  endHour: number;
  setEndHour: (value: number) => void;
  dates: Date;
  setDates: (value: Date) => void;
  postal: number;
  setPostal: (value: number) => void;
}

const FilterCategory: React.FC<{ filterPass: FilterPass }> = ({ filterPass }) => {
  const nurseCategories = Object.keys(filterPass.category)
  return (
    <div className="mt-0 flex rounded-lg bg-gray-300 mt-2 z-100 absolute flex-col items-center justify-center shadow-lg ring-2 ring-Primary" style={{ width: '300px', maxHeight: '500px' }}>
      <label htmlFor="category"></label>
      <div className='flex flex-col' style={{ width: '300px', maxHeight: '500px', overflowY: 'auto' }}>
        {nurseCategories.map((category) => {
          return (
            <div className='mt-5 ml-5' key={category}>
              <input name={`checkbox ${category}`} type='checkbox' checked={filterPass.category[category]}
                onClick={() => {
                  filterPass.setCategory((prevState: any) => ({
                    ...prevState,
                    [category]: !filterPass.category[category]
                  }));
                }} />
              <label htmlFor={`checkbox ${category}`}>{' - ' + category}</label>
            </div>
          )
        })}
      </div>

      <button className='flex px-4 py-2 text-white rounded-md bg-primary-light hover:bg-primary mt-5'>Apply</button>
    </div>
  )
}

export default FilterCategory;