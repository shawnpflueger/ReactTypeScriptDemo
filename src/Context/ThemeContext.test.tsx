import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThemeContainer from './ThemeContext';

test('renders a button in light there', () => {
	render(<ThemeContainer />);
	
	const themeButton = screen.getByRole('button');
	expect(themeButton).toBeTruthy();
	expect(themeButton).toHaveStyle('backgroundColor: #eeeeee');	
});

test('switches the theme when the button is clicked', async () => {
	render(<ThemeContainer />);
	
	const themeButton = screen.getByRole('button');
	userEvent.click(themeButton);
	
	expect(themeButton).toHaveStyle('backgroundColor: #222222');	
});
