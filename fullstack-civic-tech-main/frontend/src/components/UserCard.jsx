import { Link } from "react-router-dom";

export default function UserCard({ user }) {

  return (
    <Link to={`/users/${user.id}`}>
      <div className="card">
        <div className="card-content">
          <div className="media">
            <div className="media-content">
              <p className="title is-4">{user.username}</p>
              <p className="subtitle is-6">{user.artist_type}</p>
              <p className="subtitle is-6">{user.name}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

