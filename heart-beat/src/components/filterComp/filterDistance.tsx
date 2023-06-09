import React, { useState, FormEvent, MouseEventHandler } from 'react';
interface FilterPass {
  distance: number;
  setDistance: (value: number) => void;
  category: Record<string, boolean>;
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

const FilterDistance: React.FC<{filterPass: FilterPass}> = ({filterPass}) => {
return (
<div className='flex rounded-lg bg-gray-300 mt-2 z-100 absolute flex-col h-10 items-center justify-center shadow-lg ring-2 ring-Primary' style={{'width': '200px', 'marginTop':'-0px', 'height':'300px'}}>
  <label htmlFor="distanceSlider"></label>
  <div className='flex flex-col mb-5 justify-center items-center'>
    <label htmlFor='postalInputSlider' className='flex'> Enter Postal Code:</label>
    <input
      type='text'
      pattern="[0-9]*"
      id='postalInput'
      value={String(filterPass.postal)}
      onChange={(e) => {
        let inputValue = e.target.value;
        inputValue = inputValue.slice(0, 5);
        inputValue = inputValue.padStart(5, '0');
        const numericInput = inputValue.replace(/[^0-9]/g, '');
        filterPass.setPostal(Number(numericInput))
      }}
      className='flex'
      style={{'width':'50px'}}
    />
  </div>
  <input
    type="range"
    id="distanceSlider"
    min="1"
    max="100"
    value={filterPass.distance}
    onChange={(e) => filterPass.setDistance(Number(e.target.value))}
  />
  <div className='flex flex-row mt-3'>
    <input
        type="number"
        min="1"
        max="100"
        value={filterPass.distance}
        onChange={(e) => {
          const value:any = e.target.value.trim() === "" ? "" : Number(e.target.value);
          filterPass.setDistance(value);
        }}
        className='flex'
      />
    <h1 className='flex'>miles</h1>
  </div>
  <button className='flex px-4 py-2 text-white rounded-md bg-primary-light hover:bg-primary mt-5'>Apply</button>
</div>
)
}

export default FilterDistance