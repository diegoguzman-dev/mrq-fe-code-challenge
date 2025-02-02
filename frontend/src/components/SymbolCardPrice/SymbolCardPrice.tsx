import './symbolCardPrice.css';

type SymbolCardHeadingProps = {
  price: string;
};

const SymbolCardPrice = ({ price }: SymbolCardHeadingProps) => {
  return (
    <div className="symbolCardPrice">
      Price:
      <strong className="symbolCardPrice_value">{price || '--'} </strong>
    </div>
  );
};

export default SymbolCardPrice;
