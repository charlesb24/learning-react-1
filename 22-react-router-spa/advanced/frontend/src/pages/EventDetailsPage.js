import { Link, useParams } from 'react-router-dom';

function EventDetailsPage() {
  const { id } = useParams();

  return (
    <>
      <h1>Event Details</h1>
      <p>Event: { id }.</p>
      <Link to="edit">Edit</Link>
      <Link to=".." relative="path">Back</Link>
    </>
  );
}

export default EventDetailsPage;