//Types
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_ITEM_CART = "REMOVE_ITEM_CART";

export const addToCart = (product) => {
  return {
    type: ADD_TO_CART,
    payload: product,
  };
};

export const removeFromCart = (pid) => {
  return {
    type: REMOVE_ITEM_CART,
    payload: pid,
  };
};
