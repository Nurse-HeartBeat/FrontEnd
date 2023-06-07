export interface Job {
  id: string;
  category: string;
  year_required: number;
  title: string;
  employer: string;
  assignTo: string | null;
  approve: boolean;
  completed: boolean;
  location: string;
  startDate: string;
  endDate: string;
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
  additionalDetails: string | null;
}