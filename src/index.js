import React from "react"
import { render } from "react-dom"
import { ApolloProvider } from "@apollo/react-hooks"
import { client } from "./utils/client"
import HomePage from "./pages/HomePage"

render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <HomePage />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
)