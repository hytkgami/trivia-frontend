import { useSubscription } from '@apollo/client';
import { graphql } from '../generated';

const CurrentQuestionSubscriptionDocument = graphql(`
  subscription CurrentQuestionSubscription($lobbyId: ID!) {
    currentQuestion(lobbyId: $lobbyId) {
      id
      title
      orderNumber
      score
    }
  }
`);

export const LobbyPage = () => {
  const { data, loading } = useSubscription(
    CurrentQuestionSubscriptionDocument,
    {
      variables: {
        lobbyId: '01H16KS0GJQ489TMPGMCKJFQW0',
      },
    }
  );
  if (loading) return <div>Fetching</div>;
  if (!data) return <div>No data</div>;
  return (
    <div>
      <h1>{data.currentQuestion.title}</h1>
      <p>{data.currentQuestion.orderNumber}</p>
      <p>{data.currentQuestion.orderNumber}</p>
    </div>
  );
};
