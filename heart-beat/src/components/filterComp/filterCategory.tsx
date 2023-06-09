import React, { useState, FormEvent, MouseEventHandler } from 'react';
<<<<<<< HEAD
import {CategoryTypes, FilterPassTypes} from '../types';
=======
import {FilterPassTypes} from '../../utils/types';
>>>>>>> 128ca6910bff360f0a7c9adfb5b51b009906f9a0

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

  <button className='flex px-4 py-2 text-white rounded-md bg-primary-light hover:bg-primary mt-5'>Apply</button>
  <button
    onClick={() => {
      filterPass.setCategory((prevState: CategoryTypes) => {
        const updatedCategory = Object.fromEntries(
          Object.keys(prevState).map((key) => [key, false])
        ) as unknown as CategoryTypes;
        return updatedCategory;
      });

    }}>Unselect All</button>
</div>
)
}

export default FilterCategory;