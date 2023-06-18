import { Container } from './layouts/Container';

export const Main = () => {
  return (
    <div>
      <div className="flex flex-col">
        <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32 h-[calc(100vh_-_4rem)]">
          <div
            className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
            aria-hidden="true"
          >
            <div
              className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#6ee7b7] to-[#6366f1] opacity-20"
              style={{
                clipPath:
                  'polygon(70.9% 52.8%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 70.9% 52.8%)',
              }}
            />
          </div>
          <div
            className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
            aria-hidden="true"
          >
            <div
              className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#e11d48] to-[#6366f1] opacity-40"
              style={{
                clipPath:
                  'polygon(70.9% 52.8%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 70.9% 52.8%)',
              }}
            />
          </div>
          <Container>
            <div className="max-w-2xl lg:mx-0 h-full my-auto">
              <h2 className="text-4xl font-bold tracking-normal text-white sm:text-6xl">
                <span className="tracking-wide">Trivia</span> へようこそ
              </h2>
              <p className="mt-16 text-lg leading-8 text-gray-300 dark:text-gray-200">
                Triviaは、あなたの知識を試すクイズアプリです。
                <br />
                ロビーに参加して、クイズを楽しみましょう！
                <br />
                または、ロビーを作成して出題者になることもできます。
                <br />
                あなたの出題したクイズを他の人に解いてもらいましょう！
              </p>
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};
