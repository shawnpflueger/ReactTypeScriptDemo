import React, {Component} from 'react';
import './ThemeContext.css';

type Theme = {foreground: string; background: string;};

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

const ThemeContext = React.createContext(themes.light);

class ThemeContainer extends Component<{}, {theme: Theme}> {
	
	constructor(props: {}) {
		super(props);
		this.state = {
			theme: themes.light
		};
	}
	
	toggleTheme = () => {
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

function Toolbar(props: {changeTheme: any}) {
	return (
		<div>
			<ThemedButton name="test" onClick={props.changeTheme}/>
		</div>
	);
}

class ThemedButton extends Component<{name: string, onClick: any},{}> {
	static contextType = ThemeContext;
	render() {
		return <button onClick={this.props.onClick} style={{backgroundColor: this.context.background}}>{this.props.name}</button>;
	}
}

export default ThemeContainer;