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