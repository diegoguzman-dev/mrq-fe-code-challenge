import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store/index';

interface Item {
  id: string;
  price: number;
}


function formatCurrency(value: number) {
  if (isNaN(value)) {
    return '';
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: value < 10 ? 1 : 0,
    maximumFractionDigits: value < 10 ? 1 : 0
  }).format(value);
}




const pricesSlice = createSlice({
  name: 'prices',
  initialState: {} as {
    [key: string]: {
      price: number;
      priceChange?: 'up' | 'down';
      formattedPrice: string;
      priceSpike?: boolean;
    }
  },
  reducers: {
    updatePrice: (state, action: PayloadAction<Item>) => {
      if (!state[action.payload.id]) {
        state[action.payload.id] = {
          price: action.payload.price,
          formattedPrice: formatCurrency(action.payload.price) ?? '--'
        };
      }
      const lastPrice = state[action.payload.id]?.price ?? 0;

      state[action.payload.id].price = action.payload.price;
      state[action.payload.id].priceChange = lastPrice < action.payload.price ? 'up' : lastPrice > action.payload.price ? 'down' : undefined;
      state[action.payload.id].formattedPrice = formatCurrency(action.payload.price) ?? '--';
      //check if price changed more than 25%
      if (lastPrice && Math.abs(lastPrice - action.payload.price) / lastPrice > 0.25) {
        state[action.payload.id].priceSpike = true;
        return
      }
      state[action.payload.id].priceSpike = false;
    }
  }
});


export default pricesSlice;
