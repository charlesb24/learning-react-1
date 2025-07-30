import { createSlice, configureStore } from '@reduxjs/toolkit';

const initialState = {
  counter: 0,
  showCounter: true,
}

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment(state) {
      state.counter += 1;
    },
    decrement(state) {
      state.counter -= 1;
    },
    increase(state, { payload }) {
      state.counter += payload;
    },
    decrease(state, { payload }) {
      state.counter -= payload;
    },
    toggleCounterVisibility(state) {
      state.showCounter = !state.showCounter;
    },
  }
});

// const counterReducer = (state = initialState, action) => {
//   if (action.type === 'increment') {
//     return {
//       counter: state.counter + 1,
//       showCounter: state.showCounter,
//     };
//   }
//
//   if (action.type === 'increase') {
//     return {
//       counter: state.counter + action.payload,
//       showCounter: state.showCounter,
//     };
//   }
//
//   if (action.type === 'decrement') {
//     return {
//       counter: state.counter - 1,
//       showCounter: state.showCounter,
//     };
//   }
//
//   if (action.type === 'decrease') {
//     return {
//       counter: state.counter - action.payload,
//       showCounter: state.showCounter,
//     };
//   }
//
//   if (action.type === 'toggleCounterVisibility') {
//     return {
//       counter: state.counter,
//       showCounter: !state.showCounter,
//     };
//   }
//
//   return state;
// }

const store = configureStore({
  reducer: counterSlice.reducer,
});

export const counterActions = counterSlice.actions;

export default store;