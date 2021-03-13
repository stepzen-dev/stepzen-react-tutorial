# StepZen React Tutorial

## Overview

The client will query a GraphQL API created from the JSONPlaceholder API. We are able to use the [`@rest` directive](https://stepzen.com/blog/how-to-connect-any-rest-backend) to easily translate the API into a GraphQL schema.

![05-unordered-list-of-users](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/6667k39b37vmhz2xokwc.png)

## Project Setup

### Clone repository and install dependencies

```
git clone https://github.com/stepzen-samples/stepzen-react-tutorial
cd stepzen-react-tutorial && npm i
```

### Create `.env.local` file

```
touch .env.local
```

### Deploy API

The `stepzen start` command uploads and deploys your API automatically.

```bash
stepzen start stepzen-react-tutorial/users
```

A browser window with a GraphiQL query editor can be used to query your new endpoint.

![03-graphql-api-explorer](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/mr9wywu4doovb3h8j162.png)

This also deployed our API to `https://username.stepzen.net/stepzen-react-tutorial/users/__graphql`. Fill in your username and set the URL to the `REACT_APP_STEPZEN_ENDPOINT` environment variable. Include your StepZen API key for the `REACT_APP_STEPZEN_API_KEY` environment variable.

```
REACT_APP_STEPZEN_API_KEY=YOUR_KEY_HERE
REACT_APP_STEPZEN_ENDPOINT=YOUR_ENDPOINT_HERE
```

Start the development server on `localhost:3000`.

```
npm start
```

## stepzen/schema

### users.graphql

The `User` interface includes an `id` for each `User` and information about the `User` such as their `name` and `email`.

```graphql
# stepzen/schema/users.graphql

interface User {
  id: ID!
  name: String!
  username: String!
  email: String!
  phone: String!
  website: String!
}

type UserBackend implements User {}
```

For our `Query` we have `users` that returns an array of `User` objects, and `user` which accepts an `id` argument and returns a single `User` object. The `@rest` directive accepts the `endpoint` from JSONPlaceholder.

```graphql
# stepzen/schema/users.graphql

type Query {
  users: [User]
  usersBackend: [UserBackend]
    @supplies(query:"users")
    @rest(endpoint:"https://jsonplaceholder.typicode.com/users")

  user(id: ID!): User
  userBackend(id: ID!): UserBackend
    @supplies(query:"user")
    @rest(endpoint:"https://jsonplaceholder.typicode.com/users/$id")
}
```

### index.graphql

Our `schema` in `index.graphql` ties together all of our other schemas. For this example we just have the `users.graphql` file included in our `@sdl` directive.

```graphql
# stepzen/index.graphql

schema
  @sdl(
    files: [ "schema/users.graphql" ]
  ) {
  query: Query
}
```

## React Frontend

### index.js

```javascript
// src/index.js

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
```

### Apollo Client

```javascript
// src/utils/client.js

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
```

### HomePage.js

```javascript
// src/pages/HomePage.js

import Users from "../components/Users"

export default function HomePage() {
  return (
    <>
      <h1>StepZen React Tutorial</h1>
      <Users />
    </>
  )
}
```

### Users

```javascript
// src/components/Users.js

import { useQuery } from "@apollo/react-hooks"
import { GET_USERS_QUERY } from "../queries/getUsers.js"

export default function Users() {
    const {
      data,
      loading,
      error
    } = useQuery(GET_USERS_QUERY)
    
  const users = data?.users
  
  if (loading) return <p>Almost there...</p>
  if (error) return <p>{error.message}</p>
  
  return (
    <>
      <h2>Users</h2>
  
      {users.map(user => (
        <ul key={user.id}>
          <li>
            <h2>{user.name}</h2>
            
            <ul>
              <li>{user.phone}</li>
              <li>{user.email}</li>
              <li>{user.website}</li>
            </ul>
          </li>
        </ul>
      ))}
    </>
  )
}
```

### getUsers

```javascript
// src/queries/getUsers.js

import gql from "graphql-tag"

export const GET_USERS_QUERY = gql`
  query getUsers {
    users {
      id
      name
      email
      phone
      website
    }
  }
`
```