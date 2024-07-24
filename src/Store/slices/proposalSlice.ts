import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProposal } from '../../Interfaces/proposal.interface';

interface ProposalsState {
  proposals: IProposal[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ProposalsState = {
  proposals: [],
  isLoading: false,
  error: null,
};

const proposalSlice = createSlice({
  name: 'proposals',
  initialState,
  reducers: {
    fetchProposalsStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchProposalsSuccess: (state, action: PayloadAction<IProposal[]>) => {
      state.isLoading = false;
      state.proposals = action.payload;
    },
    fetchProposalsFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchProposalsStart,
  fetchProposalsSuccess,
  fetchProposalsFailure,
} = proposalSlice.actions;
export default proposalSlice.reducer;
