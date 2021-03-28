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

interface GameState {
	history: {squares: string[], position: number}[];
	xIsNext: boolean;
	stepNumber: number;
}

export class Game extends React.Component<{}, GameState> {
	
	constructor(props: {}) {
		super(props);
		this.state = {
			history: [{
				squares: new Array<string>(9),
				position: -1
				}
			],
			stepNumber: 0,
			xIsNext: true
		};
	}
	
	render() {
		const history = this.state.history;
		const current = history[this.state.stepNumber];
		
		const winnerDeclared = calculateWinner(current.squares);
		let status;		
			
		if (winnerDeclared) {
			status = `Winner: ${winnerDeclared}`;				
		} else {
			status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
		}
		
		const moves = history.map((step, move) => {
			const desc = move ? `Go to move # ${move}` : 'Go to game start';
			const column = step.position >= 0 ? (step.position % 3) + 1 : 0;
			const row: number = step.position >= 0 ? Math.floor(step.position / 3) + 1 : 0;			
			const movePosition = column && row ? `(${column}, ${row})` : '';
			return (
				<li key={move}>{movePosition}&nbsp;
					<button onClick={() => this.jumpTo(move)}>{desc}</button>
				</li>
			);
		});
		
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
					<ol>{moves}</ol>
				</div>
			</div>
		);
	}
	
	private handleClick(index: number): void {
		const history = this.state.history.slice(0, this.state.stepNumber + 1);
		const current = history[history.length -1];
		const squares = current.squares.slice();
		if(calculateWinner(squares) || squares[index]) {
			return;
		}
		squares[index] = this.state.xIsNext ? 'X' : 'O';
		this.setState({
			history: history.concat([{squares, position: index}]), 
			stepNumber: history.length,
			xIsNext: !this.state.xIsNext
		});
	}
	
	private jumpTo(move: number): void {
		this.setState({
			stepNumber: move,
			xIsNext: (move % 2) === 0
		});
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