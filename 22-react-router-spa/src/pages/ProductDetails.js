import { useParams } from 'react-router-dom';

function ProductDetails() {
  const { id } = useParams();

  return (
    <>
      <h1>Product Details</h1>
      <p>You are viewing <span>{ id }</span></p>
    </>
  );
}

export default ProductDetails;