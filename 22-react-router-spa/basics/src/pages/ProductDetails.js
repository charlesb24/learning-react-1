import { useParams, Link } from 'react-router-dom';

function ProductDetails() {
  const { id } = useParams();

  return (
    <>
      <h1>Product Details</h1>
      <p>You are viewing <span>{ id }</span></p>
      <p><Link to=".." relative="path">Back</Link></p>
    </>
  );
}

export default ProductDetails;