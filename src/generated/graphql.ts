import client from "undefined";
import type {
        SubscriptionOptions
      } from "@apollo/client";
import { readable } from "svelte/store";
import type { Readable } from "svelte/store";
import gql from "graphql-tag"
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Answer = Node & {
  __typename?: 'Answer';
  content: Scalars['String']['output'];
  id: Scalars['ID']['output'];
};

export type AnswerPayload = {
  __typename?: 'AnswerPayload';
  answer: Answer;
};

export type Connection = {
  edges: Array<Edge>;
  pageInfo?: Maybe<PageInfo>;
};

export type CreateLobbyPayload = {
  __typename?: 'CreateLobbyPayload';
  lobby: Lobby;
};

export type CreateQuestionPayload = {
  __typename?: 'CreateQuestionPayload';
  questions: Array<Question>;
};

export type Edge = {
  cursor: Scalars['String']['output'];
  node: Node;
};

export enum LobbiesQueryOrderBy {
  LobbyId = 'LOBBY_ID'
}

export type Lobby = Node & {
  __typename?: 'Lobby';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  public: Scalars['Boolean']['output'];
};

export type LobbyConnection = Connection & {
  __typename?: 'LobbyConnection';
  edges: Array<LobbyEdge>;
  pageInfo: PageInfo;
};

export type LobbyEdge = Edge & {
  __typename?: 'LobbyEdge';
  cursor: Scalars['String']['output'];
  node: Lobby;
};

export type Mutation = {
  __typename?: 'Mutation';
  answer: AnswerPayload;
  createLobby: CreateLobbyPayload;
  createQuestions: CreateQuestionPayload;
  deleteLobby: Lobby;
  publishQuestion: PublishQuestionPayload;
  signin: SigninPayload;
};


export type MutationAnswerArgs = {
  answer: Scalars['String']['input'];
  questionId: Scalars['ID']['input'];
};


export type MutationCreateLobbyArgs = {
  name: Scalars['String']['input'];
  public?: Scalars['Boolean']['input'];
};


export type MutationCreateQuestionsArgs = {
  lobbyId: Scalars['ID']['input'];
  questions: Array<QuestionInput>;
};


export type MutationDeleteLobbyArgs = {
  id: Scalars['ID']['input'];
};


export type MutationPublishQuestionArgs = {
  lobbyId: Scalars['ID']['input'];
  questionId: Scalars['ID']['input'];
};


export type MutationSigninArgs = {
  name: Scalars['String']['input'];
};

export type Node = {
  id: Scalars['ID']['output'];
};

export enum OrderDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type PageInfo = {
  __typename?: 'PageInfo';
  cursor: Scalars['String']['output'];
  hasNextPage: Scalars['Boolean']['output'];
};

export type PublishQuestionPayload = {
  __typename?: 'PublishQuestionPayload';
  question: Question;
};

export type Query = {
  __typename?: 'Query';
  lobbies: LobbyConnection;
  lobby?: Maybe<Lobby>;
  questions: Array<Question>;
};


export type QueryLobbiesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: LobbiesQueryOrderBy;
  orderDirection?: OrderDirection;
};


export type QueryLobbyArgs = {
  id: Scalars['ID']['input'];
};


export type QueryQuestionsArgs = {
  lobbyId: Scalars['ID']['input'];
};

export type Question = Node & {
  __typename?: 'Question';
  answers: Array<Answer>;
  id: Scalars['ID']['output'];
  orderNumber: Scalars['Int']['output'];
  score: Scalars['Int']['output'];
  title: Scalars['String']['output'];
};

export type QuestionInput = {
  orderNumber: Scalars['Int']['input'];
  score: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};

export type SigninPayload = {
  __typename?: 'SigninPayload';
  user: User;
};

export type Subscription = {
  __typename?: 'Subscription';
  currentQuestion: Question;
};


export type SubscriptionCurrentQuestionArgs = {
  lobbyId: Scalars['ID']['input'];
};

export type User = Node & {
  __typename?: 'User';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type CurrentQuestionSubscriptionVariables = Exact<{
  lobbyId: Scalars['ID']['input'];
}>;


export type CurrentQuestionSubscription = { __typename?: 'Subscription', currentQuestion: { __typename?: 'Question', id: string, title: string, orderNumber: number, score: number } };


export const CurrentQuestionDoc = gql`
    subscription CurrentQuestion($lobbyId: ID!) {
  currentQuestion(lobbyId: $lobbyId) {
    id
    title
    orderNumber
    score
  }
}
    `;
export const CurrentQuestion = (
            options: Omit<SubscriptionOptions<CurrentQuestionSubscriptionVariables>, "query">
          ) => {
            const q = client.subscribe<CurrentQuestionSubscription, CurrentQuestionSubscriptionVariables>(
              {
                query: CurrentQuestionDoc,
                ...options,
              }
            )
            return q;
          }