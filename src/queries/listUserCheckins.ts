import { gql } from "@apollo/client";

export const LIST_USER_CHECKINS = gql`
  query ListUserCheckins($userId: ID!) {
    listUserCheckins(userId: $userId) {
      id
      day
      createdAt
      userId
    }
  }
`;
