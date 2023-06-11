import { useMutation, useSubscription } from '@apollo/client';
import { Spinner } from '../components/Spinner';
import { Chat } from '../components/icons/Chat';
import { graphql } from '../generated';
import { useTextArea } from '../hooks/useInput';

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

const CreateAnswerMutationDocument = graphql(`
  mutation CreateAnswerMutation($questionId: ID!, $answer: String!) {
    answer(questionId: $questionId, answer: $answer) {
      answer {
        id
        content
      }
    }
  }
`);

export const LobbyPage = () => {
  const { data, loading } = useSubscription(
    CurrentQuestionSubscriptionDocument,
    {
      variables: {
        lobbyId: '01H2MHTFVN9CCGQWJRD0E49C9H',
      },
    }
  );
  const [value, resetValue] = useTextArea('');
  const [createAnswer, { data: answerData, loading: sending, error }] =
    useMutation(CreateAnswerMutationDocument);
  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!data) return;
    if (value.value === '') return;
    await createAnswer({
      variables: {
        questionId: data.currentQuestion.id,
        answer: value.value,
      },
    });
    resetValue();
  };
  if (loading) return <div>Fetching</div>;
  if (!data) return <div>No data</div>;
  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8h-full">
      <div className="relative px-6 pt-14 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div className="flex flex-col gap-2 lg:gap-8">
          <div className="bg-white bg-opacity-90 text-gray-700 lg:px-12 lg:py-24 md:px-8 md:py-18 sm:px-4 sm:py-6 xs:px-1 xs:py-4 rounded-lg">
            <h1 className="text-center lg:text-4xl md:text-2xl sm:text-xl font-bold">
              {data.currentQuestion.title}
            </h1>
          </div>
          <form
            className="w-full lg:w-2/3 md:w-2/3 sm:w-4/5 mx-auto bg-white bg-opacity-70 rounded-lg p-1 pb-2 flex flex-col gap-2 items-center"
            onSubmit={submit}
          >
            <textarea
              className="rounded-lg caret-current w-full resize-y lg:p-4 md:p-2 xs:p-1"
              {...value}
              placeholder="ここに回答を入力してください"
              required
            ></textarea>
            {error ? (
              <small className="text-sm text-red-500">
                エラーが発生しました ({error.message})
              </small>
            ) : null}
            <button
              className="rounded-full flex gap-2 items-center text-white py-2 px-6 bg-gradient-to-r from-gray-800 to-gray-700 hover:bg-gray-600 hover:shadow-sm shadow-md md:text-base xs:text-xs shadow-gray-400"
              disabled={sending}
            >
              {sending ? <Spinner /> : <Chat />}
              回答を送信する
            </button>
            {answerData ? (
              <small className="text-sm text-green-500">
                回答を送信しました
              </small>
            ) : null}
          </form>
        </div>
      </div>
    </div>
  );
};
