import React, { Component, ChangeEvent } from 'react';
import './TemperatureCalculator.css';

const scaleNames: Map<string, string> = new Map<string, string>([
	['c', 'Celsius'],
	['f', 'Fahrenheit']
]);

function BoilingVerdict(props: {celsius: number}) {
	if (props && props.celsius && props.celsius >= 100) {
		return <p>The water would boil.</p>;
	}
	return <p>The water would not boil.</p>;
}

interface TemperatureInputProperties {
	scale: string;
	temperature: string;
	onTemperatureChange: (temperature: string) => void;
};

class TemperatureInput extends Component<TemperatureInputProperties, {}> {
	
	private handleChange = (e: ChangeEvent<HTMLInputElement>) => {		
		this.props.onTemperatureChange(e.target.value);
	}
	
	render() {
		const temperature = this.props.temperature;
		const scale = this.props.scale;
		const scaleName = scaleNames.get(scale);
		return (
			<fieldset>
				<legend>Enter temperature in {scaleName}:</legend>
				<input 
					value={temperature}
					onChange={this.handleChange}
				/>
			</fieldset>
		);
	}
}

function toCelsius(fahrenheit: number): number {
	return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius: number): number {
	return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature: string, convert: (i: number) => number): string {
	const input = parseFloat(temperature);
	if (Number.isNaN(input)) {
		return '';
	}
	const output = convert(input);
	const rounded = Math.round(output * 1000) / 1000;
	return rounded.toString();
}
				
class Calculator extends Component<{}, {scale: string, temperature: string}> {
	
	constructor(props: {}) {
		super(props);
		this.state = {scale: 'c', temperature: ''};
	}
	
	private handleCelsiusChange = (temperature: string) => {
		this.setState({scale: 'c', temperature});
	}
	
	private handleFahrenheitChange = (temperature: string) => {
		this.setState({scale: 'f', temperature});
	}
	
	render() {
		const scale = this.state.scale;
		const temperature = this.state.temperature;
		const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
		const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;
		return (
			<div>
				<TemperatureInput scale="c" temperature={celsius} onTemperatureChange={this.handleCelsiusChange}/>
				<TemperatureInput scale="f" temperature={fahrenheit} onTemperatureChange={this.handleFahrenheitChange}/>
				<BoilingVerdict
					celsius={parseFloat(celsius)} />
			</div>
		);
	}
}

export default Calculator;