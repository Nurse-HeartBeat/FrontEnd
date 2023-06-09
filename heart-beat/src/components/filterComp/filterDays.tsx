import React, { useState, FormEvent, MouseEventHandler } from 'react';
import {FilterPassTypes, DaysTypes} from '../../utils/types';


const FilterCategory: React.FC<{filterPass: FilterPassTypes}> = ({filterPass}) => {
  const days = Object.keys(filterPass.days)
return (
<div className="mt-0 flex rounded-lg bg-gray-300 mt-2 z-100 absolute flex-col items-center justify-center shadow-lg ring-2 ring-Primary" style={{ width: '300px', maxHeight: '500px' }}>
  <label htmlFor="category"></label>
  <div className='flex flex-col' style={{ width: '300px', maxHeight: '500px', overflowY: 'auto' }}>
    {days.map((day, index) => {
      return (
        <div className='mt-5 ml-5' key={index}>
          <input name={`checkbox ${day}`} type='checkbox' checked={filterPass.days[day]}
                onClick={() => {
                  filterPass.setDays((prevState: any) => ({
                    ...prevState,
                    [day]: !prevState[day],
                  }));
                }}/>
          <label htmlFor={`checkbox ${day}`}>{' - ' + day}</label>
        </div>
      )
    })}
  </div>

  <div className='flex flex-row'>
    <button
        onClick={() => {
          filterPass.setDays((prevState: DaysTypes) => {
            const updatedCategory = Object.fromEntries(
              Object.keys(prevState).map((key) => [key, false])
            ) as unknown as DaysTypes;
            return updatedCategory;
          });

        }}
        className='flex px-4 py-2 text-white rounded-md bg-primary-light hover:bg-primary mt-5 mr-3'>Unselect All
    </button>
    <button className='flex px-4 py-2 text-white rounded-md bg-primary-light hover:bg-primary mt-5 ml-3'>Apply
    </button>
  </div>
</div>
)
}

export default FilterCategory;