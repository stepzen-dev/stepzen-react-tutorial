# StepZen React Tutorial

## Overview

The client will query a GraphQL API created from the JSONPlaceholder API. We are able to use the [`@rest` directive](https://stepzen.com/blog/how-to-connect-any-rest-backend) to easily translate the API into a GraphQL schema.

![05-unordered-list-of-users](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/6667k39b37vmhz2xokwc.png)

## API Setup

### Clone repository and install dependencies

```
git clone https://github.com/stepzen-samples/stepzen-react-tutorial
cd stepzen-react-tutorial
npm i
```

### Deploy API

The `stepzen start` command uploads and deploys your API automatically.

```bash
stepzen start
```

A browser window with a GraphiQL query editor can be used to query your new endpoint on `localhost:5000`. Enter the following query to test your endpoint:

```graphql
query getUsers {
  getUsers {
    id
    name
  }
}
```

![03-graphql-api-explorer](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/i7bbyjnbkgb05u1i6w75.png)

### index.graphql defines all files making up the GraphQL schema

Every StepZen project requires an `index.graphql` that ties together all of our schemas. For this example we just have the `users.graphql` file included in our `@sdl` directive. The `@sdl` directive is a StepZen directive that specifies the list of files to assemble.

```graphql
# stepzen/index.graphql

schema
  @sdl(
    files: [ "schema/users.graphql" ]
  ) {
  query: Query
}
```

The `User` type includes an `id` for each `User` and information about the `User` such as their `name` and `email`. For our `Query` we just have a single query called `getUsers` that returns an array of `User` objects. The `@rest` directive accepts the `endpoint` from JSONPlaceholder.

```graphql
# stepzen/schema/users.graphql

type User {
  id: ID!
  name: String!
  username: String!
  email: String!
  phone: String!
  website: String!
}

type Query {
  getUsers: [User]
    @rest(
      endpoint:"https://jsonplaceholder.typicode.com/users"
    )
}
```

## Frontend Setup

### Create `.env` file

```
touch .env
```

This also deployed our API to `https://username.stepzen.net/stepzen-react-tutorial/users/__graphql`. Fill in your username and set the URL to the `REACT_APP_STEPZEN_ENDPOINT` environment variable. Include your StepZen API key for the `REACT_APP_STEPZEN_API_KEY` environment variable.

```
REACT_APP_STEPZEN_API_KEY=YOUR_KEY_HERE
REACT_APP_STEPZEN_ENDPOINT=YOUR_ENDPOINT_HERE
```

Start the development server on `localhost:3000`.

```
npm start
```

![05-unordered-list-of-users](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/6667k39b37vmhz2xokwc.png)

### Troubleshoot

Environment variables are tricky, if you are having trouble getting your frontend to connect to your endpoint here are a few things you can double check:
* Make sure you are following the correct [naming convention](https://create-react-app.dev/docs/adding-custom-environment-variables/) for the environment variables
* Make sure you are setting the deployed endpoint and not the endpoint running on localhost
* Make sure you are using your API key and not your Admin key
* Make sure there aren't any extra [whitespace characters](https://en.wikipedia.org/wiki/Whitespace_character) between the variable names and the actual keys

When in doubt you can `console.log` lines 4-5 in `client.js` to see if your keys are being set correctly with the Apollo client.

### index.html

```html
<!-- public/index.html -->

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1"
    />
    <meta
      name="theme-color"
      content="#000000"
    />
    <meta
      name="description"
      content="How to use Apollo Client to Connect a React Frontend to a GraphQL API"
    />

    <title>React + StepZen App</title>
  </head>
  
  <body>
    <noscript>
      You need to enable JavaScript to run this app.
    </noscript>

    <div id="root"></div>
    <!--
      This HTML file is a template.
    -->
  </body>
</html>
```

### index.js

```jsx
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

### client.js

```jsx
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

```jsx
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

### Users.js

```jsx
// src/components/Users.js

import { useQuery } from "@apollo/react-hooks"
import { GET_USERS_QUERY } from "../queries/getUsers.js"

export default function Users() {
  const {
    data,
    loading,
    error
  } = useQuery(GET_USERS_QUERY)

  const users = data?.getUsers
  
  if (loading) return <p>Almost there...</p>
  if (error) return <p>{error.message}</p>
  
  return (
    <>
      <h2>Users</h2>
      
      {users.map(user => (
        <ul key={user.id}>
          <li>
            {user.name}
          </li>
        </ul>
      ))}
    </>
  )
}
```

### getUsers.js

```jsx
// src/queries/getUsers.js

import { gql } from "graphql-tag"

export const GET_USERS_QUERY = gql`
  query getUsers {
    getUsers {
      id
      name
    }
  }
`
```
