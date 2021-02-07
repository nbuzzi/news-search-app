import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders page', () => {
  render(<App />);
  const titleElement = screen.getByText(/News search's app/i);
  expect(titleElement).toBeInTheDocument();
});
