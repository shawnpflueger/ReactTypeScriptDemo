import React, {Component, MouseEvent} from 'react';

// Common State/Props used for the renderer, and the rendered components
interface MouseState {
	x: number;
	y: number;
}

// Our one implemented render option for using the mouse position. I didn't have access to the cat gif.
// Still sufficient to show the example off
function PositionDisplay(props: {mouse: MouseState}) {
	return (
		<p>The current mouse position is ({props.mouse.x}, {props.mouse.y})</p>
	);
}

// Pass in a render function that requires a MouseState
class Mouse extends Component<{render: (mouse: MouseState) => any}, MouseState> {
	
	constructor(props: {render: (mouse: MouseState) => any}) {
		super(props);
		this.state = {x: 0, y: 0};
	}
	
	// Just keep track of the mouse position
	private handleMouseMove = (event: MouseEvent<HTMLElement>) => {
		this.setState({
			x: event.clientX,
			y: event.clientY
		});
	}
	
	render() {
		// Pass the whole state to the target render component, it's what we asked for
		return (
			<div 
				style={{ height: '100vh' }} 
				onMouseMove={this.handleMouseMove}>
					{this.props.render(this.state)}
			</div>
		);
	}
}

// Parent component where we tell the Mouse component what we want done with it's state effectively,
// in this case displaying the position
class MouseTracker extends Component {
	
	render() {
		// Using a the fragment shorthand: https://reactjs.org/docs/fragments.html
		return (
			<> 
				<h1>Move the mouse around!</h1>
				<Mouse render={mouse => (<PositionDisplay mouse={mouse} />)} />
			</>
		);
	}
}

export default MouseTracker;