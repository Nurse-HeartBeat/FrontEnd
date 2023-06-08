import React, { useState, FormEvent, MouseEventHandler } from 'react';
import FilterDistance from './filterComp/filterDistance';

interface FilterPass {
  distance: number;
  setDistance:(value: number) => void;
  category: string;
  setCategory: (value: string) => void;
  patientNum: number;
  setPatientNum: (value: number) => void;
  weeklyPay: number;
  setWeeklyPay: (value: number) => void;
  days: object;
  setDays: (value: object) => void;
  startHour: number;
  setStartHour: (value: number) => void;
  endHour: number;
  setEndHour: (value: number) => void;
  dates: Date;
  setDates: (value: Date) => void;
  postal: number;
  setPostal: (value: number) => void;
}

const Filter:React.FC<{filterPass: FilterPass}> = ({filterPass}) => {

  const [distanceTab, setDistanceTab] = useState(false);

return (
  <div className='mx-20'>
    <div className='flex flex-row justify-between text-black mt-5'>

      <div>
        <button className={`hover:bg-primary-light text-black font-semibold h-7 flex items-center justify-center rounded-lg w-20 ${distanceTab ? 'bg-gray-300' : 'bg-gray-200'}`}
        onClick={() => { setDistanceTab(!distanceTab) }}>
          distance
        </button>
        {distanceTab && (
          <FilterDistance filterPass={filterPass} />
        )}
      </div>

      <div>
        <button className={`hover:bg-primary-light text-black font-semibold h-7 flex items-center justify-center rounded-lg w-20 ${distanceTab ? 'bg-gray-300' : 'bg-gray-200'}`}
        onClick={() => { setDistanceTab(!distanceTab) }}>
          distance
        </button>
        {distanceTab && (
          <FilterDistance filterPass={filterPass} />
        )}
      </div>

      <button className="bg-gray-200 hover:bg-gray-300 text-black font-semibold h-7 flex items-center justify-center rounded-lg w-20">
        distance
      </button>

      <button className="bg-gray-200 hover:bg-gray-300 text-black font-semibold h-7 flex items-center justify-center rounded-lg w-20">
        distance
      </button>

      <button className="bg-gray-200 hover:bg-gray-300 text-black font-semibold h-7 flex items-center justify-center rounded-lg w-20">
        distance
      </button>

      <button className="bg-gray-200 hover:bg-gray-300 text-black font-semibold h-7 flex items-center justify-center rounded-lg w-20">
        distance
      </button>

      <button className="bg-gray-200 hover:bg-gray-300 text-black font-semibold h-7 flex items-center justify-center rounded-lg w-20">
        distance
      </button>

      <button className="bg-gray-200 hover:bg-gray-300 text-black font-semibold h-7 flex items-center justify-center rounded-lg w-20">
        distance
      </button>

    </div>
  </div>
)
}

export default Filter