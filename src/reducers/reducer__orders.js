import {
  ORDER_ITEMS,
  RESET_ORDERS
} from '../actions/index';

const INITIAL_STATE = {
  orders: null,
  received: false
}

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ORDER_ITEMS:
      return { ...state, orders: action.payload.data.list, received: true };
    case RESET_ORDERS:
      return { ...state, orders: null, received: false };
    default:
      return state;
  }
}
