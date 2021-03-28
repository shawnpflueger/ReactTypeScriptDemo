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

interface BoardState {
	squares: string[];
	xIsNext: boolean;
}

class Board extends React.Component<{},BoardState> {
	
	constructor(props: {}) {
		super(props);
		this.state = {
			squares: new Array<string>(9),
			xIsNext: true
		}
	}
	
	private handleClick(index: number): void {
		const squares = this.state.squares.slice();
		if(calculateWinner(this.state.squares) || squares[index]) {
			return;
		}
		squares[index] = this.state.xIsNext ? 'X' : 'O';
		this.setState({squares, xIsNext: !this.state.xIsNext});
	}
	
	renderSquare(i: number) {
		return <Square 
			value={this.state.squares[i]} 
			onClick={() => this.handleClick(i)}
			/>; 
	}
	
	render() {
		const winnerDeclared = calculateWinner(this.state.squares);
		let status;		
			
		if (winnerDeclared) {
			status = `Winner: ${winnerDeclared}`;				
		} else {
			status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
		}
		
		return (
			<div>
				<div className="status">{status}</div>
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

export class Game extends React.Component {
	render() {
		return (
			<div className="game">
				<div className="game-board">
					<Board />
				</div>
				<div className="game-info">
					<div>{/* status */}</div>
					<ol>{/* TODO */}</ol>
				</div>
			</div>
		);
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