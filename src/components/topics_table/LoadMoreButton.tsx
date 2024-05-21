import React from 'react';
import './styles.css';

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
