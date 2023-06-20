import { useMutation } from '@apollo/client';
import { FragmentType, graphql, useFragment as getFragment } from '../generated';
import { Mark } from '../generated/graphql';
import { useInput } from '../hooks/useInput';

export const AnswerFragment = graphql(`
  fragment AnswerItem on Answer {
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
`);

const ScoringMutationDocument = graphql(`
  mutation ScoringMutation($answerId: ID!, $mark: Mark!, $score: Int!) {
    scoring(answerId: $answerId, mark: $mark, value: $score) {
      answer {
        ...AnswerItem
      }
    }
  }
`);

export const AnswerCard = (props: { answer: FragmentType<typeof AnswerFragment> }) => {
  const [value, resetValue] = useInput('');
  const answer = getFragment(AnswerFragment, props.answer);
  const [scoring] = useMutation(ScoringMutationDocument, {
    refetchQueries: ['FetchLobby'],
  });
  return (
    <div
      key={answer.id}
      className="w-full flex flex-col px-2 pt-1 pb-2 gap-2 bg-white rounded-md outline outline-1 outline-gray-200"
    >
      <p>{answer.content}</p>
      <div className="flex flex-col gap-1 divide-y">
        <p className="text-xs">回答者: {answer.owner.name}</p>
        {answer.score === null ? (
          <p className="text-sm text-red-700">未採点</p>
        ) : (
          <p className="text-sm">
            採点結果 <span className="text-red-700">{answer.score?.mark}</span> 配点 {answer.score?.value}
          </p>
        )}
      </div>
      <div className="flex gap-2 my-auto">
        <button
          className="outline outline-1 outline-slate-400 bg-gray-50 rounded-md py-1 px-2 shadow-md hover:shadow-none"
          onClick={async () => {
            const res = await scoring({
              variables: {
                answerId: answer.id,
                mark: Mark.Correct,
                score: 5,
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
              resetValue();
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
              }
            }}
          >
            🤔
          </button>
          <input
            type="number"
            className="placeholder:text-sm flex-grow px-1"
            placeholder={`配点して送信 (0-5)`}
            min={0}
            max={5}
            {...value}
          />
        </div>
      </div>
    </div>
  );
};
