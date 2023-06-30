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
  [key: string]: any;
}

export interface FilterPassTypes {
  distance: number;
  setDistance: (value: number) => void;
  category: { [key: string]: boolean };
  setCategory: (value: (prevState: CategoryTypes) => CategoryTypes) => void;
  patientNum: number;
  setPatientNum: (value: number) => void;
  weeklyPay: number;
  setWeeklyPay: (value: number) => void;
  days: { [key: string]: boolean };
  setDays: (value: (prevState: DaysTypes) => DaysTypes) => void;
  startHour: number;
  setStartHour: (value: number) => void;
  endHour: number;
  setEndHour: (value: number) => void;
  dates: Date;
  setDates: (value: Date) => void;
  postal?: number;
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

export interface DaysTypes {
  'Monday': boolean;
  'Tuesday': boolean;
  'Wednesday': boolean;
  'Thursday': boolean;
  'Friday': boolean;
  'Saturday': boolean;
  'Sunday': boolean
}
