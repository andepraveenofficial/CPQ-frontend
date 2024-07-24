/* -----> Third Party Packages <----- */
import { configureStore } from '@reduxjs/toolkit';

/* -----> Slices <----- */
import productSlice from './slices/productSlice';
import customerSlice from './slices/customerSlice';
import proposalSlice from './slices/proposalSlice';

/* -----> Configuration <----- */
const appStore = configureStore({
  reducer: {
    // combine all slice reducers
    products: productSlice,
    customers: customerSlice,
    proposals: proposalSlice,
  },
});

/* -----> Export <----- */
export type RootState = ReturnType<typeof appStore.getState>;
export default appStore;
