import { combineReducers } from 'redux';

import { reducer as formReducer } from 'redux-form';
import items from './reducer__items';
import site from './reducer__site';
import cart from './reducer__cart';
import current from './reducer__current';
import orders from './reducer__orders';
import address from './reducer__address';

const rootReducer = combineReducers({
  current,
  site,
  items,
  cart,
  orders,
  address,
  form: formReducer
});

export default rootReducer;
