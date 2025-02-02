import './symbolsView.css';
import SymbolsGrid from '@/components/SymbolsGrid';
import PriceChart from '@/components/PriceChart';
import DesktopInfo from './src/DesktopInfo';
import { useState } from 'react';

const SymbolsView = () => {
  return (
    <div className="symbolsView">
      <DesktopInfo />
      <div className="symbolsView__chart">
        <h3>PRICE HISTORY</h3>
        <PriceChart />
      </div>
      <div className="symbolsView__content">
        <div className="symbolsView__cards">
          <SymbolsGrid />
        </div>
      </div>
    </div>
  );
};

export default SymbolsView;
