import { gql } from "graphql-tag"

export const GET_USERS_QUERY = gql`
  query getUsers {
    getUsers {
      id
      name
    }
  }
`