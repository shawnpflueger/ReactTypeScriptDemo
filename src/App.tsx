import React, {Component, Fragment} from 'react';
import logo from './logo.svg';
import './App.css';
import Game from './TicTacToe';
import Calculator from './TemperatureCalculator';
import FilterableProductTable from './ThinkReact';
import ThemeContainer from './ThemeContext';
import PortalContainer from './ModalPortal';
import MouseTracker from './RenderProps';

class Clock extends React.Component<{}, {date: Date}> {
	
	private timerID: any;
	
	constructor(props: {}) {
		super(props);
		this.state = {date: new Date()};
	}
	
	componentDidMount() {
		this.timerID = setInterval(
			() => this.tick(),
			1000
			);
	}
	
	componentWillUnmount() {
		clearInterval(this.timerID);
	}
	
	private tick() {
		this.setState({date: new Date()});
	}
	
	render() {
		return (
			<div>
				<h2>Current time is {this.state.date.toLocaleTimeString()}.</h2>
			</div>
		);
	}
}

function LearnReact() {
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
			  rel="noopener noreferrer"
			>
			  Learn React
			</a>
		</Fragment>
	);
}

function DemoTab(props: {changer: (dt: Demo) => void,
						demoType: Demo}) {
	return (
		<td 
			key={props.demoType.componentId} 
			onClick={() => props.changer(props.demoType)}>
				{props.demoType.description}
		</td>
	);
}

type DemoComponent = '' | 'Game' | 'TempCalc' | 'Products' | 'ThemeContext' | 'ModalPortal' | 'RenderProps';

interface Demo {
	componentId: DemoComponent;
	description: string; 
	renderProp: () => any; 
	displayOrder: number;
	default?: boolean
}

const demos: Demo[] = [
	{componentId: '' as DemoComponent, description: 'Learn React', displayOrder: 999, renderProp: () => (<LearnReact />), default: true},
	{componentId: 'Game' as DemoComponent, description: 'Game', displayOrder: 0, renderProp: () => (<Game />)},
	{componentId: 'TempCalc', description: 'Temperature Calculator', displayOrder: 1, renderProp: () => (<Calculator />)},
	{componentId: 'Products', description: 'Products', displayOrder: 2, renderProp: () => (<FilterableProductTable />)},
	{componentId: 'ThemeContext', description: 'Themes and Context', displayOrder: 3, renderProp: () => (<ThemeContainer />)},
	{componentId: 'ModalPortal', description: 'Modal Portals', displayOrder: 4, renderProp: () => (<PortalContainer />)},
	{componentId: 'RenderProps', description: 'RenderProps', displayOrder: 5, renderProp: () => (<MouseTracker />)}
];

class App extends Component<{}, {displayDemo: Demo}> {
	
	constructor(props: {}) {
		super(props);
		this.state = {displayDemo: demos[0]};		
	}
	
	show = (demo: Demo) => {
		this.setState(s => ({displayDemo: demo}));		
	}
	
	render() {
		const demoOptions = demos.slice();
		demoOptions.sort((da, db) => da.displayOrder - db.displayOrder);
		return (	
			<div className="App">
			  
				<header className="App-header">
					<Clock />
					<table>
						<thead>
							<tr>
								{demoOptions.map(d => (<DemoTab key={d.componentId} changer={this.show} demoType={d} />))}									
							</tr>
						</thead>
					</table>					
					{this.state.displayDemo ? this.state.displayDemo.renderProp() : null}
				</header>
			</div>
		);
	}
}

export default App;
