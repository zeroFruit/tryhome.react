import { WAIT_SMTP_RES } from '../actions/index';

const INITIAL_STATE = {
  waitSMTP: false
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case WAIT_SMTP_RES:
      return { ...state, waitSMTP: action.payload };
    default:
      return state;
  }
}
