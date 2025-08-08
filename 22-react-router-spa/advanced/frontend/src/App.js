import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Root from './pages/Root';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import EventsRoot from './pages/EventsRoot';
import EventsPage, { eventsLoader } from './pages/EventsPage';
import EventDetailsPage from './pages/EventDetailsPage';
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
          { path: ':id', element: <EventDetailsPage />, },
          { path: 'new', element: <NewEventPage />, },
          { path: ':id/edit', element: <EditEventPage />, },
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
