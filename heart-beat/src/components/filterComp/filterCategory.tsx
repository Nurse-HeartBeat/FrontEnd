import React, { useState, FormEvent, MouseEventHandler } from 'react';
import { FilterPass } from '../../utils/types.js';


const FilterCategory: React.FC<{ filterPass: FilterPass }> = ({ filterPass }) => {
  const nurseCategories = Object.keys(filterPass.category)
  return (
    <div className="mt-0 flex rounded-lg bg-gray-300 mt-2 z-100 absolute flex-col items-center justify-center shadow-lg ring-2 ring-Primary" style={{ width: '300px', maxHeight: '500px' }}>
      <label htmlFor="category"></label>
      <div className='flex flex-col' style={{ width: '300px', maxHeight: '500px', overflowY: 'auto' }}>
        {nurseCategories.map((category) => {
          return (
            <div className='mt-5 ml-5' key={category}>
              <input name={`checkbox ${category}`} type='checkbox' checked={filterPass.category[category as keyof typeof filterPass.category]}
                onClick={() => {
                  const newState = { ...filterPass.category, [category]: !filterPass.category[category as keyof typeof filterPass.category] };
                  filterPass.setCategory(newState);
                }}
              />
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