import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MouseTracker from './RenderProps';

test('renders a Mouse Tracker displaying the position', async () => {
	render(<MouseTracker />);
	
	let mousePosition = screen.getByText(/current mouse position/i);
	
	expect(mousePosition).toHaveTextContent('The current mouse position is (0, 0)', 'Initial Check');
	
	// TODO There's no easy way it seems to trigger/simulate a pointed mouse move event.
	// I could open up the Mouse component and also the handleMouseMove to direct it
	// more, but that's probably against the philosophy. 
	// Might make more sense in the theoretical test described below
});

// Theoretically we could export and render the Mouse directly and track the mouse differently
