import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PortalContainer from './ModalPortal';

test('renders an application div with a description and a button to open a modal', () => {
	render(<PortalContainer />);
	
	const description = screen.getByText(/devtools/i);
	
	const openModal = screen.getByRole('button');
	
	const counter = screen.getByText(/number/i);
	expect(counter).toHaveTextContent('Number of clicks: 0');
	
	userEvent.click(description);
	
	expect(counter).toHaveTextContent('Number of clicks: 1');	
});

test('opens a modal outside the parent div that propagates clicks to the outer parent', () => {
	render(<PortalContainer />);
	
	const counter = screen.getByText(/number/i);
	expect(counter).toHaveTextContent('Number of clicks: 0');
	
	const openModalButton = screen.getByRole('button');
	const clickerDiv = openModalButton.closest('div');
	const appContainerDiv = clickerDiv.parentElement;
	expect(appContainerDiv.id).toEqual('app-root');
	
	userEvent.click(openModalButton);
	expect(counter).toHaveTextContent('Number of clicks: 1');
	
	const modalClicker = screen.queryByText('Click');
	expect(modalClicker).toBeTruthy();
	const modalContainerDiv = modalClicker.closest('div').parentElement?.parentElement;
	expect(modalContainerDiv.id).toEqual('modal-root');
	
	userEvent.click(modalClicker);
	
	expect(counter).toHaveTextContent('Number of clicks: 2');
	
});

test('closes the modal', () => {
	render(<PortalContainer />);
	
	const openModalButton = screen.getByRole('button');
	
	userEvent.click(openModalButton);
	
	const closeModalButton = screen.getByText('Close');
	
	userEvent.click(closeModalButton);
	
	const modalClicker = screen.queryByText('Click');
	expect(modalClicker).toBeFalsy();
});
