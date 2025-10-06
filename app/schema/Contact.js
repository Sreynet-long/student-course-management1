import { gql } from "@apollo/client";

export const CREATE_CONTACT = gql`
  mutation SubmitContactForm($input: ContactFormInput) {
    submitContactForm(input: $input) {
      isSuccess
      messageKh
      messageEn
    }
  }
`;


