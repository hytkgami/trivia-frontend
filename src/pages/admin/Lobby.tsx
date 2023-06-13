import { useMutation, useQuery } from '@apollo/client';
import { useContext, useState } from 'react';
import { useParams } from 'react-router';
import { Spinner } from '../../components/Spinner';
import { AuthContext } from '../../contexts/AuthProvider';
import { graphql } from '../../generated';
import { Mark, Question } from '../../generated/graphql';
import { Container } from '../layouts/Container';
import { useInput } from '../../hooks/useInput';

const ScoringMutationDocument = graphql(`
  mutation ScoringMutation($answerId: ID!, $mark: Mark!, $score: Int!) {
    scoring(answerId: $answerId, mark: $mark, value: $score) {
      answer {
        id
        content
        score {
          mark
          value
        }
      }
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
        id
        title
        orderNumber
        score
        answers {
          id
          content
          owner {
            id
            name
          }
          score {
            mark
            value
          }
        }
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
  const [value, resetValue] = useInput('');
  const { id } = useParams<{ id: string }>();
  const { data, loading, error, refetch } = useQuery(FetchLobbyQueryDocument, {
    variables: {
      id: id!,
    },
  });
  const { currentUser } = useContext(AuthContext);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [publishQuestion] = useMutation(PublishQuestionMutationDocument);
  const [scoring] = useMutation(ScoringMutationDocument);
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
            {data.lobby.questions.map((question) => (
              <div
                key={question.id}
                className={`flex flex-col gap-6 text-gray-900 p-4 outline outline-2 outline-gray-200 bg-white rounded-md ${
                  question.id === selectedQuestion?.id ? 'outline-emerald-300 delay-75' : ''
                }`}
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
                      if (selectedQuestion?.id === question.id) {
                        setSelectedQuestion(null);
                        return;
                      }
                      await refetch();
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
              selectedQuestion.answers.map((answer) => {
                return (
                  <div
                    key={answer.id}
                    className="w-full flex flex-col px-2 pt-1 pb-2 gap-2 bg-white rounded-md outline outline-1 outline-gray-200"
                  >
                    <p>{answer.content}</p>
                    <div className="flex flex-col gap-1 divide-y">
                      <p className="text-xs">回答者: {answer.owner.name}</p>
                      <p className="text-sm">
                        採点結果 <span className="text-red-700">{answer.score.mark}</span> 配点 {answer.score.value}
                      </p>
                    </div>
                    <div className="flex gap-2 my-auto">
                      <button
                        className="outline outline-1 outline-slate-400 bg-gray-50 rounded-md py-1 px-2 shadow-md hover:shadow-none"
                        onClick={async () => {
                          const res = await scoring({
                            variables: {
                              answerId: answer.id,
                              mark: Mark.Correct,
                              score: selectedQuestion.score,
                            },
                          });
                          if (res.errors) {
                            console.error(res.errors);
                          }
                        }}
                      >
                        ⭕️
                      </button>
                      <button
                        className="outline outline-1 outline-slate-400 bg-gray-50 rounded-md py-1 px-2 shadow-md hover:shadow-none"
                        onClick={async () => {
                          const res = await scoring({
                            variables: {
                              answerId: answer.id,
                              mark: Mark.Incorrect,
                              score: 0,
                            },
                          });
                          if (res.errors) {
                            console.error(res.errors);
                          } else {
                            await refetch();
                          }
                        }}
                      >
                        ❌
                      </button>
                      <div className="flex-grow flex outline outline-1 outline-slate-400 bg-gray-50 rounded-md shadow-md hover:shadow-none">
                        <button
                          className="py-1 px-2"
                          onClick={async () => {
                            const res = await scoring({
                              variables: {
                                answerId: answer.id,
                                mark: Mark.Neutral,
                                score: value.value ? parseInt(value.value) : 0,
                              },
                            });
                            if (res.errors) {
                              console.error(res.errors);
                            } else {
                              await refetch();
                              resetValue();
                            }
                          }}
                        >
                          🤔
                        </button>
                        <input
                          type="number"
                          className="placeholder:text-sm flex-grow"
                          placeholder={`配点して送信 (max: ${selectedQuestion.score})`}
                          max={selectedQuestion.score}
                          min={0}
                          {...value}
                        />
                      </div>
                    </div>
                  </div>
                );
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
