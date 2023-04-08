import { ADD_ORDER, SET_ORDER } from "../actions/orders";
//Model
import Orders from "../../model/orders";

//Initial State
const initialState = { orders: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER:
      const { id, cartItems, totalAmount, date } = action.payload;

      const addOrderState = new Orders(id, cartItems, totalAmount, date);

      return { ...state, orders: state.orders.concat(addOrderState) };

    case SET_ORDER:
      return { ...state, orders: action.payload };

    default:
      return state;
  }
};
