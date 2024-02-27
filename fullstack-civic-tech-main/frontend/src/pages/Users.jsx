import { useEffect, useState } from "react";
import { getAllUsers } from "../adapters/user-adapter";
import UserCard from "../components/UserCard";

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers().then(setUsers);
  }, []);

  return (
    <div className="card-container">
      <h1>Users</h1>
      <div className="cards-wrapper">
        {users.map((user) => (
          <div className="cardli" key={user.id}>
            <UserCard user={user} />
          </div>
        ))}
      </div>
    </div>
  );
}
