import { Link } from 'react-router-dom';

const events = [
  {
    id: 'event-1',
    title: 'Event 1',
  },
  {
    id: 'event-2',
    title: 'Event 2',
  },
  {
    id: 'event-3',
    title: 'Event 3',
  },
  {
    id: 'event-4',
    title: 'Event 4',
  },
  {
    id: 'event-5',
    title: 'Event 5',
  },
];

function EventsPage() {
  return (
    <>
      <h1>Events</h1>
      <ul>
        { events.map(event => (
          <li key={event.id}><Link to={event.id}>{event.title}</Link></li>
        ))}
      </ul>
      <Link to=".." relative="path">Back</Link>
    </>
  );
}

export default EventsPage;