import { createSlice } from '@reduxjs/toolkit';

interface StoreState {
  activeSymbol: string | null;
  showCardInfo: boolean;
}

const initialState: StoreState = {
  activeSymbol: '',
  showCardInfo: true
};

export const dashboardOptionsSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    toggleShowCardInfo: (state) => {
      state.showCardInfo = !state.showCardInfo;
    },
    setActiveSymbol: (state, action) => {
      if (state.activeSymbol === action.payload) {
        state.activeSymbol = null;
        return;
      }
      state.activeSymbol = action.payload
    }
  }
});

export const { toggleShowCardInfo, setActiveSymbol } = dashboardOptionsSlice.actions;

const selectShowCardInfo = (state: { store: StoreState }) => state.store.showCardInfo;

const selectActiveSymbol = (state: { store: StoreState }) => state.store.activeSymbol;

const selectors = {
  selectShowCardInfo,
  selectActiveSymbol
};

export default dashboardOptionsSlice.reducer;
export { selectors };
