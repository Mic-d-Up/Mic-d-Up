 export default function UserCard({ username, profile_pic, artist_type }) {

    return (
        <>
    <div class="card">
  <div className="card-content">
    <div className="media">
      <div className="media-left">
        <figure className="image is-48x48">
          <img src={profile_pic} alt="Placeholder image"/>
        </figure>
      </div>
      <div className="media-content">
        <p className="title is-4">{username}</p>
        <p className="subtitle is-6">{artist_type}</p>
      </div>
    </div>
  </div>
</div>
</>
);
};

