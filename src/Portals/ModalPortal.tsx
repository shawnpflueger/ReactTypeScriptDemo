import ReactDOM from 'react-dom';
import React, {Fragment, Component} from 'react';
import './ModalPortal.css';

// Our actual modal class where we grab some expected elements from the dom
// and work against those. This differs from the document's example because we use a wrapper 
// component for use in the demo page and so the elements are added and removed from the page.
// Since I'm still new to this, not sure that's still the best way to do that.
class Modal extends Component<{}, {}> {
		
	private el: any;
	private modalRoot: any;
	
	constructor(props: {}) {
		super(props);
		// Get fresh references whenever the component is created
		this.el = document.createElement('div');
		this.modalRoot = document.getElementById('modal-root');
	}
	
	componentDidMount() {
		// Commentary from the docs: https://reactjs.org/docs/portals.html#event-bubbling-through-portals
		// The portal element is inserted in the DOM tree after
		// the Modal's children are mounted, meaning that children
		// will be mounted on a detached DOM node. If a child
		// component requires to be attached to the DOM tree
		// immediately when mounted, for example to measure a
		// DOM node, or uses 'autoFocus' in a descendant, add
		// state to Modal and only render the children when Modal
		// is inserted in the DOM tree.
		this.modalRoot?.appendChild(this.el);
	}
	
	componentWillUnmount() {
		// Make sure we clean up after ourselves
		this.modalRoot?.removeChild(this.el);
	}
	
	render() {
		// Use the special createPortal for rendering by droping in
		// our children
		return ReactDOM.createPortal(
			this.props.children,
			this.el
		);
	}
}

// This parent click counter, since the click counter is on the div, it counts click anywhere 
// rather than just on the modal button. I should add some propagation stoppage
// I also had to add some state to hide/close the modal so we can jump to other demos
class Parent extends Component<{}, {clicks: number, showModal: boolean}> {
	
	constructor(props: {}) {
		super(props);
		this.state = {clicks: 0, showModal: false};
	}
	
	private handleClick = () => {
		// This will fire when the button in Child is clicked,
		// updating the Parent's state, even though the button
		// is not a direct descendant in the DOM.
		this.setState(s => ({clicks: s.clicks + 1}));
	}
	
	private updateModal = () => {
		this.setState(s => ({showModal: !s.showModal}));
	}
	
	render() {
		
		// Only define the modal when we are showing it
		const modal = this.state.showModal ? 
			(<Modal><Child toClose={this.updateModal}/></Modal> )
			: null;		
		
		return (
			<div onClick={this.handleClick}>
				<p>Number of clicks: {this.state.clicks}</p>
				<button onClick={this.updateModal}>Show Modal</button>
				<p>
					Open up the broswer DevTools
					to observe that the button 
					is not a child of the div
					with the onClick handlers
				</p>				
				{modal}
			</div>
		);
	}
}

// This child of course is out actual modal content, with an added button to close it
function Child(props: {toClose: any}) {
	// The click event on this button will bubble up to the parent,
	// because there is no 'onClick' attribute defined
	return (
		<div className="modal">
			<button>Click</button>
			<button onClick={props.toClose}>Close</button>
		</div>
	);
}

// A little container so we can include this in the overall demo setup
function PortalContainer() {
	// Using a shorthand fragment here: https://reactjs.org/docs/fragments.html
	return (
		<>
			<div id="app-root"><Parent /></div>
			<div id="modal-root"></div>
		</>
	);
}

export default PortalContainer;