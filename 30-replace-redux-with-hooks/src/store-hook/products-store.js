import { initStore } from './store';

export default function configureStore() {
  const actions = {
    TOGGLE_FAV: (state, id) => {
      const productIndex = state.products.findIndex(p => p.id === id);
      const newFavStatus = !state.products[productIndex].isFavorite;
      const updatedProducts = [...state.products];

      updatedProducts[productIndex] = {
        ...state.products[productIndex],
        isFavorite: newFavStatus
      };

      return {
        products: updatedProducts,
      }
    }
  };

  initStore(actions, {
    products: [
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
    ]
  });
}