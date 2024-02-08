export default function EventCard  ({ title, imageSrc, description }) {

    return (
    <>
    <div className="event-card">
      <img src={imageSrc} alt={title} className="event-image" />
      <div className="event-details">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div> 
         </>
            )
};