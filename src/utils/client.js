import ApolloClient from "apollo-boost"

const {
  REACT_APP_STEPZEN_API_KEY,
  REACT_APP_STEPZEN_ENDPOINT
} = process.env

export const client = new ApolloClient({
  headers: {
    Authorization: `Apikey ${REACT_APP_STEPZEN_API_KEY}`,
  },
  uri: REACT_APP_STEPZEN_ENDPOINT,
})