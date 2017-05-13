import { ADDRESS_CHANGED } from '../actions/index';

const INITIAL_STATE = {
  postcode: '',
  address: ''
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ADDRESS_CHANGED:
      return { ...state, postcode: action.payload.postcode, address: action.payload.address };
    default:
      return state;
  }
}
