import React, { useState, FormEvent, MouseEventHandler } from 'react';
import { FilterPassTypes, DaysTypes } from '../../utils/types';


const FilterCategory: React.FC<{ filterPass: FilterPassTypes }> = ({ filterPass }) => {
  const days = Object.keys(filterPass.days)
  return (
    <div className="filter-dropdown-container md:w-[250px] md:-translate-x-10">
      <label htmlFor="category"></label>
      <div className='flex flex-col' style={{ width: '250px', maxHeight: '500px', overflowY: 'auto' }}>
        {days.map((day, index) => {
          return (
            <div className='mt-5 ml-5' key={index}>
              <input name={`checkbox ${day}`} type='checkbox' checked={filterPass.days[day]}
                onChange={() => {
                  filterPass.setDays((prevState: any) => ({
                    ...prevState,
                    [day]: !prevState[day],
                  }));
                }} />
              <label htmlFor={`checkbox ${day}`}>{' - ' + day}</label>
            </div>
          )
        })}
      </div>

      <div className='flex flex-row mb-2'>
        <button
          onClick={() => {
            filterPass.setDays((prevState: DaysTypes) => {
              const updatedCategory = Object.fromEntries(
                Object.keys(prevState).map((key) => [key, false])
              ) as unknown as DaysTypes;
              return updatedCategory;
            });

          }}
          className='filter-dropdown-btn mt-5 mr-3'>Unselect All
        </button>
        <button className='filter-dropdown-btn mt-5 ml-3 '>Apply
        </button>
      </div>
    </div>
  )
}

export default FilterCategory;