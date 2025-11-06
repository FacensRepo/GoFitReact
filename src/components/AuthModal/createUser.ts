import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      result {
        active
        createdAt
        email
        id
        name
        updatedAt
      }
    }
  }
`;
