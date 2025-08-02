import ProductItem from './ProductItem';
import classes from './Products.module.css';

const TEST_PRODUCTS = [
  {
    id: 1,
    price: 5.99,
    title: 'My First Book',
    description: 'The first book I ever wrote',
  },
  {
    id: 2,
    price: 2.99,
    title: 'My Second Book',
    description: 'The second book I ever wrote',
  },
  {
    id: 3,
    price: 7.99,
    title: 'My Third Book',
    description: 'The third book I ever wrote',
  },
  {
    id: 4,
    price: 4.99,
    title: 'My Fourth Book',
    description: 'The fourth book I ever wrote',
  },
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {TEST_PRODUCTS.map(product => (
          <ProductItem
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
