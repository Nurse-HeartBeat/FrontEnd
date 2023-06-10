import React, { useState, FormEvent, MouseEventHandler } from 'react';
import { FilterPassTypes } from '../../utils/types';

const FilterDistance: React.FC<{ filterPass: FilterPassTypes }> = ({ filterPass }) => {
  return (
    <div className="filter-dropdown-container md:w-[200px] md:h-[200px] md:-translate-x-10">
      <label htmlFor="distanceSlider"></label>
      <div className='flex flex-col mb-5 justify-center items-center'>
        <label htmlFor='postalInputSlider' className='flex'> Enter Postal Code:</label>
        <input
          type='text'
          pattern="[0-9]*"
          id='postalInput'
          value={filterPass.postal === 0 ? Number('94087') : filterPass.postal}
          onChange={(e) => {
            let inputValue = e.target.value;
            inputValue = inputValue.slice(0, 5);
            inputValue = inputValue.padStart(5, '0');
            const numericInput = inputValue.replace(/[^0-9]/g, '');
            filterPass.setPostal(Number(numericInput))
          }}
          className='flex bg-slate-200 px-2 mt-2 w-[70px]'
        />
      </div>
      <input
        type="range"
        id="distanceSlider"
        min="1"
        max="100"
        value={filterPass.distance}
        onChange={(e) => filterPass.setDistance(Number(e.target.value))}
      />
      <div className='flex flex-row mt-3'>
        <input
          type="number"
          min="1"
          max="100"
          value={filterPass.distance}
          onChange={(e) => {
            const value: any = e.target.value.trim() === "" ? "" : Number(e.target.value);
            filterPass.setDistance(value);
          }}
          className='flex'
        />
        <h1 className='flex'>miles</h1>
      </div>
      <button className='filter-dropdown-btn mt-5'>Apply</button>
    </div>
  )
}

export default FilterDistance