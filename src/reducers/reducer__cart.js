import _concat from 'lodash.concat';

import {
  CART_ITEMS,
  RESET_CART
} from '../actions/index';

const INITIAL_STATE = {
  items: [],
  totalCount: 0,
  err: null
};

const ITEM_EXCEED_ERROR = 'ITEM_EXCEED_ERROR';

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case CART_ITEMS:
      state.totalCount = parseInt(state.totalCount) + parseInt(action.payload.count);
      if (state.totalCount <= 5) {
        return { ... state, items: _concat(state.items, action.payload)};
      } else {
        return { ...state, err: ITEM_EXCEED_ERROR };
      }
    case RESET_CART:
      return { ...state, totalCount: 0, err: null, items: [] };
    default:
      return state;
  }
}
