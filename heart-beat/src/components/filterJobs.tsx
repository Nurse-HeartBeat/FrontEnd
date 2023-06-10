import React, { useState, FormEvent, MouseEventHandler } from 'react';
import FilterDistance from './filterComp/filterDistance';
import FilterCategory from './filterComp/filterCategory';
import FilterPatient from './filterComp/filterPatient';
import FilterWeeklyPay from './filterComp/filterWeeklyPay';
import FilterDays from './filterComp/filterDays';
import FilterHour from './filterComp/filterHour';
import FilterDates from './filterComp/filterDates';
import { FilterPassTypes } from '../utils/types';


const Filter: React.FC<{ FilterPass: FilterPassTypes }> = ({ FilterPass }) => {

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

  function filterOrganize(category: string) {
    setState((prevState: { [key: string]: boolean }) => ({
      ...Object.fromEntries(Object.keys(prevState).map(key => [key, false])),
      distanceTab: false,
      categoryTab: false,
      patientTab: false,
      weeklyPayTab: false,
      daysTab: false,
      startHourTab: false,
      endHourTab: false,
      dateTab: false,
      [category]: !prevState[category],
    }));
  }

  return (
    <div className='mx-20'>
      <div className='flex flex-row overflow-auto justify-between text-black mt-5'>

        <div className='mx-2'>
          <button className={`hover:bg-primary-light text-black font-semibold h-7 flex items-center justify-center rounded-lg w-20 ${state.distanceTab ? 'bg-gray-300' : 'bg-gray-200'}`}
            onClick={() => {
              filterOrganize('distanceTab');
            }}>
            Distance
          </button>
          {state.distanceTab && (
            <FilterDistance filterPass={FilterPass} />
          )}
        </div>

        <div className='mx-2'>
          <button className={`hover:bg-primary-light text-black font-semibold h-7 flex items-center justify-center rounded-lg w-20 ${state.categoryTab ? 'bg-gray-300' : 'bg-gray-200'}`}
            onClick={() => {
              filterOrganize('categoryTab');
            }}>
            Category
          </button>
          {state.categoryTab && (
            <FilterCategory filterPass={FilterPass} />
          )}
        </div>

        <div className='mx-2'>
          <button className={`hover:bg-primary-light text-black font-semibold h-7 flex items-center justify-center rounded-lg w-20 ${state.patientTab ? 'bg-gray-300' : 'bg-gray-200'}`}
            onClick={() => {
              filterOrganize('patientTab');
            }}>
            Patient #
          </button>
          {state.patientTab && (
            <FilterPatient filterPass={FilterPass} />
          )}
        </div>

        <div className='mx-2'>
          <button className={`hover:bg-primary-light text-black font-semibold h-13 flex items-center justify-center rounded-lg w-auto ${state.weeklyPayTab ? 'bg-gray-300' : 'bg-gray-200'}`}
            onClick={() => {
              filterOrganize('weeklyPayTab');
            }}>
            Weekly Pay
          </button>
          {state.weeklyPayTab && (
            <FilterWeeklyPay filterPass={FilterPass} />
          )}
        </div>

        <div className='mx-2'>
          <button className={`hover:bg-primary-light text-black font-semibold h-13 flex items-center justify-center rounded-lg w-20 ${state.daysTab ? 'bg-gray-300' : 'bg-gray-200'}`}
            onClick={() => {
              filterOrganize('daysTab');
            }}>
            Days
          </button>
          {state.daysTab && (
            <FilterDays filterPass={FilterPass} />
          )}
        </div>

        <div className='mx-2'>
          <button className={`hover:bg-primary-light text-black font-semibold h-13 flex items-center justify-center rounded-lg w-20 ${state.startHourTab ? 'bg-gray-300' : 'bg-gray-200'}`}
            onClick={() => {
              filterOrganize('startHourTab');
            }}>
            Hour
          </button>
          {state.startHourTab && (
            <FilterHour filterPass={FilterPass} />
          )}
        </div>


        <div className='mx-2'>
          <button className={`hover:bg-primary-light text-black font-semibold h-13 flex items-center justify-center rounded-lg w-20 ${state.dateTab ? 'bg-gray-300' : 'bg-gray-200'}`}
            onClick={() => {
              filterOrganize('dateTab');
            }}>
            Dates
          </button>
          {state.dateTab && (
            <FilterDates filterPass={FilterPass} />
          )}
        </div>

      </div>
    </div>
  )
}

export default Filter;