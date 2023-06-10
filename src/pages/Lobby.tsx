import { useQuery } from '@apollo/client';
import { graphql } from '../generated';

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

export const LobbyPage = () => {
  const { loading, error, data } = useQuery(FetchLobbiesQueryDocument, {
    variables: {
      limit: 10,
    },
  });
  if (loading) return <div>Fetching</div>;
  if (error) return <div>Error {error.message}</div>;
  if (!data) return <div>No data</div>;
  return (
    <>
      {data.lobbies.edges.map((lobby) => (
        <div key={lobby.cursor}>
          <h1>{lobby.node.name}</h1>
        </div>
      ))}
    </>
  );
};
