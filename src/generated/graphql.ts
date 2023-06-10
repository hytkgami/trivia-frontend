/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
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
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
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

export type FetchLobbiesQueryVariables = Exact<{
  cursor?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type FetchLobbiesQuery = { __typename?: 'Query', lobbies: { __typename?: 'LobbyConnection', edges: Array<{ __typename?: 'LobbyEdge', cursor: string, node: { __typename?: 'Lobby', id: string, name: string, public: boolean } }>, pageInfo: { __typename?: 'PageInfo', cursor: string, hasNextPage: boolean } } };


export const FetchLobbiesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FetchLobbies"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lobbies"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"public"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}}]} as unknown as DocumentNode<FetchLobbiesQuery, FetchLobbiesQueryVariables>;