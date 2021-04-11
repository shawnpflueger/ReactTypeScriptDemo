import React, {Component, MouseEvent} from 'react';

interface MouseState {
	x: number;
	y: number;
}

function PositionDisplay(props: {mouse: MouseState}) {
	return (
		<p>The current mouse position is ({props.mouse.x}, {props.mouse.y})</p>
	);
}

class Mouse extends Component<{render: (mouse: MouseState) => any}, MouseState> {
	
	constructor(props: {render: (mouse: MouseState) => any}) {
		super(props);
		this.state = {x: 0, y: 0};
	}
	
	private handleMouseMove = (event: MouseEvent<HTMLElement>) => {
		this.setState({
			x: event.clientX,
			y: event.clientY
		});
	}
	
	render() {
		return (
			<div 
				style={{ height: '100vh' }} 
				onMouseMove={this.handleMouseMove}>
					{this.props.render(this.state)}
			</div>
		);
	}
}


class MouseTracker extends Component {
	
	render() {
		return (
			<> 
				<h1>Move the mouse around!</h1>
				<Mouse render={mouse => (<PositionDisplay mouse={mouse} />)} />
			</>
		);
	}
}

export default MouseTracker;