import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Calculator, {BoilingVerdict, toCelsius, toFahrenheit} from './TemperatureCalculator';

test('renders a Celsius and Fahrenheit input', () => {
	render(<Calculator />);
	
	let temperatureInput = screen.getByText(/celsius/i);
	expect(temperatureInput).toBeTruthy();
	
	temperatureInput = screen.getByText(/fahrenheit/i);
	expect(temperatureInput).toBeTruthy();
	
	const calculationDetermination = screen.getByText(/the water would not boil/i);
	expect(calculationDetermination).toBeTruthy();	
});

test('water should boil when the temperature > 100', () => {
	render(<BoilingVerdict celsius={101}/>);
	const verdict = screen.getByText(/the water would/i);
	expect(verdict.innerHTML).toEqual('The water would boil.');
});

test('convert fahrenheit temperatures to celsius', () => {
  let celsius = toCelsius(212.0);
  expect(celsius).toEqual(100);
  
  celsius = toCelsius(32);
  expect(celsius).toEqual(0);
  
  celsius = toCelsius(-40);
  expect(celsius).toEqual(-40);
});

test('convert celsius temperatures to fahrenheit temperatures', () => {
  let fahrenheit = toFahrenheit(100.0);
  expect(fahrenheit).toEqual(212);
  
  fahrenheit = toFahrenheit(0);
  expect(fahrenheit).toEqual(32);
  
  fahrenheit = toFahrenheit(-40);
  expect(fahrenheit).toEqual(-40);
});

test('changing the temperature in one input should change the value in the other input', () => {
	const component = render(<Calculator />);
	
	const celsiusInput = screen.getByTestId('input-Celsius');
	const fahrenheitInput = screen.getByTestId('input-Fahrenheit');
	
	userEvent.type(celsiusInput, '0');
	
	expect(fahrenheitInput).toHaveValue('32');
	
	fahrenheitInput.setSelectionRange(0, -1);
	userEvent.type(fahrenheitInput, '{backspace}212');
	
	expect(celsiusInput).toHaveValue('100');
	
});
