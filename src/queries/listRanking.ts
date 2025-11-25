import { gql } from "@apollo/client";

export const LIST_RANK = gql`
  query ListRank($sort: [UserHistoricTypeSortInput]) {
    listRank(sort: $sort) {
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
`;
