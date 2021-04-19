import React, {Component} from 'react';
import './ThemeContext.css';

// Define what a theme looks like
type Theme = {foreground: string; background: string;};

// Define our themes
const themes = {
	light: {
		foreground: '#000000',
		background: '#eeeeee'
	},
	dark: {
		foreground: '#ffffff',
		background: '#222222'
	}
};

// Create a context with a default value
const ThemeContext = React.createContext(themes.light);

// Function component, this component doesn't care about the Context we just created, 
// so there is absolutely no need to reference it.
function Toolbar(props: {changeTheme: any}) {
	return (
		<div>
			<ThemedButton name="Toggle Theme" onClick={props.changeTheme}/>
		</div>
	);
}

// Define a component that does care about the context.
class ThemedButton extends Component<{name: string, onClick: any},{}> {
	// 'Inject' a reference to the context
	static contextType = ThemeContext;
	
	// Render, simple example only cares about the background colour
	render() {
		return <button 
					onClick={this.props.onClick} 
					style={{backgroundColor: this.context.background}}>
					{this.props.name}
				</button>;
	}
}

// Top level component where we maintain the theme state and have a context provider
class ThemeContainer extends Component<{}, {theme: Theme}> {
	
	constructor(props: {}) {
		super(props);
		// Unlike the docs, we'll use a light theme as default.
		// I feel like it shows off the example better given the light there is also 
		// the default when the context is created
		this.state = {
			theme: themes.light
		};
	}
	
	// Lifted state theme toggle event handler
	private toggleTheme = () => {
		this.setState(s => ({theme: s.theme === themes.dark ? themes.light : themes.dark}));
	}
	
	render() {
		return (
			<ThemeContext.Provider value={this.state.theme}>
				<Toolbar changeTheme={this.toggleTheme}/>
			</ThemeContext.Provider>
		);
	}
}

export default ThemeContainer;