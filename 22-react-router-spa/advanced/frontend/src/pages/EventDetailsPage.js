import { useRouteLoaderData } from 'react-router-dom';

import EventItem from '../components/EventItem';

function EventDetailsPage() {
  const event = useRouteLoaderData('event-details');

  console.log(event);

  return (
    <>
      <EventItem event={event} />
    </>
  );
}

export default EventDetailsPage;

export async function loader({ req, params }) {
  const res = await fetch(`http://localhost:8080/events/${params.id}`);

  if (!res.ok) {
    throw new Response(JSON.stringify({ message: 'Could not fetch details for selected event.', }), { status: 500, });
  }

  const data = await res.json();

  return data.event;
}