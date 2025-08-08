import { Link, useParams } from 'react-router-dom';

function EditEventPage() {
  const { id } = useParams();

  return (
    <>
      <h1>Edit Event</h1>
      <p>Editing event: { id }</p>
      <Link to=".." relative="path">Back</Link>
    </>
  );
}

export default EditEventPage;