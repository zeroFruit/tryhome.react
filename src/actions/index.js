import axios from 'axios';

const ROOT_URL = 'http://localhost:3000/api';
const SMTP_ROOT_URL = 'http://localhost:3003';

export const A_SITE_INDEX = 1;
export const B_SITE_INDEX = 2;
export const CHECK_SITE_EXIST = 'CHECK_SITE_EXIST';
export const FETCH_SITE = 'FETCH_SITE';
export const FETCH_ITEMS = 'FETCH_ITEMS';
export const FILTER_ITEMS = 'FILTER_ITEMS';
export const CART_ITEMS = 'CART_ITEMS';
export const FETCH_CART = 'FETCH_CART';
export const ORDER_ITEMS = 'ORDER_ITEMS';
export const WAIT_SMTP_RES = 'WAIT_SMTP_RES';
export const RESET_ORDERS = 'RESET_ORDERS';
export const ADDRESS_CHANGED = 'ADDRESS_CHANGED';
export const RESET_CART = 'RESET_CART';

const CODE = {
  GET_SUCCESS: 0,
  GET_FAIL: 1,
  POST_SUCCESS: 20,
  POST_FAIL: 21,
  PUT_SUCCESS: 40,
  PUT_FAIL: 41,
  DELETE_SUCCESS: 60,
  DELETE_FAIL: 61,
  PARAMS_INSUFF: 100
};

export function checkSiteExist() {
  const request = axios.get(`${ROOT_URL}/site/exist`);

  return {
    type: CHECK_SITE_EXIST,
    payload: request
  }
}

export function fetchSite({ siteIndex }) {
  const request = axios.get(`${ROOT_URL}/site?siteIndex=${siteIndex}`);

  return dispatch => {
    request.then(res => {
      if (res.status !== 200 || res.data.code !== CODE.GET_SUCCESS) {
        console.log('res', res);
      }
      dispatch({ type: FETCH_SITE, payload: res.data });
    });
  }
}

export function fetchItems ({ siteIndex }) {
  const request = axios.get(`${ROOT_URL}/all/item?siteIndex=${siteIndex}`);

  return dispatch => {
    request.then(res => {
      if (res.status !== 200 || res.data.code !== CODE.GET_SUCCESS) {
        // error handling
      }
      dispatch({ type: FETCH_ITEMS, payload: res.data });
    });
  }
}

export function filterItems ({ siteIndex, categoryIndex, category }) {
  return {
    type: FILTER_ITEMS,
    payload: { siteIndex, categoryIndex, category }
  };
}

export function cartItems ({ item, size__selected, color__selected, count__selected }) {
  return {
    type: CART_ITEMS,
    payload: { item, size: size__selected, color: color__selected, count: count__selected }
  }
}

export function resetCartItems() {
  return {
    type: RESET_CART,
    payload: true
  };
}

export function orderItems(items, customer) {
  const request = axios.post(`${SMTP_ROOT_URL}/mail`, { items, customer });

  return dispatch => {
    dispatch({ type: WAIT_SMTP_RES, payload: true });

    request.then(res => {
      if (res.status !== 200 || res.data.code !== CODE.POST_SUCCESS) {
        // error handling
      }
      dispatch({ type: ORDER_ITEMS, payload: res.data });
      dispatch({ type: WAIT_SMTP_RES, payload: false });
    });
  }
}

export function setOrderEmpty() {
  return {
    type: RESET_ORDERS,
    payload: true
  };
}

export function addressChanged({postcode, address}) {
  return {
    type: ADDRESS_CHANGED,
    payload: { postcode, address }
  }
}
