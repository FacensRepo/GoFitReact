import { gql } from "@apollo/client";

export const DELETE_CHECKIN = gql`
  mutation DeleteCheckin($id: ID!) {
    deleteCheckin(id: $id) {
      result {
        id
      }
    }
  }
`;
