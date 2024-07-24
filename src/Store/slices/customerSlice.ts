import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICustomer } from '../../Interfaces/customer.interface';

interface customersState {
  customers: ICustomer[];
  isLoading: boolean;
  error: string | null;
}

const initialState: customersState = {
  customers: [],
  isLoading: false,
  error: null,
};

const customerSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    fetchCustomersStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchCustomersSuccess: (state, action: PayloadAction<ICustomer[]>) => {
      state.isLoading = false;
      state.customers = action.payload;
    },
    fetchCustomersFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchCustomersStart,
  fetchCustomersSuccess,
  fetchCustomersFailure,
} = customerSlice.actions;
export default customerSlice.reducer;
