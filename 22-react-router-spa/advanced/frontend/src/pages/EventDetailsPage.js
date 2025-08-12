import { Suspense } from 'react';
import { redirect, useRouteLoaderData, Await } from 'react-router-dom';

import EventItem from '../components/EventItem';
import EventsList from "../components/EventsList";

function EventDetailsPage() {
  const { eventDetails, events } = useRouteLoaderData('event-details');

  return (
    <>

      <Suspense fallback={<p style={{ textAlign: 'center', }}>Loading event details...</p>}>
        <Await resolve={eventDetails}>
          { loadedEventDetails => <EventItem event={loadedEventDetails}/> }
        </Await>
      </Suspense>

      <Suspense fallback={<p style={{ textAlign: 'center', }}>Loading events...</p>}>
        <Await resolve={events}>
          { loadedEvents => <EventsList events={loadedEvents}/> }
        </Await>
      </Suspense>

    </>
  );
}

export default EventDetailsPage;

async function loadEventDetails(id) {
  const res = await fetch(`http://localhost:8080/events/${id}`);

  if (!res.ok) {
    throw new Response(JSON.stringify({ message: 'Could not fetch details for selected event.', }), { status: 500, });
  }

  const data = await res.json();

  return data.event;
}

async function loadEvents() {
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'Could not fetch events.', }), { status: 500 });
  }

  const data = await response.json();

  return data.events;
}

export async function loader({ request, params }) {
  return {
    eventDetails: await loadEventDetails(params.id),
    events: loadEvents(),
  };
}

export async function action({ request, params}) {
  const res = await fetch(`http://localhost:8080/events/${params.id}`, {
    method: request.method,
  });

  if (!res.ok) {
    throw new Response(JSON.stringify({ message: 'Could not delete event.', }), { status: 500, });
  }

  return redirect('/events');
}