/* -----> Third Party Packages <----- */
import { configureStore } from '@reduxjs/toolkit';

/* -----> Slices <----- */
import productSlice from './slices/productSlice';
import customerSlice from './slices/customerSlice';

/* -----> Configuration <----- */
const appStore = configureStore({
  reducer: {
    // combine all slice reducers
    products: productSlice,
    customers: customerSlice,
  },
});

/* -----> Export <----- */
export type RootState = ReturnType<typeof appStore.getState>;
export default appStore;
