import React, { useState, FormEvent, MouseEventHandler } from 'react';
import {FilterPassTypes} from '../../utils/types';


const FilterDates: React.FC<{filterPass: FilterPassTypes}> = ({filterPass}) => {
  let now = new Date();
let formattedDate = now.toISOString().slice(0,10);
  const [startDate, setStartDate] = useState(formattedDate);
  const [endDate, setEndDate] = useState(formattedDate);
  console.log()
return (
<div className="mt-0 flex rounded-lg bg-gray-300 mt-2 z-100 absolute flex-col items-center justify-center shadow-lg ring-2 ring-Primary right-5" style={{ width: '300px', maxHeight: '500px' }}>
  <label htmlFor="dates"></label>
  <div className='flex mt-5 mb-5'>
    <label htmlFor="date">Start date:</label>
    <input type="date" id="date" name="date" value={startDate} min="2023-01-01" max={String(Number(formattedDate.slice(0,4)+1)) + formattedDate.slice(4)} onChange={(e)=> setStartDate(e.target.value)}/>
  </div>
  <div>
    <label htmlFor="date">End date:</label>
    <input type="date" id="date" name="date" value={endDate} min={startDate} max={String(Number(formattedDate.slice(0,4)+1)) + formattedDate.slice(4)} onChange={(e)=> setEndDate(e.target.value)}/>
  </div>
  <button className='flex px-4 py-2 text-white rounded-md bg-primary-light hover:bg-primary mt-5 ml-3 mb-5'>Apply
    </button>
</div>
)
}

export default FilterDates;