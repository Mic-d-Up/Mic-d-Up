import { Link } from "react-router-dom";
import DefaultImageUrl from "../img/default-profile-picture.png";
// import "../"

export default function UserCard({ user }) {
  return (
      <ul className="card-container">
        <li className="card">
          <div className="card-content">
            <div className="media">
              <div className="media-left">
                <figure className="image is-48x48">
                  <img src={user.profile_pic ? user.profile_pic :  DefaultImageUrl} 
                       alt="Placeholder image"/>
                </figure>
              </div>
              <div className="media-content">
                <Link to={`/users/${user.id}`} className="title is-4">{user.username}</Link>              
                <p className="subtitle is-6">{user.artist_type}</p>
                <p className="subtitle is-6">{user.name}</p>
              </div>
            </div>
          </div>
        </li>
      </ul>
  );
};
