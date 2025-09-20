import { createContext, useState } from 'react';

const initialState = {
  products: [],
  toggleFav: (id) => {},
};

export const ProductsContext = createContext(initialState);

export default function ProductsProvider({ children}) {
  const [ productList, setProductList ] = useState([
    {
      id: 'p1',
      title: 'Red Scarf',
      description: 'A pretty red scarf.',
      isFavorite: false
    },
    {
      id: 'p2',
      title: 'Blue T-Shirt',
      description: 'A pretty blue t-shirt.',
      isFavorite: false
    },
    {
      id: 'p3',
      title: 'Green Trousers',
      description: 'A pair of lightly green trousers.',
      isFavorite: false
    },
    {
      id: 'p4',
      title: 'Orange Hat',
      description: 'Street style! An orange hat.',
      isFavorite: false
    }
  ]);

  function toggleFavorite(id) {
    setProductList(currentList => {
      const productIndex = currentList.findIndex(p => p.id === id);
      const newFavStatus = !currentList[productIndex].isFavorite;
      const updatedProducts = [...currentList];

      updatedProducts[productIndex] = {
        ...currentList[productIndex],
        isFavorite: newFavStatus
      };

      return updatedProducts;
    })
  }

  return (
    <ProductsContext.Provider value={{ products: productList, toggleFav: toggleFavorite, }}>
      { children }
    </ProductsContext.Provider>
  );
}