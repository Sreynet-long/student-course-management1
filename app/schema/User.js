import { gql } from "@apollo/client";

export const GET_USER_BY_ID = gql`
    query GetUserbyId($id: ID!) {
        getUserbyId(_id: $id) {
            id
            username
            email
        }
        }
`;
export const GET_USER_WITH_PAGINATION = gql `
    query GetUserWithPagination($page: Int, $limit: Int, $pagination: Boolean, $keyword: String) {
        getUserWithPagination(page: $page, limit: $limit, pagination: $pagination, keyword: $keyword) {
            data {
            id
            username
            phoneNumber
            email
            password
            checked
            token
            }
            paginator {
            slNo
            prev
            next
            perPage
            totalPosts
            totalPages
            currentPage
            hasPrevPage
            hasNextPage
            totalDocs
            }
        }
    }
`;

export const SIGN_UP_USER_FORM = gql`
    mutation SignupUserForm($input: UserSignUpInput) {
        signupUserForm(input: $input) {
            isSuccess
            messageKh
            messageEn
            data {
            id
            username
            phoneNumber
            email
            password
            checked
            token
            }
        }
    }
`;

export const LOGIN_USER_FORM = gql`
    mutation LoginUserForm($input: UserLoginInput) {
        loginUserForm(input: $input) {
            data {
            id
            username
            phoneNumber
            email
            password
            checked
            token
            }
            isSuccess
            messageKh
            messageEn
        }
    }
`;