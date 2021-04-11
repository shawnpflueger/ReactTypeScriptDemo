import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

xtest('needs to be rewritten', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
