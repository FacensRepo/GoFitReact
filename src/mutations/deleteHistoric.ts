import { gql } from "@apollo/client";

export const DELETE_HISTORIC = gql`
  mutation DeleteHistoricType($id: ID!) {
    deleteHistoricType(id: $id) {
      result {
        id
      }
    }
  }
`;
