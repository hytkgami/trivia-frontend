import { useQuery } from '@apollo/client';
import { graphql } from '../generated';
import { Link } from 'react-router-dom';

const FetchLobbiesQueryDocument = graphql(`
  query FetchLobbies($cursor: ID, $limit: Int) {
    lobbies(first: $limit, after: $cursor) {
      edges {
        node {
          id
          name
          public
        }
        cursor
      }
      pageInfo {
        cursor
        hasNextPage
      }
    }
  }
`);

export const LobbiesPage = () => {
  const { loading, error, data } = useQuery(FetchLobbiesQueryDocument, {
    variables: {
      limit: 10,
    },
  });
  if (loading) return <div>Fetching</div>;
  if (error) return <div>Error {error.message}</div>;
  if (!data) return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      現在、ロビーがありません。
    </div>
  );
  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <ul role="list" className="divide-y divide-gray-300">
        {data.lobbies.edges.map((lobby) => (
          <li key={lobby.node.id} className="flex items-baseline justify-between gap-x-6 py-5">
            <div className="min-w-0 flex-auto">
                <p className="text-lg font-semibold leading-6 text-gray-900">
                  {lobby.node.name}
                </p>
              </div>
            <div className="sm:flex sm:flex-col sm:items-end">
              <Link to={`/lobbies/${lobby.node.id}`} className='bg-slate-700 py-2 px-4 rounded-md text-white text-base'>参加する</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
