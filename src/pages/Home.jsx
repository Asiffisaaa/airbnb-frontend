import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/location">Location Page</Link></li>
          <li><Link to="/location/1">Listing Details (ID: 1)</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
