import { gql } from "@apollo/client";

export const GET_PRODUCT_WITH_PAGINATION = gql `
    query GetProductWithPagination($page: Int, $limit: Int, $pagination: Boolean, $keyword: String, $category: Category) {
        getProductWithPagination(page: $page, limit: $limit, pagination: $pagination, keyword: $keyword, category: $category) {
            data {
            id
            name
            category
            imageUrl
            desc
            price
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

export const GET_ALL_PRODUCT = gql `
    query GetAllproducts {
        getAllproducts {
            id
            name
            category
            imageUrl
            desc
            price
        }
    }
`;

export const CREATE_PRODUCT = gql `
    mutation CreateProduct($input: ProductInput) {
        createProduct(input: $input) {
            isSuccess
            messageKh
            messageEn
        }
    }
`;
export const UPDATE_PRODUCT = gql `
    mutation UpdateProduct($id: ID!, $input: ProductInput) {
        updateProduct(_id: $id, input: $input) {
            isSuccess
            messageKh
            messageEn
        }
    }
`;
export const DELETE_PRODUCT = gql `
    mutation DeleteProduct($id: ID!) {
        deleteProduct(_id: $id) {
            isSuccess
            messageKh
            messageEn
        }
    }
`;
