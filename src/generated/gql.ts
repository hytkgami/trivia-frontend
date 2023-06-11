/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation SignIn($name: String!) {\n    signin(name: $name) {\n      user {\n        id\n        name\n      }\n    }\n  }\n": types.SignInDocument,
    "\n  query FetchLobbies($cursor: ID, $limit: Int) {\n    lobbies(first: $limit, after: $cursor) {\n      edges {\n        node {\n          id\n          name\n          public\n          owner {\n            id\n          }\n        }\n        cursor\n      }\n      pageInfo {\n        cursor\n        hasNextPage\n      }\n    }\n  }\n": types.FetchLobbiesDocument,
    "\n  subscription CurrentQuestionSubscription($lobbyId: ID!) {\n    currentQuestion(lobbyId: $lobbyId) {\n      id\n      title\n      orderNumber\n      score\n    }\n  }\n": types.CurrentQuestionSubscriptionDocument,
    "\n  mutation CreateAnswerMutation($questionId: ID!, $answer: String!) {\n    answer(questionId: $questionId, answer: $answer) {\n      answer {\n        id\n        content\n      }\n    }\n  }\n": types.CreateAnswerMutationDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SignIn($name: String!) {\n    signin(name: $name) {\n      user {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation SignIn($name: String!) {\n    signin(name: $name) {\n      user {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FetchLobbies($cursor: ID, $limit: Int) {\n    lobbies(first: $limit, after: $cursor) {\n      edges {\n        node {\n          id\n          name\n          public\n          owner {\n            id\n          }\n        }\n        cursor\n      }\n      pageInfo {\n        cursor\n        hasNextPage\n      }\n    }\n  }\n"): (typeof documents)["\n  query FetchLobbies($cursor: ID, $limit: Int) {\n    lobbies(first: $limit, after: $cursor) {\n      edges {\n        node {\n          id\n          name\n          public\n          owner {\n            id\n          }\n        }\n        cursor\n      }\n      pageInfo {\n        cursor\n        hasNextPage\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription CurrentQuestionSubscription($lobbyId: ID!) {\n    currentQuestion(lobbyId: $lobbyId) {\n      id\n      title\n      orderNumber\n      score\n    }\n  }\n"): (typeof documents)["\n  subscription CurrentQuestionSubscription($lobbyId: ID!) {\n    currentQuestion(lobbyId: $lobbyId) {\n      id\n      title\n      orderNumber\n      score\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateAnswerMutation($questionId: ID!, $answer: String!) {\n    answer(questionId: $questionId, answer: $answer) {\n      answer {\n        id\n        content\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateAnswerMutation($questionId: ID!, $answer: String!) {\n    answer(questionId: $questionId, answer: $answer) {\n      answer {\n        id\n        content\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;