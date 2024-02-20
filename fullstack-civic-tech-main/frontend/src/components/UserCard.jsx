 export default function UserCard({ username, name, profile_pic, artist_type }) {

    return (
        <>
    <div className="card">
  <div className="card-content">
    <div className="media">
      <div className="media-left">
        <figure className="profile-pic">
          <img src={profile_pic} alt="Placeholder image"/>
        </figure>
      </div>
      <div className="media-content">
        <p className="display-name">{name}</p>
        <p className="artist-type">{artist_type}</p>
        <p className="username">{username}</p>
      </div>
    </div>
  </div>
</div>
</>
);
};

