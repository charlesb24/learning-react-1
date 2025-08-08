import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <>
      <h1>Home Page</h1>
      <Link to="events" relative="path">View Events</Link>
    </>
  );
}

export default HomePage;