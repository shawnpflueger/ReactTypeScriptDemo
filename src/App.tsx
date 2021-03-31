import React from 'react';
import logo from './logo.svg';
import './App.css';
import Game from './TicTacToe';
import Calculator from './TemperatureCalculator';

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

function App() {
  return (	
    <div className="App">
	  <Game />
	  <Calculator />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
		<Clock />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
