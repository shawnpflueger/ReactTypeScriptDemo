import React, {Component, Fragment} from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Game from './Tutorial/TicTacToe';
import Calculator from './LiftingState/TemperatureCalculator';
import FilterableProductTable from './ThinkReact/ThinkReact';
import ThemeContainer from './Context/ThemeContext';
import PortalContainer from './Portals/ModalPortal';
import MouseTracker from './RenderProps/RenderProps';

// Concept pulled from https://reactjs.org/docs/renderings-elements.html
class Clock extends React.Component<{}, {date: Date}> {
	
	// Reference to the async timer that updates every second (1000ms)
	private timerID: any;
	
	constructor(props: {}) {
		super(props);
		// This state property becomes the 
		this.state = {date: new Date()};
	}
	
	// componentDidMount will get called once per instance at the start of the React Component's lifecycle.
	// In this case we ask the Javascript runtime to set up a timer to trigger every 1000ms to call the 
	// private tick() function on this class
	componentDidMount() {
		this.timerID = setInterval(
			() => this.tick(),
			1000
			);
	}
	
	// componentWillUnmount will get called once per instance at the end of the React Component's lifecycle.
	// In this case we use it to remove the interval we created when we mounted the component
	componentWillUnmount() {
		clearInterval(this.timerID);
	}
	
	// Every time tick is called we update the state, this will trigger a fresh call to render()
	private tick() {
		this.setState({date: new Date()});
	}
	
	// Here we create a JSX object that the React runtime can diff with what it already "sees" for this 
	// component and can then reconcile where to make changes in the DOM.
	render() {
		return (
			<div>
				<h2>Current time is {this.state.date.toLocaleTimeString()}.</h2>
			</div>
		);
	}
}

// Function component refactored out of the original template, pointing you to ReactJs home
function LearnReact() {
	// Using a Fragment (https://reactjs.org/docs/fragments.html) here. 
	// JSX needs some sort of root element.
	return (
		<Fragment>
			<img src={logo} className="App-logo" alt="logo" />
			<p>
				Edit <code>src/App.tsx</code> and save to reload.
			</p>		
			<a
			  role="button"
			  className="App-link"
			  href="https://reactjs.org"
			  target="_blank"
			  rel="noopener noreferrer">
			  Learn React
			</a>
		</Fragment>
	);
}

// List of our demos. If you would like to add your own then start by adding to this type.
type DemoComponent = '' | 'Game' | 'TempCalc' | 'Products' | 'ThemeContext' | 'ModalPortal' | 'RenderProps';

// All the details for our demo items.
interface Demo {
	// Our short id
	componentId: DemoComponent;
	// A description of the demo to display
	description: string; 
	// How to render the demo. This should be returning some JSX.
	renderProp: () => any; 
	// What order to display the demo in the "navigation tabs"
	displayOrder: number;
	// Whether this demo should be displayed by default
	default?: boolean,
	// Where to link for more information on how the demo was made
	resourceLink?: string
}

// All the demos we have as Demo types
const demos: Demo[] = [
	{componentId: '' as DemoComponent, description: 'Learn React', displayOrder: 999, renderProp: () => (<LearnReact />), default: true},
	{componentId: 'Game' as DemoComponent, description: 'Game (Tutorial)', resourceLink: 'https://reactjs.org/tutorial/tutorial.html', displayOrder: 0, renderProp: () => (<Game />)},
	{componentId: 'TempCalc', description: 'Temperature Calculator (Lifting State Up)', resourceLink: 'https://reactjs.org/docs/lifting-state-up.html', displayOrder: 1, renderProp: () => (<Calculator />)},
	{componentId: 'Products', description: 'Products (Think React)', resourceLink: 'https://reactjs.org/docs/thinking-in-react.html', displayOrder: 2, renderProp: () => (<FilterableProductTable />)},
	{componentId: 'ThemeContext', description: 'Themes (Context)', resourceLink: 'https://reactjs.org/docs/context.html', displayOrder: 3, renderProp: () => (<ThemeContainer />)},
	{componentId: 'ModalPortal', description: 'Modals (Portals)', resourceLink: 'https://reactjs.org/docs/portals.html', displayOrder: 4, renderProp: () => (<PortalContainer />)},
	{componentId: 'RenderProps', description: 'Mouse Tracking (Render Props)', resourceLink: 'https://reactjs.org/docs/render-props.html', displayOrder: 5, renderProp: () => (<MouseTracker />)}
];


// Function component using a property function for event handling
// This little table data is used for our demo menu tabs
function DemoTab(props: {changer: (dt: Demo) => void,
						demoType: Demo}) {
	// Key prop required for React iterative rendering, even though the parent has it as well
	// https://reactjs.org/docs/lists-and-keys.html
	return (
		<td 
			key={props.demoType.componentId} 
			onClick={() => props.changer(props.demoType)}>
				{props.demoType.description}
		</td>
	);
}

function DemoOptionsTable(props: {demoOptions: Demo[], toDisplay: (demo: Demo) => void}) {
	return (
		<table>
			<thead>
				<tr>
					{props.demoOptions
						.map(d => (<DemoTab 
									key={d.componentId} 
									changer={props.toDisplay} 
									demoType={d} />))}	
				</tr>
			</thead>
		</table>
	);
}

function DemoDisplay(props: {displayDemo: Demo}) {
	return (
		<main>
			{props.displayDemo.resourceLink && (<a target="_blank" href={props.displayDemo.resourceLink} rel="noreferrer">Look here for more information</a>)}
			{props.displayDemo !== null && props.displayDemo.renderProp()}
		</main>
	);
}

// Encapsulating React Router code in this one component, could probably break it into two
class DemoOptionsRouter extends Component<{demoOptions: Demo[]}, {}> {
	
	render() {
		return (
			<BrowserRouter>
				<div>
					<nav>
						<ul>
						{this.props.demoOptions.map(d => (
							<li key={d.componentId}>
								<Link to={`/${d.componentId}`}>{d.description}</Link>
							</li>
							))}
						</ul>
					</nav>
					{
						<main>
							<Switch>
								{this.props.demoOptions.map(d => (
									<Route key={d.componentId} path={`/${d.componentId}`}>
										{d.resourceLink && (<a target="_blank" href={d.resourceLink} rel="noreferrer">Look here for more information</a>)}
										{d.renderProp()}
									</Route>
									))
								}
							</Switch>
						</main>
					}
				</div>
			</BrowserRouter>
		);
	};
}

function NavSwitcher(props: {switchNavMode: () => void}) {
	function wrapChange() {
		//Because we're outside the actual router context, we need to manipulate the real browser API
		window.history.pushState({}, '', '/');
		props.switchNavMode();
	}
	
	return (
		<span>
			<input id="nav-mode" type="checkbox" onChange={wrapChange}/>
			<label htmlFor="nav-mode">Use React Router Navigation</label>
		</span>
		
	);
}


// The guiding demo display, controlling the whole application by keeping track of the active demo
// in the state
class App extends Component<{}, {displayDemo: Demo, navMode: 'Router' | 'Tab'}> {
	
	private readonly demoOptions: Demo[];
	
	constructor(props: {}) {
		super(props);
		// Use the first demo we find as default, or just the first in the array
		const defaultDemo = demos.find(d => d.default) ?? demos[0];
		this.state = {displayDemo: defaultDemo, navMode: 'Tab'};
		this.demoOptions = demos.slice();
		this.demoOptions.sort((da, db) => da.displayOrder - db.displayOrder);
	}
	
	// Just update the demo in the state.
	// We use function assignment so we don't need to bother with binding in the constructor.
	// Not even sure that's required in Typescript
	private show = (demo: Demo) => {
		this.setState(s => ({displayDemo: demo}));		
	}
	
	private switchNavMode = () => {
		this.setState(s => ({navMode: s.navMode === 'Router' ? 'Tab' : 'Router'}));
	}
	
	render() {	
		// Map the demoOptions property to DemoTab components
		// Use conditional rendering (https://reactjs.org/docs/conditional-rendering.html)
		// for both the resource link and the actual demo generated from the renderProp 
		// in the Demo interface
		return (	
			<div className="App">			  
				<header className="App-header">
					<NavSwitcher switchNavMode={this.switchNavMode} />
					<Clock />
					{this.state.navMode === 'Tab' 
						&& (<><DemoOptionsTable demoOptions={this.demoOptions} toDisplay={this.show} />
						 <DemoDisplay displayDemo={this.state.displayDemo} /></>)}
					{this.state.navMode === 'Router'
						&& (
						<>
							<DemoOptionsRouter demoOptions={this.demoOptions}/>
						</>)}
				</header>
			</div>
		);
	}
}

export default App;
