import { gql } from "@apollo/client";

export const LIST_GAME_TYPE = gql`
  query ListGameType {
    listGameType {
      count
      endKeyset
      startKeyset
      results {
        id
        name
        weight
      }
    }
  }
`;
