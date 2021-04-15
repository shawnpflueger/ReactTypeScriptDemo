import React from 'react';
import './TicTacToe.css';

// See https://reactjs.org/tutorial/tutorial.html for the real details

interface SquareProps {
	value?: string;
	onClick?: any;
	highlight?: boolean;
};

// An individual Tic-Tac-Toe square function component
// With the enhanced suggested functionality from the end of the tutorial for highlighting the win
// Note the onClick is actually passed down all the way from the Game component
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

// Encapsulates the actual Tic-Tac-Toe board
class Board extends React.Component<BoardProps, {}> {
	
	// From the very beginning of the tutorial, prepare a Square, but keep the render 
	// function more readable
	private renderSquare(i: number) {		
		return <Square key={i}
			value={this.props.squares[i]} 
			onClick={() => this.props.onClick(i)}
			highlight={this.props.winningSquares.indexOf(i) >= 0}
			/>; 
	}
	
	render() {
		let squareCounter = 0;
		const rows = [];
		// Double loop to create the board as suggested by the end of the tutorial
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

interface MoveHistory {
	squares: string[];
	position: number;
}

// Game state from the very end includes the move history, 
// who is next in the game, 
// what move we're on
// and how the move history is displayed, annother enhancement from the end of the tutorial
interface GameState {
	history: MoveHistory[];
	xIsNext: boolean;
	stepNumber: number;
	sortMovesDescending: boolean;
}

// TODO Allow user to select what character's they're playing
// TODO Somehow save state between when users flip between this component and others in the Demo
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
		
		// Determine if we have a winner, then setup the status and highlighting.
		const winningInfo = calculateWinner(current.squares);
		let status;
		let winningSquares: number[] = [];
			
		if (winningInfo) {
			status = `Winner: ${winningInfo.winner}`;
			// Used for the highlighting
			winningSquares = winningInfo.line;
		} else if (this.state.stepNumber === 9) {
			// Another enhancement from the end, declare a tie
			status = 'Game ended in a tie';
		} else {
			status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
		}
		
		let moves = history.map((step, move) => this.showHistoricalMove(step, move));
		// Ez-Pz enhancement from the end of the tutorial to sort the moves
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
	
	// This was refactored out since there is a lot going on here
	private showHistoricalMove(historyMove: MoveHistory, move: number) {
		// What move to show
		const description = move ? `Go to move # ${move}` : 'Go to game start';
		// Determine the column upon which the move was made
		const column = historyMove.position >= 0 ? (historyMove.position % 3) + 1 : 0;
		// Determine the row upon which the move was made
		const row: number = historyMove.position >= 0 ? Math.floor(historyMove.position / 3) + 1 : 0;
		const movePosition = column && row ? `(${column}, ${row})` : '';
		// Hightlight (bold) the list item move that was selected
		const listClass = this.state.stepNumber !== (this.state.history.length -1) && this.state.stepNumber === move ? 'selectedMove' : '';
		return (
			<li key={move} className={listClass}>
				<span>
					{movePosition}&nbsp;
					<button onClick={() => this.jumpTo(move)}>{description}</button>
				</span>
			</li>
		);
	}
	
	private changeSortOrder(): void {
		this.setState((s: GameState, p: {}) => {return {sortMovesDescending: !s.sortMovesDescending};});
	}
	
	// This handler is actually for the game squares 
	private handleClick(index: number): void {
		// Make a little copy of the history, see if we're the last move and if there's already a winner
		const history = this.state.history.slice(0, this.state.stepNumber + 1);
		const current = history[history.length -1];
		const squares = current.squares.slice();
		if (calculateWinner(squares) || squares[index]) {
			return;
		}
		// Then set up the state for the next potential move
		squares[index] = this.state.xIsNext ? 'X' : 'O';
		// Use the function mode so we can swap who's turn is next
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

// All the actual winning moves (The only real winning move is not to play though)
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

// Actual determine if we have a winner, returning either null (no winner) or the line upon which they won
// And who it was
// Exported for testing purposes
export function calculateWinner(squares: string[]): {winner: string, line: number[]} | null {
	for(let i = 0; i < lines.length; i++) {
		const [a,b,c] = lines[i];
		if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return {winner: squares[a], line: lines[i]};
		}
	}
	return null;
}

export default Game;