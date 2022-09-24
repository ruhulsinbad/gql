import { gql } from "@apollo/client";

export const SIGN_UP = gql`
  mutation SignUp($user: userInput!) {
    signUp(user: $user) {
      id
      name
      email
      password
    }
  }
`;

export const LOGIN = gql`
  mutation Login($user: loginInput!) {
    login(user: $user) {
      token
    }
  }
`;

export const CREATE_QUOTE = gql`
  mutation CreateQuote($title: String!) {
    createQuote(title: $title) {
      by
      name
      title
      email
    }
  }
`;
