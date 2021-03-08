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