import { ADD_TO_CART, REMOVE_ITEM_CART } from "../actions/cart";
import { ADD_ORDER } from "../actions/orders";
import { DELETE_PRODUCT } from "../actions/products";
//Model
import CartItem from "../../model/cart-item";

const initialState = {
  items: {},
  totalAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const payload = action.payload;
      const price = payload.price;
      const title = payload.title;
      const ownerPushToken = payload.ownerPushToken;

      let updatedAddItem;

      if (state.items[payload.id]) {
        updatedAddItem = new CartItem(
          state.items[payload.id].quantity + 1,
          price,
          title,
          state.items[payload.id].sum + price,
          ownerPushToken
        );
      } else {
        updatedAddItem = new CartItem(1, price, title, price, ownerPushToken);
      }

      return {
        ...state,
        items: { ...state.items, [payload.id]: updatedAddItem },
        totalAmount: state.totalAmount + price,
      };

    case REMOVE_ITEM_CART:
      const selectedItem = state.items[action.payload];
      const currentQuantity = selectedItem.quantity;

      let updatedCartItems;

      if (currentQuantity > 1) {
        const updatedCartItem = new CartItem(
          selectedItem.quantity - 1,
          selectedItem.productPrice,
          selectedItem.productTitle,
          selectedItem.sum - selectedItem.productPrice
        );
        updatedCartItems = {
          ...state.items,
          [action.payload]: updatedCartItem,
        };
      } else {
        updatedCartItems = { ...state.items };
        delete updatedCartItems[action.payload];
      }

      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedItem.productPrice,
      };

    case ADD_ORDER:
      return initialState;

    case DELETE_PRODUCT:
      if (!state.items[action.payload]) {
        return state;
      }

      const updatedItems = { ...state.items };
      const itemTotal = state.items[action.payload].sum;
      delete updatedItems[action.payload];

      return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount - itemTotal,
      };

    default:
      return state;
  }
};
