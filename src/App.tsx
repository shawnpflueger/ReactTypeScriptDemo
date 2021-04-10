import React, {Component, Fragment} from 'react';
import logo from './logo.svg';
import './App.css';
import Game from './TicTacToe';
import Calculator from './TemperatureCalculator';
import FilterableProductTable from './ThinkReact';
import ThemeContainer from './ThemeContext';
import PortalContainer from './ModalPortal';

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

function DemoTab(props: {componentType: DemoComponent, description: string, changer: (ct: DemoComponent) => void}) {
	return (
		<td 
			key={props.componentType} 
			onClick={() => props.changer(props.componentType)}>
				{props.description}
		</td>
	);
}

type DemoComponent = '' | 'Game' | 'TempCalc' | 'Products' | 'ThemeContext' | 'ModalPortal';

class App extends Component<{}, {displayComponent: DemoComponent}> {
	
	constructor(props: {}) {
		super(props);
		this.state = {displayComponent: ''};
	}
	
	show = (component: DemoComponent) => {
		this.setState({displayComponent: component})
	}
	
	render() {
		const demoComponentName = this.state.displayComponent;
		let demoComponent;
		switch (demoComponentName) {
			case '': {
				demoComponent = (
					<Fragment>
						<img src={logo} className="App-logo" alt="logo" />
						<p>
							Edit <code>src/App.tsx</code> and save to reload.
						</p>		
						<a
						  className="App-link"
						  href="https://reactjs.org"
						  target="_blank"
						  rel="noopener noreferrer"
						>
						  Learn React
						</a>
					</Fragment>);
					break;
			}
			case 'Game': {
				demoComponent = (
					<Game />
				);
				break;
			}
			case 'TempCalc': {
				demoComponent = (
					<Calculator />
				);
				break;
			}
			case 'Products': {
				demoComponent = (
					<FilterableProductTable />
				);
				break;
			}
			case 'ThemeContext': {
				demoComponent = <ThemeContainer />;
				break
			}
			case 'ModalPortal': {
				demoComponent = <PortalContainer />;
				break;
			}
		}
  return (	
    <div className="App">
	  
      <header className="App-header">
		<Clock />
		<table>
			<thead>
				<tr>
					<DemoTab componentType="Game" description="Game" changer={this.show} />
					<DemoTab componentType="TempCalc" description="Temperature Calculator" changer={this.show} />
					<DemoTab componentType="Products" description="Products" changer={this.show} />
					<DemoTab componentType="ThemeContext" description="Themes and Context" changer={this.show} />
					<DemoTab componentType="ModalPortal" description="Modal Portals" changer={this.show} />
					<DemoTab componentType="" description="Learn React" changer={this.show} />					
				</tr>
			</thead>
		</table>
		{demoComponent}		
      </header>
    </div>
  );
	}
}

export default App;
