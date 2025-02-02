import './symbolCardHeading.css';
import { Stock } from '@/store/stocksSlice';
import upTrend from '@/assets/up.png';
import downTrend from '@/assets/down.png';
import { SymbolCardProps } from '../SymbolCard/SymbolCard';

type SymbolCardHeadingProps = Pick<SymbolCardProps, 'id'> & {
  trend: Stock['trend'];
};

const SymbolCardHeading = ({ id, trend }: SymbolCardHeadingProps) => {
  return (
    <h4 className="symbolCardHeading">
      <span className="symbolCardHeading_span">{id}</span>
      {trend && (
        <img
          className="symbolCardHeading_img"
          src={trend === 'UP' ? upTrend : downTrend}
          alt={`${trend} trend arrow`}
        />
      )}
    </h4>
  );
};

export default SymbolCardHeading;
