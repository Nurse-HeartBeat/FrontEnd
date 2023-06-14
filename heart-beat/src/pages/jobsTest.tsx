import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

// Set up Apollo Client
const client = new ApolloClient({
  uri: `${process.env.NEXT_PUBLIC_API_URL}/api/jobs_apollo`, // replace with your API endpoint
  cache: new InMemoryCache(),
});

// Define your Job type
type Job = {
  id: string;
  category: string;
  title: string;
  // add other fields as necessary
};

// Define your GraphQL query
const JOB_QUERY = gql`
  query GetJobs {
    jobs {
      id
      category
      title
    }
  }
`;

// Define your component props type
type JobListProps = {
  jobs: Job[];
};

// Define your component
const JobList: React.FC<JobListProps> = ({ jobs }) => {
  return <div>
    {jobs.map( job => <div key={job.id}>{job.title}</div>)}
  </div>
  ;
};

// Fetch data server-side with getServerSideProps
export async function getServerSideProps() {
  const { data } = await client.query<{ jobs: Job[] }>({ query: JOB_QUERY });
  return { props: { jobs: data.jobs } };
}

export default JobList;
