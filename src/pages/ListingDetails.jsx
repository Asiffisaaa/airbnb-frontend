import { Link, useParams } from 'react-router-dom';

const ListingDetails = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Listing Details Page — ID: {id}</h1>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/location">Location Page</Link></li>
          <li><Link to={`/listing/${id}`}>Current Listing Details</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default ListingDetails;
