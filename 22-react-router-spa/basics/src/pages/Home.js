import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <h1>My Homepage</h1>
      <p>View the list of <Link to="products">products</Link>.</p>
    </>
  );
}

export default Home;