import { Suspense } from 'react';
import { useLoaderData, Await } from 'react-router-dom';

import EventsList from '../components/EventsList';

function EventsPage() {
  const { events } = useLoaderData();

  return (
    <Suspense fallback={<p style={{ textAlign: 'center', }}>Loading...</p>}>
      <Await resolve={events}>
        { loadedEvents => <EventsList events={loadedEvents}/> }
      </Await>
    </Suspense>
  );
}

export default EventsPage;

async function loadEvents() {
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'Could not fetch events.', }), { status: 500 });
  }

  const data = await response.json();

  return data.events;
}

export async function loader() {
  return {
    events: loadEvents(),
  };
}