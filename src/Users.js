import { useQuery } from "@apollo/react-hooks"
import { gql } from "apollo-boost"

export const GET_USERS_QUERY = gql`
  query getUsers {
    getUsers {
      id
      name
    }
  }
`

export default function Users() {
  const { data, loading, error } = useQuery(GET_USERS_QUERY)
  const users = data?.getUsers
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  
  return (
    <>
      <h2>Users</h2>
      {users.map(user => (
        <ul key={user.id}>
          <li>{user.name}</li>
        </ul>
      ))}
    </>
  )
}