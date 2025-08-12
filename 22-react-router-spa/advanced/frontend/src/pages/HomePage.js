import { Link } from 'react-router-dom';

import PageContent from '../components/PageContent';

function HomePage() {
  return (
    <PageContent title="Welcome!">
      <p>Browse our events!</p>
      <Link to="events" relative="path">View Events</Link>
    </PageContent>
  );
}

export default HomePage;