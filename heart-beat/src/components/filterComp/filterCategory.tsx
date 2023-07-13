import React, { useState, FormEvent, MouseEventHandler } from 'react';
import { FilterPassTypes, CategoryTypes } from '../../utils/types';


const FilterCategory: React.FC<{ filterPass: FilterPassTypes }> = ({ filterPass }) => {
  const nurseCategories = Object.keys(filterPass.category)
  return (
    <div className="filter-dropdown-container md:w-[300px] md:max-h-[500px] md:-translate-x-10">
      <label htmlFor="category"></label>
      <div className='flex flex-col' style={{ width: '300px', maxHeight: '500px', overflowY: 'auto' }}>
        {nurseCategories.map((category, index) => {
          return (
            <div className='mt-5 ml-5' key={index}>
              <input name={`checkbox ${category}`} type='checkbox' checked={filterPass.category[category]}
                onChange={() => {
                  filterPass.setCategory((prevState: any) => ({
                    ...prevState,
                    [category]: !prevState[category],
                  }));
                }} />
              <label htmlFor={`checkbox ${category}`}>{' - ' + category}</label>
            </div>
          )
        })}
      </div>

      <div className='flex flex-row mb-2'>
        <button
          onClick={() => {
            filterPass.setCategory((prevState: CategoryTypes) => {
              const updatedCategory = Object.fromEntries(
                Object.keys(prevState).map((key) => [key, false])
              ) as unknown as CategoryTypes;
              return updatedCategory;
            });
          }}
          className='filter-dropdown-btn mt-5 mr-3'>Unselect All
        </button>
        <button className='filter-dropdown-btn mt-5 ml-3' onClick={filterPass.applyFilter}>Apply
        </button>
      </div>
    </div>
  )
}

export default FilterCategory;