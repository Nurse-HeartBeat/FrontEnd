import { gql, from, useMutation, ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/link-context';
import {getCsrfToken} from '../utils/csrfToken';

export const QUERY_NURSE = gql`
  query GetNurse($auth: ID!) {
    nurse(auth: $auth) {
      id
      firstName
      lastName
      address1
      address2
      city
      state
      postal
      email
      phone
      gender
      yearOfExperience
      license
      expiration
    }
  }
`;

export const QUERY_EMPLOYER = gql`
  query GetEmployer($auth: ID!) {
    employer(auth: $auth) {
      id
      companyName
      type
      address1
      address2
      city
      state
      postal
      email
      phone
    }
  }
`;

export const CREATE_EMPLOYER = gql`
  mutation CreateEmployer(
    $companyName: String!,
    $type: String!,
    $address1: String!,
    $address2: String!,
    $city: String!,
    $state: String!,
    $postal: Int!,
    $email: String!,
    $phone: String!,
    $auth: String!
  ) {
    createEmployerModel(
      companyName: $companyName,
      type: $type,
      address1: $address1,
      address2: $address2,
      city: $city,
      state: $state,
      postal: $postal,
      email: $email,
      phone: $phone,
      auth: $auth
    ) {
      employerModel {
        id
        companyName
        type
        address1
        address2
        city
        state
        postal
        email
        phone
      }
    }
  }
`;

export const CREATE_NURSE = gql`
  mutation CreateNurse(
    $firstName: String!,
    $lastName: String!,
    $address1: String!,
    $address2: String!,
    $city: String!,
    $state: String!,
    $postal: Int!,
    $email: String!,
    $phone: String!,
    $gender: String!,
    $yearOfExperience: Int!,
    $license: String!,
    $expiration: Date!,
    $auth: String!
  ) {
    createNurseModel(
      firstName: $firstName,
      lastName: $lastName,
      address1: $address1,
      address2: $address2,
      city: $city,
      state: $state,
      postal: $postal,
      email: $email,
      phone: $phone,
      gender: $gender,
      yearOfExperience: $yearOfExperience,
      license: $license,
      expiration: $expiration,
      auth: $auth
    ) {
      nurseModel {
        id
        firstName
        lastName
        address1
        city
        state
        postal
        email
        phone
        gender
        yearOfExperience
        license
        expiration
      }
    }
  }
`;

export const CREATE_JOB = gql`
  mutation CreateJob(
    $category: String!,
    $yearRequired: Int!,
    $title: String!,
    $employer: String!,
    $address1: String!,
    $address2: String!,
    $city: String!,
    $state: String!,
    $postal: Int!,
    $latitude: Float!,
    $longitude: Float!,
    $startDate: Date!,
    $endDate: Date!,
    $start: String!,
    $end: String!,
    $Monday: Boolean!,
    $Tuesday: Boolean!,
    $Wednesday: Boolean!,
    $Thursday: Boolean!,
    $Friday: Boolean!,
    $Saturday: Boolean!,
    $Sunday: Boolean!,
    $contactEmail: String!,
    $contactPerson: String!,
    $shiftHour: Float!,
    $patientPopulation: String!,
    $patientNumber: Int!,
    $stipend: Float!,
    $weeklyPay: Float!,
    $bonus: Float!,
    $parkingFree: Boolean!,
    $additionalDetails: String!,
  ) {
    createJobModel(
      category: $category,
      yearRequired: $yearRequired,
      title: $title,
      employer: $employer,
      address1: $address1,
      address2: $address2,
      city: $city,
      state: $state,
      postal: $postal,
      latitude: $latitude,
      longitude: $longitude,
      startDate: $startDate,
      endDate: $endDate,
      startTime: $start,
      endTime: $end,
      Monday: $Monday,
      Tuesday: $Tuesday,
      Wednesday: $Wednesday,
      Thursday: $Thursday,
      Friday: $Friday,
      Saturday: $Saturday,
      Sunday: $Sunday,
      contactEmail: $contactEmail,
      contactPerson: $contactPerson,
      shiftHour: $shiftHour,
      patientPopulation: $patientPopulation,
      patientNumber: $patientNumber,
      stipend: $stipend,
      weeklyPay: $weeklyPay,
      bonus: $bonus,
      parkingFree: $parkingFree,
      additionalDetails: $additionalDetails
    ) {
      jobModel {
        category
        yearRequired
        title
        address1
        address2
        city
        state
        postal
        latitude
        longitude
        startDate
        endDate
        startTime
        endTime
        Monday
        Tuesday
        Wednesday
        Thursday
        Friday
        Saturday
        Sunday
        contactEmail
        shiftHour
        patientPopulation
        patientNumber
        stipend
        weeklyPay
        bonus
        parkingFree
        additionalDetails
      }
    }
  }
`;


const httpLink = new HttpLink({ uri: process.env.NEXT_PUBLIC_GRAPHQL_URL });

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
let csrftoken = await getCsrfToken(); //remember it is always async
  // getCookie("csrftoken"); // Assume you have a function that gets the cookie value
  // return the headers to the context so httpLink can read them
  console.log('this is csrftoken', csrftoken)
  return {
    headers: {
      ...headers,
      'X-CSRFToken': csrftoken,
    }
  }
});

export const client = new ApolloClient({
  // link: authLink.concat(httpLink),
  // uri: process.env.NEXT_PUBLIC_GRAPHQL_CSRF,
  link: from([authLink, httpLink]),
  cache: new InMemoryCache(),
  credentials: 'include', // Add this line
});

let graphQL = {
  client, CREATE_EMPLOYER, CREATE_NURSE, QUERY_EMPLOYER, QUERY_NURSE
}


// createJobModel(
//   category: $category
//   yearRequired: $yearRequired
//   title: $title
//   employer: $employer
//   address1: $address1
//   address2: $address2
//   city: $city
//   state: $state
//   postal: $postal
//   latitude: $latitude
//   longitude: $longitude
//   startDate: $startDate
//   endDate: $endDate
//   startTime: $start
//   endTime: $end
//   Monday: $Monday
//   Tuesday: $Tuesday
//   Wednesday: $Wednesday
//   Thursday: $Thursday
//   Friday: $Friday
//   Saturday: $Saturday
//   Sunday: $Sunday
//   contactEmail: $contactEmail
//   contactPerson: $contactPerson
//   shiftHour: $shiftHour
//   patientPopulation: $patientPopulation
//   patientNumber: $patientNumber
//   stipend: $stipend
//   weeklyPay: $weeklyPay
//   bonus: $bonus
//   parkingFree: $parkingFree
//   additionalDetails: $additionalDetails