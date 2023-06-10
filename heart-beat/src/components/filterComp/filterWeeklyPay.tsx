import React, { useState, FormEvent, MouseEventHandler, ChangeEvent } from 'react';
import {FilterPassTypes} from '../../utils/types';

const FilterWeeklyPay: React.FC<{filterPass: FilterPassTypes}> = ({filterPass}) => {
  let weeklyPay = [1000, 2000, 3000, 4000, 5000];
  const handleApply = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (filterPass.patientNum === 0) {
    }
  }

return (
<div className="mt-0 flex rounded-lg bg-white mt-2 z-100 absolute flex-col items-center justify-end shadow-lg ring-2 ring-Primary" style={{ width: '200px', maxHeight: '120px', minHeight: '110px' }}>
  <label htmlFor="patientNum"></label>
  <div className='flex flex-row items-center justify-center'>
    <select id='dropdown' value={filterPass.weeklyPay} onChange={(e) => filterPass.setWeeklyPay(Number(e.target.value))}
    className='flex items-center bg-slate-200'>
      {weeklyPay.map((rate:number, index) => {
        return (
          <option value={rate} key={index}>{`$ ${rate} +`}</option>
        )
      })}
    </select>
    <div className='flex ml-1'>{'/week'}</div>

  </div>
  <button className='flex px-4 py-2 text-white rounded-md bg-primary-light hover:bg-primary mt-5 mb-2' onClick={handleApply}>Apply</button>
</div>
)
}

export default FilterWeeklyPay;