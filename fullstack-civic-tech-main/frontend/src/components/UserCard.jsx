 export default function UserCard({ username, name, profile_pic, artist_type }) {

    return (
        <>
    <div className="card">
  <div className="card-content">
    <div className="media">
      <div className="media-left">
        <figure className="image is-48x48">
          <img src={profile_pic ? profile_pic :  "../../public/img/default-profile-picture.png"} 
          alt="Placeholder image"/>
        </figure>
        {console.log(profile_pic)}
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

