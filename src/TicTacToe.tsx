import React from 'react';
import './TicTacToe.css';

interface SquareProps {
	value?: string;
	onClick?: any;
};

function Square(props: SquareProps) {
	return (
			<button 
				className="square" 
				onClick={props.onClick}>
				{props.value}
			</button>
		);
}

interface BoardProps {
	squares: string[];
	onClick: any;
}

class Board extends React.Component<BoardProps, {}> {
	
	renderSquare(i: number) {
		return <Square 
			value={this.props.squares[i]} 
			onClick={() => this.props.onClick(i)}
			/>; 
	}
	
	render() {
		return (
			<div>
				<div className="board-row">
					{this.renderSquare(0)}
					{this.renderSquare(1)}
					{this.renderSquare(2)}
				</div>
				<div className="board-row">
					{this.renderSquare(3)}
					{this.renderSquare(4)}
					{this.renderSquare(5)}
				</div>
				<div className="board-row">
					{this.renderSquare(6)}
					{this.renderSquare(7)}
					{this.renderSquare(8)}
				</div>
			</div>
		);
	}
	
}

export class Game extends React.Component<{}, {history: {squares: string[]}[], xIsNext: boolean}> {
	
	constructor(props: {}) {
		super(props);
		this.state = {
			history: [{
				squares: new Array<string>(9)
				}
			],
			xIsNext: true
		};
	}
	
	render() {
		const history = this.state.history;
		const current = history[history.length -1];
		//const winner = calculateWinner(current.squares);
		
		const winnerDeclared = calculateWinner(current.squares);
		let status;		
			
		if (winnerDeclared) {
			status = `Winner: ${winnerDeclared}`;				
		} else {
			status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
		}
		
		return (
			<div className="game">
				<div className="game-board">
					<Board 
						squares={current.squares}
						onClick={(i:number) => this.handleClick(i)}
					/>
				</div>
				<div className="game-info">
					<div>{status}</div>
					<ol>{/* TODO */}</ol>
				</div>
			</div>
		);
	}
	
	private handleClick(index: number): void {
		const history = this.state.history;
		const current = history[history.length -1];
		const squares = current.squares.slice();
		if(calculateWinner(squares) || squares[index]) {
			return;
		}
		squares[index] = this.state.xIsNext ? 'X' : 'O';
		//this.setState({squares, xIsNext: !this.state.xIsNext});
		this.setState({history: history.concat([{squares}]), xIsNext: !this.state.xIsNext});
	}
}

const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	];

function calculateWinner(squares: string[]): string	| null {
	for(let i = 0; i < lines.length; i++) {
		const [a,b,c] = lines[i];
		if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a];
		}
	}
	return null;
}

export default Game;