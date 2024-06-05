import { createStore, combineReducers } from 'redux';

const initialCartState = {
  items: [],
};

const cartReducer = (state = initialCartState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
      };
    default:
      return state;
  }
};

const initialProductsState = {
  items: [],
};

const productsReducer = (state = initialProductsState, action) => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return {
        ...state,
        items: action.payload,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  cart: cartReducer,
  products: productsReducer,
});

const store = createStore(rootReducer);

export default store;
