import React from "react";
import ReactDOM from "react-dom";
import Users from "./Users";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

const {
  REACT_APP_STEPZEN_API_KEY,
  REACT_APP_STEPZEN_ENDPOINT
} = process.env;

const client = new ApolloClient({
  headers: {
    Authorization: `Apikey ${REACT_APP_STEPZEN_API_KEY}`,
  },
  uri: REACT_APP_STEPZEN_ENDPOINT,
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <h1>StepZen React Tutorial</h1>
      <Users />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);