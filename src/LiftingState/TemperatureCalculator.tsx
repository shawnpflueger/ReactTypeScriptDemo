import React, { Component, ChangeEvent } from 'react';
import './TemperatureCalculator.css';

// Scales of Celsius (yes) and Fahrenheit (yuck) because there's like 2 countries that still use it
const scaleNames: Map<string, string> = new Map<string, string>([
	['c', 'Celsius'],
	['f', 'Fahrenheit']
]);

// Display boiling by celsius, because those numbers make sense.
// It's using an early return, but could easily be changed to a variable for would/would not
// Exported for testing purposes
export function BoilingVerdict(props: {celsius: number}) {
	if (props && props.celsius && props.celsius >= 100) {
		return <p>The water would boil.</p>;
	}
	return <p>The water would not boil.</p>;
}

// Input properties for they type of temperature input
interface TemperatureInputProperties {
	scale: string;
	temperature: string;
	onTemperatureChange: (temperature: string) => void;
};

// We can use this for Celsius, Fahrenheit, or maybe Kelvin
class TemperatureInput extends Component<TemperatureInputProperties, {}> {
	
	// TODO: We don't even really need this, we could use a function passing down the prop to 
	// the input onChange and this whole thing could become a React Function Component
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
					data-testid={`input-${scaleName}`}
				/>
			</fieldset>
		);
	}
}

// From Fahrenheit calculation
// Exported for testing purposes
export function toCelsius(fahrenheit: number): number {
	return (fahrenheit - 32) * 5 / 9;
}

// From Celsius calculation
// Exported for testing purposes
export function toFahrenheit(celsius: number): number {
	return (celsius * 9 / 5) + 32;
}

// We pass in a function on how we want the conversion to compute.
// Because we're using this on an input we have to deal with a string as the potential value
// TODO: Really the parameter should be called input and the parsed value should be the temperature
function tryConvert(temperature: string, convert: (i: number) => number): string {
	const input = parseFloat(temperature);
	if (Number.isNaN(input)) {
		return '';
	}
	const output = convert(input);
	const rounded = Math.round(output * 1000) / 1000;
	return rounded.toString();
}

// And our final exported lifted state Calculator component. 
// Note	that this is the only component in our tree with any state, it's all "lifted" up
// TODO: We could put a little more information into the scales (at the top), and then generate a whole slew of
// conversion components
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