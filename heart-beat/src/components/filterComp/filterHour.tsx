import React from 'react';
import { FilterPassTypes} from '../../utils/types';


const FilterHour: React.FC<{ filterPass: FilterPassTypes }> = ({ filterPass }) => {

  return (
    <div className="filter-dropdown-container md:w-[300px]">
      <label htmlFor="hour"></label>
      <div className='mt-5 mb-3'>
        <label className='flex'>Start after:</label>
        <form className='flex flex-row'>
          <input type='time' value={filterPass.startTime}
              onChange={(e) => {filterPass.setStartTime(e.target.value); console.log(typeof e.target.value)}}
              className='px-4 py-2 border border-gray-300 rounded-md  flex' />
        </form>
      </div>
      <div className="border-t border-black-500 pt-3 mb-0">
        <label className='flex mt-0'>End before:</label>
        <form className='flex flex-row'>
          <input type='time' value={filterPass.endTime}
                onChange={(e) => {filterPass.setEndTime(e.target.value); console.log(typeof e.target.value)}}
                className='px-4 py-2 border border-gray-300 rounded-md  flex' />
        </form>
      </div>

      <button className='filter-dropdown-btn mt-5 ml-3 mb-2' onClick={filterPass.applyFilter}>Apply
      </button>
    </div>
  )
}

export default FilterHour;