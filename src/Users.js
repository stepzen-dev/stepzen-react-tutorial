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

const Users = () => {
    const { data, loading } = useQuery(GET_USERS_QUERY)
    const users = data?.getUsers
  
    return (
      <>
        <h2>Users</h2>
        {loading ? (<div>Loading</div>) : (
          <pre>
            {JSON.stringify(users, null, "  ")}
          </pre>
        )}
      </>
    )
  }

export default Users