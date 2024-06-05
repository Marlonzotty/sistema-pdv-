const initialState = {
    items: [],
  };
  
  const productsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_PRODUCTS':
        return {
          ...state,
          items: action.payload,
        };
      case 'ADD_PRODUCT':
        return {
          ...state,
          items: [...state.items, action.payload],
        };
      case 'UPDATE_PRODUCT':
        return {
          ...state,
          items: state.items.map(product =>
            product.id === action.payload.id ? { ...product, ...action.payload } : product
          ),
        };
      default:
        return state;
    }
  };
  
  export default productsReducer;
  