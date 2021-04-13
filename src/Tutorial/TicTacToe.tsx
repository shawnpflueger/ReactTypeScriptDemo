import React from 'react';
import './TicTacToe.css';

interface SquareProps {
	value?: string;
	onClick?: any;
	highlight?: boolean;
};

// Exported for testing purposes
export function Square(props: SquareProps) {
	return (
			<button 
				className={`square ${props.highlight ? "highlight" : ""}`}
				onClick={props.onClick}>
				{props.value}
			</button>
		);
}

interface BoardProps {
	squares: string[];
	winningSquares: number[];
	onClick: any;
}

class Board extends React.Component<BoardProps, {}> {
	
	renderSquare(i: number) {		
		return <Square key={i}
			value={this.props.squares[i]} 
			onClick={() => this.props.onClick(i)}
			highlight={this.props.winningSquares.indexOf(i) >= 0}
			/>; 
	}
	
	render() {
		let squareCounter = 0;
		const rows = [];
		for (let r = 0; r < 3; r++) {
			const columns = [];
			for (let c = 0; c < 3; c++) {
				columns.push(this.renderSquare(squareCounter++));				
			}
			rows.push((
				<div className="board-row" key={r}>
					{columns}
				</div>));
		}		
		
		return (
			<div>
				{rows}
			</div>
		);
	}
	
}

interface GameState {
	history: {squares: string[], position: number}[];
	xIsNext: boolean;
	stepNumber: number;
	sortMovesDescending: boolean;
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
			xIsNext: true,
			sortMovesDescending: false
		};
	}
	
	render() {
		const history = this.state.history;
		const current = history[this.state.stepNumber];
		
		const winnerDeclared = calculateWinner(current.squares);
		let status;
		let winningSquares: number[] = [];
			
		if (winnerDeclared) {
			status = `Winner: ${winnerDeclared.winner}`;
			winningSquares = winnerDeclared.line;
		} else if (this.state.stepNumber === 9) {
			status = 'Game ended in a tie';
		} else {
			status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
		}
		
		let moves = history.map((step, move) => {
			const desc = move ? `Go to move # ${move}` : 'Go to game start';
			const column = step.position >= 0 ? (step.position % 3) + 1 : 0;
			const row: number = step.position >= 0 ? Math.floor(step.position / 3) + 1 : 0;			
			const movePosition = column && row ? `(${column}, ${row})` : '';
			const listClass = this.state.stepNumber !== (history.length -1) && this.state.stepNumber === move ? 'selectedMove' : '';
			return (
				<li key={move} className={listClass}>
					<span>
						{movePosition}&nbsp;
						<button onClick={() => this.jumpTo(move)}>{desc}</button>
					</span>
				</li>
			);
		});
		
		if (this.state.sortMovesDescending) {
			moves = moves.reverse();
		};
		const direction = this.state.sortMovesDescending ? 'Ascending' : 'Descending';
		
		return (
			<div className="game">
				<div className="game-board">
					<Board 
						squares={current.squares}
						winningSquares={winningSquares}
						onClick={(i:number) => this.handleClick(i)}
					/>
				</div>
				<div className="game-info">
					<div>{status}</div>
					<div><button onClick={() => this.changeSortOrder()}>Sort Moves {direction}</button></div>
					<ol>{moves}</ol>
				</div>
			</div>
		);
	}
	
	private changeSortOrder(): void {
		this.setState((s: GameState, p: {}) => {return {sortMovesDescending: !s.sortMovesDescending};});
	}
	
	private handleClick(index: number): void {
		const history = this.state.history.slice(0, this.state.stepNumber + 1);
		const current = history[history.length -1];
		const squares = current.squares.slice();
		if(calculateWinner(squares) || squares[index]) {
			return;
		}
		squares[index] = this.state.xIsNext ? 'X' : 'O';
		this.setState((s: GameState, p: {}) => { return {
			history: history.concat([{squares, position: index}]), 
			stepNumber: history.length,
			xIsNext: !s.xIsNext
		};});
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

// Exported for testing purposes
export function calculateWinner(squares: string[]): {winner: string, line: number[]}	| null {
	for(let i = 0; i < lines.length; i++) {
		const [a,b,c] = lines[i];
		if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return {winner: squares[a], line: lines[i]};
		}
	}
	return null;
}

export default Game;