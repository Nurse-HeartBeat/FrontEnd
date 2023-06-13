import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { gql } from 'graphql-tag';
import { generateJobs } from '../../utils/seedJobs';
import { DateTypeDefinition } from 'graphql-scalars';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

const typeDefs = gql`
scalar DateTypeDefinition,
type Job {
  id: ID!
  category: String!
  year_required: Int!
  title: String!
  employer: String!
  assignTo: Int
  approve: Boolean!
  completed: Boolean!
  address1: String!
  address2: String
  city: String!
  state: String!
  postal: String!
  latitude: Float!
  longitude: Float!
  startDate: DateTypeDefinition!  # GraphQL doesn't have a native Date type
  endDate: DateTypeDefinition!    # Use a String for simplicity
  Monday: Boolean!
  Tuesday: Boolean!
  Wednesday: Boolean!
  Thursday: Boolean!
  Friday: Boolean!
  Saturday: Boolean!
  Sunday: Boolean!
  start: String!
  end: String!
  shiftHour: Int!
  patient_population: String!
  patient_number: Int!
  stipend: Float!
  weekly_pay: Float!
  bonus: Float!
  contact_person: String!
  contact_email: String!
  parkingFree: Boolean!
  additionalDetails: String
}

type Query {
  jobs: [Job!]!
}
`;

const resolvers = {
  Query: {
    jobs: () => {
      const jobs = generateJobs(10);
      return jobs;
    },
  },
};

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

const nextHandler = startServerAndCreateNextHandler(server);


export default async function handler(req : NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', 'https://studio.apollographql.com');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  await nextHandler(req, res);
}
// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'GET') {
//     const jobs = generateJobs(10);  // generate jobs data
//     res.status(200).json(jobs);
//   } else {
//     res.setHeader('Allow', ['GET']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }
