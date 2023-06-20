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
  ID: { input: string | number; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type Answer = Node & {
  __typename?: 'Answer';
  content: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  owner: User;
  score?: Maybe<Score>;
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
  LobbyId = 'LOBBY_ID',
}

export type Lobby = Node & {
  __typename?: 'Lobby';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  owner: User;
  public: Scalars['Boolean']['output'];
  questions: Array<Question>;
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

export enum LobbyStatus {
  Active = 'ACTIVE',
  Finished = 'FINISHED',
  Waiting = 'WAITING',
}

export enum Mark {
  Correct = 'CORRECT',
  Incorrect = 'INCORRECT',
  Neutral = 'NEUTRAL',
}

export type Mutation = {
  __typename?: 'Mutation';
  answer: AnswerPayload;
  createLobby: CreateLobbyPayload;
  createQuestions: CreateQuestionPayload;
  deleteLobby: Lobby;
  publishLobbyStatus: PublishLobbyStatusPayload;
  publishQuestion: PublishQuestionPayload;
  scoring: ScoringPayload;
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

export type MutationPublishLobbyStatusArgs = {
  lobbyId: Scalars['ID']['input'];
  status: LobbyStatus;
};

export type MutationPublishQuestionArgs = {
  lobbyId: Scalars['ID']['input'];
  questionId: Scalars['ID']['input'];
};

export type MutationScoringArgs = {
  answerId: Scalars['ID']['input'];
  mark: Mark;
  value: Scalars['Int']['input'];
};

export type MutationSigninArgs = {
  name: Scalars['String']['input'];
};

export type Node = {
  id: Scalars['ID']['output'];
};

export enum OrderDirection {
  Asc = 'ASC',
  Desc = 'DESC',
}

export type PageInfo = {
  __typename?: 'PageInfo';
  cursor: Scalars['String']['output'];
  hasNextPage: Scalars['Boolean']['output'];
};

export type PublishLobbyStatusPayload = {
  __typename?: 'PublishLobbyStatusPayload';
  lobby: Lobby;
  status: LobbyStatus;
};

export type PublishQuestionPayload = {
  __typename?: 'PublishQuestionPayload';
  question: Question;
};

export type Query = {
  __typename?: 'Query';
  lobbies: LobbyConnection;
  lobby: Lobby;
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

export type Score = {
  __typename?: 'Score';
  mark: Mark;
  value: Scalars['Int']['output'];
};

export type ScoringPayload = {
  __typename?: 'ScoringPayload';
  answer: Answer;
};

export type SigninPayload = {
  __typename?: 'SigninPayload';
  user: User;
};

export type Subscription = {
  __typename?: 'Subscription';
  currentQuestion: Question;
  lobbyStatus: LobbyStatus;
};

export type SubscriptionCurrentQuestionArgs = {
  lobbyId: Scalars['ID']['input'];
};

export type SubscriptionLobbyStatusArgs = {
  lobbyId: Scalars['ID']['input'];
};

export type User = Node & {
  __typename?: 'User';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type AnswerItemFragment = {
  __typename?: 'Answer';
  id: string;
  content: string;
  owner: { __typename?: 'User'; id: string; name: string };
  score?: { __typename?: 'Score'; mark: Mark; value: number } | null;
} & { ' $fragmentName'?: 'AnswerItemFragment' };

export type ScoringMutationMutationVariables = Exact<{
  answerId: Scalars['ID']['input'];
  mark: Mark;
  score: Scalars['Int']['input'];
}>;

export type ScoringMutationMutation = {
  __typename?: 'Mutation';
  scoring: {
    __typename?: 'ScoringPayload';
    answer: { __typename?: 'Answer' } & { ' $fragmentRefs'?: { AnswerItemFragment: AnswerItemFragment } };
  };
};

export type SignInMutationVariables = Exact<{
  name: Scalars['String']['input'];
}>;

export type SignInMutation = {
  __typename?: 'Mutation';
  signin: { __typename?: 'SigninPayload'; user: { __typename?: 'User'; id: string; name: string } };
};

export type FetchLobbiesQueryVariables = Exact<{
  cursor?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;

export type FetchLobbiesQuery = {
  __typename?: 'Query';
  lobbies: {
    __typename?: 'LobbyConnection';
    edges: Array<{
      __typename?: 'LobbyEdge';
      cursor: string;
      node: {
        __typename?: 'Lobby';
        id: string;
        name: string;
        public: boolean;
        owner: { __typename?: 'User'; id: string };
      };
    }>;
    pageInfo: { __typename?: 'PageInfo'; cursor: string; hasNextPage: boolean };
  };
};

export type CurrentQuestionSubscriptionSubscriptionVariables = Exact<{
  lobbyId: Scalars['ID']['input'];
}>;

export type CurrentQuestionSubscriptionSubscription = {
  __typename?: 'Subscription';
  currentQuestion: { __typename?: 'Question'; id: string; title: string; orderNumber: number; score: number };
};

export type CreateAnswerMutationMutationVariables = Exact<{
  questionId: Scalars['ID']['input'];
  answer: Scalars['String']['input'];
}>;

export type CreateAnswerMutationMutation = {
  __typename?: 'Mutation';
  answer: { __typename?: 'AnswerPayload'; answer: { __typename?: 'Answer'; id: string; content: string } };
};

export type LobbyStatusSubscriptionVariables = Exact<{
  lobbyId: Scalars['ID']['input'];
}>;

export type LobbyStatusSubscription = { __typename?: 'Subscription'; lobbyStatus: LobbyStatus };

export type QuestionItemFragment = {
  __typename?: 'Question';
  id: string;
  title: string;
  orderNumber: number;
  score: number;
  answers: Array<{ __typename?: 'Answer' } & { ' $fragmentRefs'?: { AnswerItemFragment: AnswerItemFragment } }>;
} & { ' $fragmentName'?: 'QuestionItemFragment' };

export type FetchLobbyQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type FetchLobbyQuery = {
  __typename?: 'Query';
  lobby: {
    __typename?: 'Lobby';
    id: string;
    name: string;
    public: boolean;
    owner: { __typename?: 'User'; id: string; name: string };
    questions: Array<
      { __typename?: 'Question' } & { ' $fragmentRefs'?: { QuestionItemFragment: QuestionItemFragment } }
    >;
  };
};

export type PublishLobbyStatusMutationVariables = Exact<{
  lobbyId: Scalars['ID']['input'];
  status: LobbyStatus;
}>;

export type PublishLobbyStatusMutation = {
  __typename?: 'Mutation';
  publishLobbyStatus: {
    __typename?: 'PublishLobbyStatusPayload';
    status: LobbyStatus;
    lobby: { __typename?: 'Lobby'; id: string; name: string };
  };
};

export type PublishQuestionMutationMutationVariables = Exact<{
  lobbyId: Scalars['ID']['input'];
  questionId: Scalars['ID']['input'];
}>;

export type PublishQuestionMutationMutation = {
  __typename?: 'Mutation';
  publishQuestion: { __typename?: 'PublishQuestionPayload'; question: { __typename?: 'Question'; id: string } };
};

export const AnswerItemFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AnswerItem' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Answer' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'content' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'owner' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'score' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'mark' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AnswerItemFragment, unknown>;
export const QuestionItemFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'QuestionItem' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Question' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'orderNumber' } },
          { kind: 'Field', name: { kind: 'Name', value: 'score' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'answers' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AnswerItem' } }],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AnswerItem' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Answer' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'content' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'owner' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'score' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'mark' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<QuestionItemFragment, unknown>;
export const ScoringMutationDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'ScoringMutation' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'answerId' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'mark' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Mark' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'score' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'scoring' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'answerId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'answerId' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'mark' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'mark' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'value' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'score' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'answer' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AnswerItem' } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AnswerItem' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Answer' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'content' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'owner' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'score' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'mark' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ScoringMutationMutation, ScoringMutationMutationVariables>;
export const SignInDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'SignIn' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'signin' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'name' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SignInMutation, SignInMutationVariables>;
export const FetchLobbiesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'FetchLobbies' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'cursor' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'lobbies' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'first' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'after' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'cursor' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'edges' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'node' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'public' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'owner' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
                              },
                            },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'cursor' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'pageInfo' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'cursor' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'hasNextPage' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<FetchLobbiesQuery, FetchLobbiesQueryVariables>;
export const CurrentQuestionSubscriptionDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'subscription',
      name: { kind: 'Name', value: 'CurrentQuestionSubscription' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'lobbyId' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'currentQuestion' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'lobbyId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'lobbyId' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'orderNumber' } },
                { kind: 'Field', name: { kind: 'Name', value: 'score' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CurrentQuestionSubscriptionSubscription, CurrentQuestionSubscriptionSubscriptionVariables>;
export const CreateAnswerMutationDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateAnswerMutation' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'questionId' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'answer' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'answer' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'questionId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'questionId' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'answer' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'answer' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'answer' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'content' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateAnswerMutationMutation, CreateAnswerMutationMutationVariables>;
export const LobbyStatusDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'subscription',
      name: { kind: 'Name', value: 'LobbyStatus' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'lobbyId' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'lobbyStatus' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'lobbyId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'lobbyId' } },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LobbyStatusSubscription, LobbyStatusSubscriptionVariables>;
export const FetchLobbyDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'FetchLobby' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'lobby' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'public' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'owner' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'questions' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'QuestionItem' } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AnswerItem' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Answer' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'content' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'owner' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'score' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'mark' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'QuestionItem' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Question' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'orderNumber' } },
          { kind: 'Field', name: { kind: 'Name', value: 'score' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'answers' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AnswerItem' } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<FetchLobbyQuery, FetchLobbyQueryVariables>;
export const PublishLobbyStatusDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'PublishLobbyStatus' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'lobbyId' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'status' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'LobbyStatus' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'publishLobbyStatus' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'lobbyId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'lobbyId' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'status' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'status' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'lobby' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PublishLobbyStatusMutation, PublishLobbyStatusMutationVariables>;
export const PublishQuestionMutationDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'PublishQuestionMutation' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'lobbyId' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'questionId' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'publishQuestion' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'lobbyId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'lobbyId' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'questionId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'questionId' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'question' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PublishQuestionMutationMutation, PublishQuestionMutationMutationVariables>;
