// store.js
import { createStore } from 'redux';

const initialState = {
  isLoggedIn: false,
  username: '',
  password: ''
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isLoggedIn: true,
        username: action.payload.username,
        password: action.payload.password
      };
    case 'LOGOUT':
      return initialState;
    default:
      return state;
  }
};

const store = createStore(rootReducer);

export default store;
