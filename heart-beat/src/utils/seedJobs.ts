const categories = [
  'Registered Nurse (RN)',
  'Licensed Practical Nurse (LPN)',
  'Certified Nursing Assistant (CNA)',
  'Nurse Practitioner (NP)',
  'Pediatric Nurse',
  'Geriatric Nurse',
  'Critical Care Nurse',
  'Emergency Room Nurse',
  'Operating Room Nurse',
  'Neonatal Intensive Care Unit (NICU) Nurse',
  'Obstetric Nurse',
  'Psychiatric Nurse',
  'Oncology Nurse',
  'Rehabilitation Nurse',
  'Home Health Nurse',
  'Intensive Care Unit (ICU) Nurse',
  'Surgical Nurse',
  'Cardiac Nurse',
  'Hospice Nurse',
  'Public Health Nurse'
];

const randomCategory = () => {
  return categories[Math.floor(Math.random() * categories.length)];
};

const randomDate = (start:Date, end:Date) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

const cities = ["San Francisco", "Los Angeles", "New York", "Chicago", "Houston"];
const states = ["CA", "NY", "IL", "TX"];
const postalCodes = ["94101", "90001", "10001", "60601", "77001"];

function generateAddress() {
  const address1 = `${Math.floor(Math.random() * 10000)} Main St`;
  const address2 = `${Math.floor(Math.random() * 1000)} Apt ${Math.floor(Math.random() * 1000)}`;
  const city = cities[Math.floor(Math.random() * cities.length)];
  const state = states[Math.floor(Math.random() * states.length)];
  const postal = postalCodes[Math.floor(Math.random() * postalCodes.length)];
  return { address1, address2, city, state, postal };
}

export function generateJobs(n:number) {
  const jobs = [];

  for (let i = 0; i < n; i++) {
    const address = generateAddress();

    // Generate random start time (between 0 and 8 AM)
    const startTimeHours = Math.floor(Math.random() * 9);
    const startTime = new Date();
    startTime.setHours(startTimeHours);
    startTime.setMinutes(0);
    startTime.setSeconds(0);

    // Generate random end time (between 9 AM and 6 PM)
    const endTimeHours = Math.floor(Math.random() * (18 - 9 + 1) + 9);
    const endTime = new Date();
    endTime.setHours(endTimeHours);
    endTime.setMinutes(0);
    endTime.setSeconds(0);

    // Calculate shift hours
    const shiftHour = endTimeHours - startTimeHours;


    const job = {
      id: i.toString(),
      employer: 'Hospital ${i+ 1}',
      category: randomCategory(),
      year_required: Math.floor(Math.random() * 10) + 1,
      title: `Job Title ${i + 1}`,
      approve: Math.random() > 0.5,
      completed: Math.random() > 0.5,
      address1: address.address1,
      address2: address.address2,
      city: address.city,
      state: address.state,
      postal: address.postal,
      latitude: Math.random() * 180 - 90,
      longitude: Math.random() * 360 - 180,
      startDate: randomDate(new Date(2022, 0, 1), new Date()),
      endDate: randomDate(new Date(2023, 0, 1), new Date(2023, 11, 31)),
      M: Math.random() > 0.5,
      T: Math.random() > 0.5,
      W: Math.random() > 0.5,
      Th: Math.random() > 0.5,
      F: Math.random() > 0.5,
      St: Math.random() > 0.5,
      Sn: Math.random() > 0.5,
      start: startTime.toLocaleTimeString('en-US', { hour12: false }),
      end: endTime.toLocaleTimeString('en-US', { hour12: false }),
      shiftHour,
      patient_population: `Population ${i + 1}`,
      patient_number: Math.floor(Math.random() * 100) + 1,
      stipend: Math.floor(Math.random() * 1000) + 500,
      weekly_pay: Math.floor(Math.random() * 5000) + 1000,
      bonus: Math.floor(Math.random() * 5000) + 1000,
      contact_person: `Contact Person ${i + 1}`,
      contact_email: `contact${i + 1}@example.com`,
      parkingFree: Math.random() > 0.5,
      additionalDetails: `Additional details for job ${i + 1}`,
    };
    jobs.push(job);
  }
  return jobs;
}


