import { gql } from "@apollo/client";

export const WEEKLY_RANKING = gql`
  query WeeklyRanking {
    weeklyRanking {
      id
      name
      userHistorics {
        points
      }
    }
  }
`;
