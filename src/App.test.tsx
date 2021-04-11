import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders the clock', () => {
  render(<App />);
  const clockElement = screen.getByText(/current time/i);  
  expect(clockElement).toBeInTheDocument();  
});

test('renders the Learn React option by default', () => {
  render(<App />);
  const learnReactButton = screen.getByRole('button');
  expect(learnReactButton).toBeInTheDocument();
});

test('renders a table of demo options to switch', () => {
	const { component } = render(<App />);
	const gameTab = screen.getByText(/game/i);
	expect(gameTab).toBeTruthy();
	
	fireEvent.click(gameTab);
	
	const indicator = screen.getByText(/next player:/i);
	expect(indicator).toBeTruthy();
});