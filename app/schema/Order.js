import { gql } from "@apollo/client";
export const CREATE_ORDER = gql`
  mutation CreateOrder($input: OrderInput) {
    createOrder(input: $input) {
      isSuccess
      messageKh
      messageEn
    }
  }
`;
export const UPDATE_ORDER_STATUS = gql`
  mutation UpdateOrderStatus($id: ID!, $status: String!) {
    updateOrderStatus(_id: $id, status: $status) {
      isSuccess
      messageKh
      messageEn
    }
  }
`;
