import React from 'react';
import { render, screen } from '@testing-library/react';
import Game, {Square, calculateWinner} from './TicTacToe';

test('calculates a winner', () => {
	let winner = calculateWinner([]);
	
	expect(winner).toBeFalsy();
	
	winner = calculateWinner(['X', 'X', 'X']);
	
	expect(winner).toBeTruthy();
	expect(winner.winner).toEqual('X');
	expect(winner.line).toEqual([0,1,2]);
});

test('renders a square of the game', () => {
  let component = render(<Square value={0} onClick={() => null} />);
  expect(component.innerHTML).toBeFalsy();
  
  component = render(<Square value={'G'} onClick={() => null} />);
  const squareButton = screen.getByText(/g/i);
  expect(squareButton.innerHTML).toEqual('G');
});

test('renders a game of tic-tac-toe', () => {
	render(<Game />);
	const info = screen.getByText(/next player: x/i);
	expect(info).toBeTruthy();
});