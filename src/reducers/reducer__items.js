import _filter from 'lodash.filter';

import {
  FETCH_ITEMS,
  FILTER_ITEMS
} from '../actions/index';

const INITIAL_STATE = {
  all: [],
  filtered: []
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_ITEMS:
      return { ...state, all: action.payload.data.items };
    case FILTER_ITEMS:
      let filtered = state.all.filter(item => {
        if (item.category === action.payload.category) {
          return true;
        } else {
          return false;
        }
      });

      return { ...state, filtered };
    default:
      return state;
  }
}
