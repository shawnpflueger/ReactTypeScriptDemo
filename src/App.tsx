import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Game from './TicTacToe';
import Calculator from './TemperatureCalculator';
import FilterableProductTable from './ThinkReact';

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

/*function showGame() {
	console.log('Show Game');
}*/
type DemoComponent = '' | 'Game' | 'TempCalc' | 'Products';

class App extends Component<{}, {displayComponent: DemoComponent}> {
	
	constructor(props: {}) {
		super(props);
		this.state = {displayComponent: ''};
	}
	
	show = (component: DemoComponent) => {
		console.log(`Show ${component}`);
		this.setState({displayComponent: component})
	}
	
	render() {
		const demoComponentName = this.state.displayComponent;
		let demoComponent;
		switch (demoComponentName) {
			case '': {
				demoComponent = (
					<div>
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
					</div>);
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
		}
  return (	
    <div className="App">
	  
      <header className="App-header">
		<Clock />
		<table>
			<thead>
				<tr>
					<td onClick={() => this.show('Game')}>
						Game
					</td>
					<td onClick={() => this.show('TempCalc')}>
						Temparature Calculator
					</td>
					<td onClick={() => this.show('Products')}>
						Products
					</td>
					<td onClick={() => this.show('')}>
						Learn React
					</td>
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
