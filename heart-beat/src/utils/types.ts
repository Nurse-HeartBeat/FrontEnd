export interface Nurse {
  id?: string;
  firstName: string;
  lastName: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postal: number;
  email: string;
  phone: string;
  gender: string;
  yearOfExperience: number;
  license: string;
  expiration: string;
}

export interface Employer {
  id?: string;
  companyName: string;
  email: string;
  type?: string;
  phone: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postal: number;
}


export interface Job {
  id?: string;
  category: string;
  yearRequired: number | null;
  title: string;
  employer: string;
  assignTo?: string | null;
  approve: boolean;
  completed: boolean;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postal?: number;
  latitude: number;
  longitude: number;
  startDate: string;
  endDate: string;
  Monday: boolean;
  Tuesday: boolean;
  Wednesday: boolean;
  Thursday: boolean;
  Friday: boolean;
  Saturday: boolean;
  Sunday: boolean
  start: string;
  end: string;
  shiftHour: number|null;
  patientPopulation: string;
  patientNumber: number;
  stipend: number;
  weeklyPay: number;
  bonus: number;
  contactPerson: string;
  contactEmail: string;
  parkingFree: boolean;
  additionalDetails?: string;
  createdBy: string | null;
  [key: string]: any;
}

export interface FilterPassTypes {
  distance: number;
  setDistance: (value: number) => void;
  category: { [key: string]: boolean };
  setCategory: (value: (prevState: CategoryTypes) => CategoryTypes) => void;
  patientPop: { [key: string]: boolean };
  setPatientPop: (value: (prevState: PatientTypes) => PatientTypes) => void;
  patientNum: number;
  setPatientNum: (value: number) => void;
  weeklyPay: number;
  setWeeklyPay: (value: number) => void;
  days: { [key: string]: boolean };
  setDays: (value: (prevState: DaysTypes) => DaysTypes) => void;
  startTime: string;
  setStartTime: (value: string) => void;
  endTime: string;
  setEndTime: (value: string) => void;
  // dates: Date;
  // setDates: (value: Date) => void;
  postal: number | null;
  setPostal: (value: number | null) => void;
  applyFilter:() => void;
  // longitude: number | null;
  setLongitude: (value: number | null) => void;
  // latitude: number | null;
  setLatitude: (value: number | null) => void;
  startDate: string;
  setStartDate: (value: string) => void;
  endDate: string;
  setEndDate: (value: string) => void;
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

export interface PatientPopTypes {
  "Neonatal": boolean;
  "Infant": boolean;
  "Toddler": boolean;
  "Preschool": boolean;
  "Pediatric": boolean;
  "Adolescent": boolean;
  "Young Adult": boolean;
  "Adult": boolean;
  "Geriatric": boolean;
}

export interface PatientTypes {
  "Neonatal": boolean, // 0 - 28 days
  "Infant": boolean; // 1 month - 1 year
  "Toddler": boolean; // 1 - 3 years
  "Preschool": boolean; // 3 - 5 years
  "Pediatric": boolean; // 6 - 12 years
  "Adolescent": boolean; // 13 - 18 years
  "Young Adult": boolean; // 19 - 24 years
  "Adult": boolean; // 25 - 64 years
  "Geriatric": boolean; // 65 years and above
}

export interface DaysTypes {
  'Monday': boolean;
  'Tuesday': boolean;
  'Wednesday': boolean;
  'Thursday': boolean;
  'Friday': boolean;
  'Saturday': boolean;
  'Sunday': boolean
}

export type SetCategoryType = React.Dispatch<React.SetStateAction<CategoryTypes>>;
export type SetPatientPopType = React.Dispatch<React.SetStateAction<PatientPopTypes>>;