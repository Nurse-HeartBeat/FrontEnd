import React, { useState, FormEvent, MouseEventHandler } from 'react';
import FilterDistance from './filterComp/filterDistance';
import FilterCategory from './filterComp/filterCategory';
import FilterPatient from './filterComp/filterPatient';

interface FilterPass {
  distance: number;
  setDistance: (value: number) => void;
  category: Record<string, boolean>;
  setCategory: (value: object) => void;
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

  // const [distanceTab, setDistanceTab] = useState(false);
  // const [categoryTab, setCategoryTab] = useState(false);
  const [state, setState] = useState({
    distanceTab: false,
    categoryTab: false,
    patientTab: false,
    weeklyPayTab: false,
    daysTab: false,
    startHourTab: false,
    endHourTab: false,
    dateTab: false
  });

  function filterOrganize(category: keyof typeof state) {
    const newState = { ...state };
    for (let key in newState) {
      newState[key as keyof typeof state] = false;
    }
    newState[category] = true;

    setState(newState);
  }



return (
  <div className='mx-20'>
    <div className='flex flex-row justify-between text-black mt-5'>

      <div>
        <button className={`hover:bg-primary-light text-black font-semibold h-7 flex items-center justify-center rounded-lg w-20 ${state.distanceTab ? 'bg-gray-300' : 'bg-gray-200'}`}
        onClick={() => {
          filterOrganize('distanceTab');
          }}>
          Distance
        </button>
        {state.distanceTab && (
          <FilterDistance filterPass={filterPass} />
        )}
      </div>

      <div>
        <button className={`hover:bg-primary-light text-black font-semibold h-7 flex items-center justify-center rounded-lg w-20 ${state.categoryTab ? 'bg-gray-300' : 'bg-gray-200'}`}
        onClick={() => {
          filterOrganize('categoryTab');
          }}>
          Category
        </button>
        {state.categoryTab && (
          <FilterCategory filterPass={filterPass} />
        )}
      </div>

      <div>
        <button className={`hover:bg-primary-light text-black font-semibold h-7 flex items-center justify-center rounded-lg w-20 ${state.patientTab ? 'bg-gray-300' : 'bg-gray-200'}`}
        onClick={() => {
          filterOrganize('patientTab');
          }}>
          Patient #
        </button>
        {state.patientTab && (
          <FilterPatient filterPass={filterPass} />
        )}
      </div>

      <div>
        <button className={`hover:bg-primary-light text-black font-semibold h-13 flex items-center justify-center rounded-lg w-auto ${state.weeklyPayTab ? 'bg-gray-300' : 'bg-gray-200'}`}
        onClick={() => {
          filterOrganize('weeklyPayTab');
          }}>
           Weekly Pay
        </button>
        {state.weeklyPayTab && (
          <FilterCategory filterPass={filterPass} />
        )}
      </div>

      <div>
        <button className={`hover:bg-primary-light text-black font-semibold h-13 flex items-center justify-center rounded-lg w-20 ${state.daysTab ? 'bg-gray-300' : 'bg-gray-200'}`}
        onClick={() => {
          filterOrganize('daysTab');
          }}>
           Days
        </button>
        {state.daysTab && (
          <FilterCategory filterPass={filterPass} />
        )}
      </div>

      <div>
        <button className={`hover:bg-primary-light text-black font-semibold h-13 flex items-center justify-center rounded-lg w-20 ${state.startHourTab ? 'bg-gray-300' : 'bg-gray-200'}`}
        onClick={() => {
          filterOrganize('startHourTab');
          }}>
           Start Hour
        </button>
        {state.startHourTab && (
          <FilterCategory filterPass={filterPass} />
        )}
      </div>

      <div>
        <button className={`hover:bg-primary-light text-black font-semibold h-13 flex items-center justify-center rounded-lg w-20 ${state.endHourTab ? 'bg-gray-300' : 'bg-gray-200'}`}
        onClick={() => {
          filterOrganize('endHourTab');
          }}>
           End Hour
        </button>
        {state.endHourTab && (
          <FilterCategory filterPass={filterPass} />
        )}
      </div>

      <div>
        <button className={`hover:bg-primary-light text-black font-semibold h-13 flex items-center justify-center rounded-lg w-20 ${state.dateTab ? 'bg-gray-300' : 'bg-gray-200'}`}
        onClick={() => {
          filterOrganize('dateTab');
          }}>
           Dates
        </button>
        {state.dateTab && (
          <FilterCategory filterPass={filterPass} />
        )}
      </div>

    </div>
  </div>
)
}

export default Filter