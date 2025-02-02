import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import SymbolCard from '../SymbolCard';
import { fetchAllStocks, selectors } from '@/store/stocksSlice';
import { selectors as dashboardOptionsSelectors } from '@/store/dashboardOptionsSlice';

const SymbolsGrid = () => {
  const activeSymbol = useAppSelector(dashboardOptionsSelectors.selectActiveSymbol);
  const stockSymbols = useAppSelector(selectors.selectStockIds);
  const prices = useAppSelector((state) => state.prices);
  const showInfo = useAppSelector((state) => state.store.showCardInfo);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAllStocks());
  }, [dispatch]);

  return (
    <div>
      {stockSymbols.map((id, i) => (
        <SymbolCard
          price={prices[id]}
          selected={activeSymbol === id}
          key={i}
          id={id}
          showInfo={showInfo}
        />
      ))}
    </div>
  );
};

export default SymbolsGrid;
