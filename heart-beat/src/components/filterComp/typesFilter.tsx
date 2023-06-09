export interface FilterPassTypes {
  distance: number;
  setDistance:(value: number) => void;
  category: {[key:string]: boolean};
  // setCategory: (value: {
  //   'Registered Nurse (RN)': boolean,
  //   'Licensed Practical Nurse (LPN)': boolean,
  //   'Certified Nursing Assistant (CNA)': boolean,
  //   'Nurse Practitioner (NP)': boolean,
  //   'Pediatric Nurse': boolean,
  //   'Geriatric Nurse': boolean,
  //   'Critical Care Nurse': boolean,
  //   'Emergency Room Nurse': boolean,
  //   'Operating Room Nurse': boolean,
  //   'Neonatal Intensive Care Unit (NICU) Nurse': boolean,
  //   'Obstetric Nurse': boolean,
  //   'Psychiatric Nurse': boolean,
  //   'Oncology Nurse': boolean,
  //   'Rehabilitation Nurse': boolean,
  //   'Home Health Nurse': boolean,
  //   'Intensive Care Unit (ICU) Nurse': boolean,
  //   'Surgical Nurse': boolean,
  //   'Cardiac Nurse': boolean,
  //   'Hospice Nurse': boolean,
  //   'Public Health Nurse': boolean
  // }) => void;
  setCategory: (value: (prevState: CategoryTypes) => CategoryTypes) => void;
  patientNum: number;
  setPatientNum: (value: number) => void;
  weeklyPay: number;
  setWeeklyPay: (value: number) => void;
  days: object;
  setDays: (value: {
    M: boolean,
    T: boolean,
    W: boolean,
    Th: boolean,
    F: boolean,
    St: boolean,
    Sn: boolean}) => void;
  startHour: number;
  setStartHour: (value: number) => void;
  endHour: number;
  setEndHour: (value: number) => void;
  dates: Date;
  setDates: (value: Date) => void;
  postal: number;
  setPostal: (value: number) => void;
}

export interface CategoryTypes {
    'Registered Nurse (RN)': boolean;
    'Licensed Practical Nurse (LPN)': boolean;
    'Certified Nursing Assistant (CNA)': boolean;
    'Nurse Practitioner (NP)': boolean;
    'Pediatric Nurse': boolean;
    'Geriatric Nurse': boolean;
    'Critical Care Nurse': boolean;
    'Emergency Room Nurse': boolean;
    'Operating Room Nurse': boolean;
    'Neonatal Intensive Care Unit (NICU) Nurse': boolean;
    'Obstetric Nurse': boolean;
    'Psychiatric Nurse': boolean;
    'Oncology Nurse': boolean;
    'Rehabilitation Nurse': boolean;
    'Home Health Nurse': boolean;
    'Intensive Care Unit (ICU) Nurse': boolean;
    'Surgical Nurse': boolean;
    'Cardiac Nurse': boolean;
    'Hospice Nurse': boolean;
    'Public Health Nurse': boolean;
}