import { useMutation, useQuery } from '@apollo/client';
import { useContext, useState } from 'react';
import { useParams } from 'react-router';
import { AnswerCard } from '../../components/AnswerCard';
import { Spinner } from '../../components/Spinner';
import { AuthContext } from '../../contexts/AuthProvider';
import { useFragment as getFragment, graphql } from '../../generated';
import { QuestionItemFragment } from '../../generated/graphql';
import { Container } from '../layouts/Container';

const QuestionFragment = graphql(`
  fragment QuestionItem on Question {
    id
    title
    orderNumber
    score
    answers {
      ...AnswerItem
    }
  }
`);

const FetchLobbyQueryDocument = graphql(`
  query FetchLobby($id: ID!) {
    lobby(id: $id) {
      id
      name
      public
      owner {
        id
        name
      }
      questions {
        ...QuestionItem
      }
    }
  }
`);

const PublishQuestionMutationDocument = graphql(`
  mutation PublishQuestionMutation($lobbyId: ID!, $questionId: ID!) {
    publishQuestion(lobbyId: $lobbyId, questionId: $questionId) {
      question {
        id
      }
    }
  }
`);

export const AdminLobby = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useQuery(FetchLobbyQueryDocument, {
    variables: {
      id: id!,
    },
  });
  const { currentUser } = useContext(AuthContext);
  const questions = getFragment(QuestionFragment, data?.lobby.questions);
  const [publishQuestion] = useMutation(PublishQuestionMutationDocument);
  const [selectedQuestion, setSelectedQuestion] = useState<QuestionItemFragment | null>(null);
  if (loading) {
    return (
      <Container>
        <Spinner />
      </Container>
    );
  }
  if (error) {
    return (
      <Container>
        <div>Error {error.message}</div>
      </Container>
    );
  }
  if (!data) {
    return (
      <Container>
        <p>ロビーの情報が見つかりませんでした</p>
      </Container>
    );
  }
  if (currentUser?.uid !== data.lobby.owner.id) {
    return (
      <Container>
        <p>ロビーのオーナーではありません</p>
      </Container>
    );
  }
  return (
    <Container>
      <h1 className="py-4 text-2xl font-bold text-gray-900">{data.lobby.name}</h1>
      <div className="flex gap-2">
        <div className="w-1/3">
          <h2 className="py-2 text-lg font-semibold text-gray-800">問題一覧</h2>
          <div className="flex flex-col gap-2">
            {questions?.map((question) => (
              <div
                key={question.id}
                className={`flex flex-col gap-6 text-gray-900 p-4 outline outline-2 outline-gray-200 bg-white rounded-md ${
                  question.id === selectedQuestion?.id ? 'outline outline-1 outline-lime-300' : ''
                }}`}
              >
                <h3>{question.title}</h3>
                <ul className="flex gap-2 text-xs">
                  <li className="py-1 px-3 rounded-full text-white bg-indigo-500">
                    {question.score} {question.score > 1 ? 'pts' : 'pt'}
                  </li>
                </ul>
                <div className="flex gap-2">
                  <button
                    className="text-sm py-1 px-3 rounded-md text-gray-800 outline outline-1 outline-gray-300"
                    onClick={async () => {
                      setSelectedQuestion(question);
                    }}
                  >
                    回答を確認する
                  </button>
                  <button
                    className="text-sm py-1 px-3 rounded-md text-gray-800 outline outline-1 outline-gray-300"
                    onClick={() =>
                      publishQuestion({
                        variables: {
                          lobbyId: data.lobby.id,
                          questionId: question.id,
                        },
                      })
                    }
                  >
                    配信する
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-2/3">
          <h2 className="py-2 text-lg font-semibold text-gray-800">回答一覧</h2>
          <div>
            {selectedQuestion ? (
              selectedQuestion.answers.map((answer, i) => {
                return <AnswerCard key={`question-${selectedQuestion.id}-answer-${i}`} answer={answer} />;
              })
            ) : (
              <p>問題をクリックすると、回答一覧が表示されます</p>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};
