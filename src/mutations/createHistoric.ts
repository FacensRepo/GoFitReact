import { gql } from "@apollo/client";

export const CREATE_HISTORIC = gql`
mutation CreateHistoricType($input: CreateHistoricTypeInput!) {
    createHistoricType(input: $input) {
        result {
            createdAt
            gameTypeId
            id
            points
            updateAt
            userId
            checkinId
        }
    }
}
`;
