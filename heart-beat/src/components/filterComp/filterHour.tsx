import React, { useState, FormEvent, MouseEventHandler } from 'react';
import { FilterPassTypes, DaysTypes } from '../../utils/types';


const FilterHour: React.FC<{ filterPass: FilterPassTypes }> = ({ filterPass }) => {
  const [startHour, setStartHour] = useState(0);
  const [startMin, setStartMin] = useState(0);
  const [startM, setStartM] = useState('AM');
  const [endHour, setEndHour] = useState(11);
  const [endMin, setEndMin] = useState(59);
  const [endM, setEndM] = useState('PM');

  return (
    <div className="flex rounded-lg bg-white mt-2 z-100 absolute flex-col items-center justify-center shadow-lg ring-2 ring-Primary" style={{ width: '300px', maxHeight: '500px' }}>
      <label htmlFor="hour"></label>
      <div className='mt-5 mb-3'>
        <label className='flex'>Start after:</label>
        <form className='flex flex-row'>
          <label htmlFor="hours">Hour:</label><br />
          <input type="number" id="hours" name="hours" min="1" max="12" value={startHour} onChange={(e) => setStartHour(Number(e.target.value))} className='bg-slate-200 px-1 mx-2'/><br />
          <label htmlFor="minutes">Minutes:</label><br />
          <input type="number" id="minutes" name="minutes" min="0" max="59" value={startMin} onChange={(e) => setStartMin(Number(e.target.value))} className='bg-slate-200 px-1 mx-2'/><br />
          <select id="ampm" name="ampm" className='ml-1 bg-slate-200' value={startM} onChange={(e) => setStartM(e.target.value)}>
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </form>
      </div>
      <div className="border-t border-black-500 pt-3 mb-0">
        <label className='flex mt-0'>End before:</label>
        <form className='flex flex-row'>
          <label htmlFor="hours">Hour:</label><br />
          <input type="number" id="hours" name="hours" min="1" max="12" value={endHour} onChange={(e) => setEndHour(Number(e.target.value))} className='bg-slate-200 px-1 mx-2'/><br />
          <label htmlFor="minutes">Minutes:</label><br />
          <input type="number" id="minutes" name="minutes" min="0" max="59" value={endMin} onChange={(e) => setEndMin(Number(e.target.value))} className='bg-slate-200 px-1 mx-2'/><br />
          <select id="ampm" name="ampm" className='ml-1 bg-slate-200' value={endM} onChange={(e) => setEndM(e.target.value)}>
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </form>
      </div>

      <button className='flex px-4 py-2 text-white rounded-md bg-primary-light hover:bg-primary mt-5 ml-3 mb-2'>Apply
      </button>
    </div>
  )
}

export default FilterHour;