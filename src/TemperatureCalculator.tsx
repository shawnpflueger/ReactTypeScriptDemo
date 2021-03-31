import React, { Component, SyntheticEvent, ChangeEvent } from 'react';
import './TemperatureCalculator.css';

function BoilingVerdict(props: {celsius: number}) {
	if (props && props.celsius && props.celsius >= 100) {
		return <p>The water would boil.</p>;
	}
	return <p>The water would not boil.</p>;
}

class Calculator extends Component<{}, {temperature: string}> {
	
	constructor(props: {}) {
		super(props);
		this.state = {temperature: ''};
	}
	
	handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		this.setState({temperature: e.target.value});
	}
	
	render() {
		const temperature = this.state.temperature;
		return (
			<fieldset>
				<legend>Enter the temperature in Celsius:</legend>
				<input
					value={temperature}
					onChange={this.handleChange} />
				<BoilingVerdict
					celsius={parseFloat(temperature)} />					
			</fieldset>
		);
	}
}

export default Calculator;