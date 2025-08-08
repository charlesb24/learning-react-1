import { Link } from 'react-router-dom';

function NewEventPage() {
  return (
    <>
      <h1>Add a New Event</h1>
      <Link to=".." relative="path">Back</Link>
    </>
  );
}

export default NewEventPage;