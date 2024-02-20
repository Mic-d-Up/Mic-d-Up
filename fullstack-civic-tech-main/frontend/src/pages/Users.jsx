import { useEffect, useState } from "react";
import { getAllUsers } from "../adapters/user-adapter";
import UserLink from "../components/UserLink";
import UserCard from "../components/UserCard";

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers().then(setUsers);
  }, []);
console.log('hello')
  return <>
    <h1>Users</h1>
    {/* <ul>
      {
        users.map((user) => <li key={user.id}><UserLink user={user} /></li>)
      }
    </ul> */}
    <ul>
    {users.map((user) => (
          <li key={user.id}>
            <UserCard
              username={user.username}
              profile_pic={user.profile_pic}
              artist_type={user.artist_type}
            />
          </li>
        ))}
    </ul>
    {/* <UserCard/> */}
  </>;
}
