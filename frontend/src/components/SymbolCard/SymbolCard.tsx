import './symbolCard.css';
import { ReactComponent as CompanyIcon } from '@/assets/company.svg';
import { ReactComponent as IndustryIcon } from '@/assets/industry.svg';
import { ReactComponent as MarketCapIcon } from '@/assets/market_cap.svg';
import { useAppSelector } from '@/hooks/redux';
import ListItem from '@/components/ListItem';
import SymbolCardPrice from '../SymbolCardPrice';
import SymbolCardHeading from '../SymbolCardHeading';

export type SymbolCardProps = {
  id: string;
  onClick: (symbolId: string) => void;
  price: string;
  selected?: boolean;
  priceChange?: 'up' | 'down';
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

const SymbolCard = ({ id, onClick, price, selected, priceChange }: SymbolCardProps) => {
  const { trend, companyName, industry, marketCap } = useAppSelector(
    (state) => state.stocks.entities[id]
  );
  const handleOnClick = () => {
    onClick(id);
  };

  const styleSelected = selected ? ' symbolCard_active' : '';
  const stylePriceChange = priceChange ? ` symbolCardPrice_${priceChange}` : '';
  const classNames = `symbolCard${styleSelected}${stylePriceChange}`;

  return (
    <div onClick={handleOnClick} className={classNames}>
      <SymbolCardHeading {...{ id, trend }} />
      <div className="symbolCard__content">
        <SymbolCardPrice {...{ id, price }} />
        <ListItem Icon={<CompanyIcon />} label={companyName} spacing="space-between" />
        <ListItem Icon={<IndustryIcon />} label={industry} spacing="space-between" />
        <ListItem
          Icon={<MarketCapIcon />}
          label={formatMarketCap(marketCap)}
          spacing="space-between"
        />
      </div>
    </div>
  );
};
export default SymbolCard;
