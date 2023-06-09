export interface User {
  // Define your user fields here
  // For example:
  id: string;
  name: string;
  email: string;
  // etc.
}

export interface Job {
  id: string;
  category: string;
  year_required: number;
  title: string;
  employer: string;
  assignTo?: number;
  approve: boolean;
  completed: boolean;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postal: string;
  latitude: number;
  longitude: number;
  startDate: Date;
  endDate: Date;
  M: boolean,
  T: boolean,
  W: boolean,
  Th: boolean,
  F: boolean,
  St: boolean,
  Sn: boolean,
  start: string;
  end: string;
  shiftHour: number;
  patient_population: string;
  patient_number: number;
  stipend: number;
  weekly_pay: number;
  bonus: number;
  contact_person: string;
  contact_email: string;
  parkingFree: boolean;
  additionalDetails?: string;
}

export interface FilterPass {
  distance: number;
  setDistance: (value: number) => void;
  category: NursingRoles;
  setCategory: (value: NursingRoles) => void;
  patientNum: number;
  setPatientNum: (value: number) => void;
  weeklyPay: number;
  setWeeklyPay: (value: number) => void;
  days: Days;
  setDays: (value: Days) => void;
  startHour: number;
  setStartHour: (value: number) => void;
  endHour: number;
  setEndHour: (value: number) => void;
  dates: Date;
  setDates: (value: Date) => void;
  postal: number;
  setPostal: (value: number) => void;
}

export type NursingRoles = {
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
};

type Days = {
  M: boolean;
  T: boolean;
  W: boolean;
  Th: boolean;
  F: boolean;
  St: boolean;
  Sn: boolean;
};
