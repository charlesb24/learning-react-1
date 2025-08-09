import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Root from './pages/Root';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import EventsRoot from './pages/EventsRoot';
import EventsPage, { loader as eventsLoader } from './pages/EventsPage';
import EventDetailsPage, { loader as eventDetailLoader } from './pages/EventDetailsPage';
import NewEventPage from './pages/NewEventPage';
import EditEventPage from './pages/EditEventPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'events',
        element: <EventsRoot />,
        children: [
          { index: true, element: <EventsPage />, loader: eventsLoader, },
          {
            path: ':id',
            id: 'event-details',
            loader: eventDetailLoader,
            children: [
              { index: true, element: <EventDetailsPage />, },
              { path: 'edit', element: <EditEventPage />, },
            ],
          },
          { path: 'new', element: <NewEventPage />, },
        ]
      }
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
