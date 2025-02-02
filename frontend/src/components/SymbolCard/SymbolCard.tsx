import './symbolCard.css';
import { ReactComponent as CompanyIcon } from '@/assets/company.svg';
import { ReactComponent as IndustryIcon } from '@/assets/industry.svg';
import { ReactComponent as MarketCapIcon } from '@/assets/market_cap.svg';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import ListItem from '@/components/ListItem';
import SymbolCardPrice from '../SymbolCardPrice';
import SymbolCardHeading from '../SymbolCardHeading';
import { setActiveSymbol } from '@/store/dashboardOptionsSlice';

export type SymbolCardProps = {
  id: string;
  price: string;
  selected?: boolean;
  priceChange?: 'up' | 'down';
  showInfo?: boolean;
};

function formatMarketCap(value: number): string {
  if (isNaN(value)) return '';

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 1
  }).format(value);
}

const SymbolCard = ({ id, price, selected, priceChange, showInfo }: SymbolCardProps) => {
  const { trend, companyName, industry, marketCap } = useAppSelector(
    (state) => state.stocks.entities[id]
  );
  const dispatch = useAppDispatch();
  const handleOnClick = () => {
    dispatch(setActiveSymbol(id));
  };

  const styleSelected = selected ? ' symbolCard_active' : '';
  const stylePriceChange = priceChange ? ` symbolCardPrice_${priceChange}` : '';
  const classNames = `symbolCard${styleSelected}${stylePriceChange}`;

  return (
    <div onClick={handleOnClick} className={classNames}>
      <SymbolCardHeading {...{ id, trend }} />
      <div className="symbolCard__content">
        <SymbolCardPrice {...{ id, price }} />
        {showInfo && (
          <>
            <ListItem Icon={<CompanyIcon />} label={companyName} spacing="space-between" />
            <ListItem Icon={<IndustryIcon />} label={industry} spacing="space-between" />
            <ListItem
              Icon={<MarketCapIcon />}
              label={formatMarketCap(marketCap)}
              spacing="space-between"
            />
          </>
        )}
      </div>
    </div>
  );
};
export default SymbolCard;
