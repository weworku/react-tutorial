import React from 'react';
import { render, screen } from '@testing-library/react';
import { Board } from './App';

test.each([
  [3, 3],
  [4, 4],
  [2, 5],
])('renders board with %i rows and %i columns', (numRows, numCols) => {
  render(<Board numRows={numRows} numCols={numCols} />);
  const squares = screen.getAllByRole('button').filter((button) => button.classList.contains('square'));
  expect(squares).toHaveLength(numRows * numCols);
});
