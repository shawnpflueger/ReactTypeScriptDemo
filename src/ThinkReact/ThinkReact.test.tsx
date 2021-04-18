import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FilterableProductTable from './ThinkReact';

test('renders a Product Table component', async () => {
	render(<FilterableProductTable />);
	
	const checkboxLabel = screen.getByText(/only show/i);
	expect(checkboxLabel).toBeTruthy();
	
	const filterInput = screen.getByPlaceholderText(/search/i);
	expect(filterInput).toBeTruthy();
	
	const baseballCell = await screen.findByText(/baseball/i);
	expect(baseballCell).toBeTruthy();	
});

test('filters out products that are not in stock', async () => {
	render(<FilterableProductTable />);
	
	const checkbox = screen.getByRole('checkbox');
	expect(checkbox).toBeTruthy();
	
	userEvent.click(checkbox);
	
	const baseballCell = await screen.findByText(/baseball/i);
	expect(baseballCell).toBeTruthy();	
	
	const basketballCell = screen.queryByText(/basketball/i);
	expect(basketballCell).toBeFalsy();
});

test('filters out products by text', async () => {
	render(<FilterableProductTable />);
	
	const filterInput = screen.getByPlaceholderText(/search/i);
	expect(filterInput).toBeTruthy();
	
	userEvent.type(filterInput, 'o');
	
	const footballCell = await screen.findByText(/football/i);
	expect(footballCell).toBeTruthy();	
	
	const basketballCell = screen.queryByText(/basketball/i);
	expect(basketballCell).toBeFalsy();
	
	const iphoneCell = await screen.getByText(/iphone/i);
	expect(iphoneCell).toBeTruthy();	
});
