// import { useContext } from 'react';

import Card from '../UI/Card';
// import { ProductsContext } from '../../context/products-context';
import { useStore } from '../../store-hook/store';
import './ProductItem.css';


const ProductItem = props => {
  // const { toggleFav } = useContext(ProductsContext);
  const dispatch = useStore(false)[1]

  function handleToggleFav() {
    dispatch('TOGGLE_FAV', props.id);
  }

  return (
    <Card style={{ marginBottom: '1rem' }}>
      <div className="product-item">
        <h2 className={props.isFav ? 'is-fav' : ''}>{props.title}</h2>
        <p>{props.description}</p>
        <button
          className={!props.isFav ? 'button-outline' : ''}
          onClick={handleToggleFav}
        >
          {props.isFav ? 'Un-Favorite' : 'Favorite'}
        </button>
      </div>
    </Card>
  );
};

export default ProductItem;
