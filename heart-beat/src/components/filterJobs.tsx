import React, { useState, FormEvent, MouseEventHandler } from 'react';

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
}

const Filter:React.FC<{filterPass: FilterPass}> = ({filterPass}) => {

  const [distanceTab, setDistanceTab] = useState(false);

return (
  <div className='mx-20'>
    <div className='flex flex-row justify-between text-black mt-5'>

      <div>
        <button className={`hover:bg-primary-light text-black font-semibold h-7 flex items-center justify-center rounded-lg w-20 ${distanceTab ? 'bg-lightP' : 'bg-gray-200'}`} onClick={() => { setDistanceTab(!distanceTab) }}>
          distance
        </button>
        {distanceTab && (
          <div className='flex mt-0 left-10 rounded-lg bg-lightP mt-2 z-100 absolute flex-col h-10 items-center justify-center' style={{'width': '200px'}}>
            <label htmlFor="distanceSlider"></label>
              <input
                type="range"
                id="distanceSlider"
                min="1"
                max="100"
                value={filterPass.distance}
                onChange={(e) => filterPass.setDistance(Number(e.target.value))}
              />
              <input
                type="number"
                min="1"
                max="100"
                value={filterPass.distance}
                onChange={(e) => {
                  const value = e.target.value.trim() === "" ? "" : Number(e.target.value);
                  filterPass.setDistance(value);
                }}
                className='bg-p-5'
              />
          </div>
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

      <button className="bg-gray-200 hover:bg-gray-300 text-black font-semibold h-7 flex items-center justify-center rounded-lg w-20">
        distance
      </button>

    </div>
  </div>
)
}

export default Filter