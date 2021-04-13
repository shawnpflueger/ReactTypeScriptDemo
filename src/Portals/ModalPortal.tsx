import ReactDOM from 'react-dom';
import React, {Fragment, Component} from 'react';
import './ModalPortal.css';

function PortalContainer() {
	return (
		<>
			<div id="app-root"><Parent /></div>
			<div id="modal-root"></div>
		</>
	);
}

class Modal extends Component<{}, {}> {
		
	private el: any;
	private modalRoot: any;
	
	constructor(props: {}) {
		super(props);
		this.el = document.createElement('div');
		this.modalRoot = document.getElementById('modal-root');
	}
	
	componentDidMount() {
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
		this.modalRoot?.removeChild(this.el);
	}
	
	render() {
		return ReactDOM.createPortal(
			this.props.children,
			this.el
		);
	}
}

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

export default PortalContainer;