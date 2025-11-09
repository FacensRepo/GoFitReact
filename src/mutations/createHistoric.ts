import { gql } from "@apollo/client";

export const CREATE_HISTORIC = gql`
mutation CreateHistoricType {
    createHistoricType(
        $input: CreateHistoricTypeInput!
    ) {
        result {
            createdAt
            gameTypeId
            id
            points
            updateAt
            userId
        }
    }
}
`;
