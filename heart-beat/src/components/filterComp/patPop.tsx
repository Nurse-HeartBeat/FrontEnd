import React, { useState, FormEvent, MouseEventHandler, useEffect } from 'react';
import { FilterPassTypes, PatientTypes } from '../../utils/types';


const PatPop: React.FC<{ populationData: FilterPassTypes["patientPop"], setPopulationData: FilterPassTypes["setPatientPop"] }> = ({ populationData, setPopulationData }) => {
  const patientPopulation = Object.keys(populationData)

  return (
    <div className="flex flex-col items-center border overflow" style={{ height: '100%', width:'80%', justifyContent: 'center' }}>
      <label htmlFor="patientPop"></label>
      <div className='flex flex-col' style={{ width: '300px', maxHeight: '500px', overflowY: 'auto', marginLeft:'60%' }}>
        {patientPopulation.map((pop, index) => {
          return (
            <div className='mt-5 ml-5' key={index}>
              <input name={`checkbox ${pop}`} type='checkbox' checked={populationData[pop]}
                onClick={() => {
                  setPopulationData((prevState: any) => ({
                    ...prevState,
                    [pop]: !prevState[pop],
                  }));
                }} />
              <label htmlFor={`checkbox ${pop}`}>{' - ' + pop}</label>
            </div>
          )
        })}
      </div>

      <div className='flex flex-row mb-2'>
        <button
          onClick={() => {
            setPopulationData((prevState: PatientTypes) => {
              const updatedPop = Object.fromEntries(
                Object.keys(prevState).map((key) => [key, false])
              ) as unknown as PatientTypes;
              return updatedPop;
            });

          }}
          className='filter-dropdown-btn mt-5 mr-3 ml-3'>Unselect All
        </button>
      </div>
    </div>
  )
}

export default PatPop;