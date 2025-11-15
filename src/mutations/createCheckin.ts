import { gql } from "@apollo/client";

export const CREATE_CHECKIN = gql`
  mutation CreateCheckin($input: CreateCheckinInput!) {
    createCheckin(input: $input) {
      result {
        id
        day
        createdAt
        userId
      }
    }
  }
`;
