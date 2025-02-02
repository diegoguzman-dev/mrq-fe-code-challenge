import './symbolCard.css';
import { ReactComponent as CompanyIcon } from '@/assets/company.svg';
import { ReactComponent as IndustryIcon } from '@/assets/industry.svg';
import { ReactComponent as MarketCapIcon } from '@/assets/market_cap.svg';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import ListItem from '@/components/ListItem';
import SymbolCardPrice from '../SymbolCardPrice';
import SymbolCardHeading from '../SymbolCardHeading';
import { setActiveSymbol } from '@/store/dashboardOptionsSlice';
import { useEffect, useRef, useState } from 'react';

export type SymbolCardProps = {
  id: string;
  selected?: boolean;
  showInfo?: boolean;
};

const SymbolCard = ({ id, selected, showInfo }: SymbolCardProps) => {
  const price = useAppSelector((state) => state.prices[id]);
  const cardRef = useRef<HTMLDivElement>(null);
  const { trend, companyName, industry, formattedMarketCap } = useAppSelector(
    (state) => state.stocks.entities[id]
  );
  const [priceChange, setPriceChange] = useState<'up' | 'down'>();
  const [priceSpike, setPriceSpike] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const handleOnClick = () => {
    dispatch(setActiveSymbol(id));
  };

  const styleSelected = selected ? ' symbolCard_active' : '';
  const stylePriceChange = priceChange ? ` symbolCardPrice_${priceChange}` : '';
  const stylePriceSpike = priceSpike ? ' symbolCard__shake' : '';
  const classNames = `symbolCard${styleSelected}${stylePriceChange}${stylePriceSpike}`;

  useEffect(() => {
    setPriceSpike(price?.priceSpike ?? false);
    setPriceChange(price?.priceChange);
    setTimeout(() => {
      setPriceSpike(false);
      setPriceChange(undefined);
    }, 800);
  }, [price?.price]);

  return (
    <div onClick={handleOnClick} className={classNames} ref={cardRef}>
      <SymbolCardHeading {...{ id, trend }} />
      <div className="symbolCard__content">
        <SymbolCardPrice price={price?.formattedPrice ?? ''} />
        {showInfo && (
          <>
            <ListItem Icon={<CompanyIcon />} label={companyName} spacing="space-between" />
            <ListItem Icon={<IndustryIcon />} label={industry} spacing="space-between" />
            <ListItem
              Icon={<MarketCapIcon />}
              label={formattedMarketCap ?? ''}
              spacing="space-between"
            />
          </>
        )}
      </div>
    </div>
  );
};
export default SymbolCard;
