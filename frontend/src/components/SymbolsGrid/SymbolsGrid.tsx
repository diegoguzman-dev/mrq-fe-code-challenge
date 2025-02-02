import './symbolsGrid.css';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import SymbolCard from '../SymbolCard';
import { fetchAllStocks, selectors } from '@/store/stocksSlice';
import { selectors as dashboardOptionsSelectors } from '@/store/dashboardOptionsSlice';

const SymbolsGrid = () => {
  const activeSymbol = useAppSelector(dashboardOptionsSelectors.selectActiveSymbol);
  const stockSymbols = useAppSelector(selectors.selectStockIds);
  const showInfo = useAppSelector((state) => state.store.showCardInfo);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!stockSymbols.length) {
      dispatch(fetchAllStocks());
    }
  }, [dispatch]);

  return (
    <div className="symbolsGrid">
      {stockSymbols.map((id) => (
        <SymbolCard selected={activeSymbol === id} key={id} id={id} showInfo={showInfo} />
      ))}
    </div>
  );
};

export default SymbolsGrid;
