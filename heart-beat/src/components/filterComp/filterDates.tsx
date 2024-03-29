import React, { useState, FormEvent, MouseEventHandler } from 'react';
import { FilterPassTypes } from '../../utils/types';


const FilterDates: React.FC<{ filterPass: FilterPassTypes }> = ({ filterPass }) => {
  let now = new Date();
  let formattedDate = now.toISOString().slice(0, 10);

  return (
    <div className="filter-dropdown-container md:w-[300px] ">
      <div className='flex flex-col items-end'>
        <label htmlFor="dates"></label>
        <div className='flex my-4'>
          <label htmlFor="date">Start date after:</label>
          <input type="date" id="date" name="date" value={filterPass.startDate} min={formattedDate} max={String(Number(formattedDate.slice(0, 4)) + 1) + formattedDate.slice(4)} onChange={(e) => filterPass.setStartDate(e.target.value)} className='bg-slate-200 px-1 mx-2' />
        </div>
        <div>
          <label htmlFor="date">End date before:</label>
          <input type="date" id="date" name="date" value={filterPass.endDate} min={formattedDate} max={String(Number(formattedDate.slice(0, 4)) + 1) + formattedDate.slice(4)} onChange={(e) => filterPass.setEndDate(e.target.value)} className='bg-slate-200 px-1 mx-2' />
        </div>
      </div>
      <button className='filter-dropdown-btn mt-5 ml-3 mb-2' onClick={filterPass.applyFilter}>Apply
      </button>
    </div>
  )
}

export default FilterDates;