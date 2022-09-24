import { gql } from "@apollo/client";
export const GET_QUOTE = gql`
  query getAllQuote {
    quotes {
      title
      by
      name
      email
    }
  }
`;

export const GET_MY_PROFILE = gql`
  query MyProfile {
    myprofile {
      id
      name
      email
      password
      quotes {
        title
        by
        name
        email
      }
    }
  }
`;

export const GET_OTHERS_PROFILE = gql`
  query GetUserById($id: ID!) {
    user(id: $id) {
      id
      name
      email
      password
      quotes {
        by
        title
        name
        email
      }
    }
  }
`;
