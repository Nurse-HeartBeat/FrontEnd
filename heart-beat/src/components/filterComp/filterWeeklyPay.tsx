import React, { useState, FormEvent, MouseEventHandler, ChangeEvent } from 'react';
import { FilterPassTypes } from '../../utils/types';

const FilterWeeklyPay: React.FC<{ filterPass: FilterPassTypes }> = ({ filterPass }) => {
  let weeklyPay = [1000, 2000, 3000, 4000, 5000];
  const handleApply = (e: React.MouseEvent<HTMLButtonElement>) => {
    filterPass.applyFilter()
  }
  return (
    <div className="filter-dropdown-container md:w-[200px] md:-translate-x-10">
      <label htmlFor="patientNum"></label>
      <div className='flex flex-row mt-4 items-center justify-center'>
        <select id='dropdown' value={filterPass.weeklyPay} onChange={(e) => filterPass.setWeeklyPay(Number(e.target.value))}
          className='flex items-center bg-slate-200'>
          {weeklyPay.map((rate: number, index) => {
            return (
              <option value={rate} key={index}>{`$ ${rate} +`}</option>
            )
          })}
        </select>
        <div className='flex ml-1'>{'/week'}</div>
      </div>
      <button className='filter-dropdown-btn mt-4 mb-2' onClick={handleApply}>Apply</button>
    </div>
  )
}

export default FilterWeeklyPay;