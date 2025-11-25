import { gql } from "@apollo/client";

export const USER_HISTORIC = gql`
  query ListHistoricType($sort: [UserHistoricTypeSortInput]) {
    listHistoricType(sort: $sort) {
      count
      endKeyset
      startKeyset
      results {
        checkinId
        createdAt
        gameTypeId
        id
        points
        updateAt
        userId
        userTotalPoints
        userWeeklyPoints
        weeklyRank
        user {
          name
        }
      }
    }
  }
`;
