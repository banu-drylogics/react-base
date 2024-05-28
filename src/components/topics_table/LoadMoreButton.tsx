import React from 'react';
import './TopicsTable.scss';

interface LoadMoreButtonProps {
  handleLoadMore?: () => void;
}

const LoadMoreButton = ({ handleLoadMore }: LoadMoreButtonProps) => {
  return (
    <button className='button' data-testid="button" onClick={handleLoadMore}>
      Load More
    </button>
  );
};

export default LoadMoreButton;
