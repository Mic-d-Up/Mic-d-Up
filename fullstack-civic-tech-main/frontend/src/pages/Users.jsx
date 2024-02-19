import { useEffect, useState } from "react";
import { getAllUsers } from "../adapters/user-adapter";
import UserCard from "../components/UserCard";

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers().then(setUsers);
  }, []);

  return <>
    <h1>Users</h1>
    <ul>
      {
        users.map((user) => (
          <li key={user.id}>
            <UserCard
              user={user}
            />
          </li>))
      }
    </ul>
  </>;
}
