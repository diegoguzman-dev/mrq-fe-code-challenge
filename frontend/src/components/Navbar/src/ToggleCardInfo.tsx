import React from 'react';
import { toggleShowCardInfo, selectors } from '@/store/dashboardOptionsSlice'; // Adjust the import path
import './toggleCardInfo.css';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
const ToggleCardInfo: React.FC = () => {
  const dispatch = useAppDispatch();
  const showCardInfo = useAppSelector(selectors.selectShowCardInfo);

  const handleChange = () => {
    dispatch(toggleShowCardInfo());
  };

  return (
    <label className="toggleCardInfo">
      +Info
      <input type="checkbox" checked={showCardInfo} onChange={handleChange} />
    </label>
  );
};

export default ToggleCardInfo;
