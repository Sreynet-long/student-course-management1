import { gql } from "@apollo/client"; 

// export const GET_REVIEW_WITH_PAGINATION = gql`
    
// `;

export const ADD_REVIEW = gql`
    mutation AddReview($input: ReviewInput!) {
        addReview(input: $input) {
            isSuccess
            messageKh
            messageEn
        }
    }
`;