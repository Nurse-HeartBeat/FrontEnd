import React, { useState, FormEvent, MouseEventHandler } from 'react';
import {FilterPassTypes, CategoryTypes} from '../../utils/types';


const FilterCategory: React.FC<{filterPass: FilterPassTypes}> = ({filterPass}) => {
  const nurseCategories = Object.keys(filterPass.category)
return (
<div className="mt-0 flex rounded-lg bg-gray-300 mt-2 z-100 absolute flex-col items-center justify-center shadow-lg ring-2 ring-Primary" style={{ width: '300px', maxHeight: '500px' }}>
  <label htmlFor="category"></label>
  <div className='flex flex-col' style={{ width: '300px', maxHeight: '500px', overflowY: 'auto' }}>
    {nurseCategories.map((category, index) => {
      return (
        <div className='mt-5 ml-5' key={index}>
          <input name={`checkbox ${category}`} type='checkbox' checked={filterPass.category[category]}
                onClick={() => {
                  filterPass.setCategory((prevState: any) => ({
                    ...prevState,
                    [category]: !prevState[category],
                  }));
                }}/>
          <label htmlFor={`checkbox ${category}`}>{' - ' + category}</label>
        </div>
      )
    })}
  </div>

<div className='flex flex-row'>
  <button
      onClick={() => {
        filterPass.setCategory((prevState: CategoryTypes) => {
          const updatedCategory = Object.fromEntries(
            Object.keys(prevState).map((key) => [key, false])
          ) as unknown as CategoryTypes;
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