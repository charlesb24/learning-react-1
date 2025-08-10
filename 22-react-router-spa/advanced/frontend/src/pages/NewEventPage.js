import { redirect } from 'react-router-dom';

import EventForm from '../components/EventForm';

function NewEventPage() {
  return (
    <EventForm />
  );
}

export default NewEventPage;

export async function action({ request }) {
  const formData = await request.formData();

  const eventData = {
    title: formData.get('title'),
    image: formData.get('image'),
    date: formData.get('date'),
    description: formData.get('description'),
  };

  const res = await fetch('http://localhost:8080/events', {
    method: 'POST',
    body: JSON.stringify(eventData),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Response(JSON.stringify({ message: 'Could not save event.', }), { status: 500, });
  }

  return redirect('/events');
}