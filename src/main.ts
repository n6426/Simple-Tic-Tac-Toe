type Player = "X" | "O";
type Cell = Player | null;
type GameState = "playing" | "win" | "draw";

interface GameResult {
  state: GameState;
  winner: Player | null;
  winningLine: readonly number[];
}

const boardSize = 9;
const winningLines: readonly (readonly number[])[] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const boardElement = document.querySelector<HTMLElement>("#board");
const restartButton = document.querySelector<HTMLButtonElement>("#restart-button");
const statusMessage = document.querySelector<HTMLElement>("#status-message");
const currentPlayerElement = document.querySelector<HTMLElement>("#current-player");
const boardStateElement = document.querySelector<HTMLElement>("#board-state");
const moveCountElement = document.querySelector<HTMLElement>("#move-count");

if (
  !boardElement ||
  !restartButton ||
  !statusMessage ||
  !currentPlayerElement ||
  !boardStateElement ||
  !moveCountElement
) {
  throw new Error("Missing required app elements.");
}

const board: Cell[] = Array.from({ length: boardSize }, () => null);
const cells: HTMLButtonElement[] = [];

let currentPlayer: Player = "X";
let gameState: GameState = "playing";
let winner: Player | null = null;
let winningLine: readonly number[] = [];
let lastMoveIndex = -1;

for (let index = 0; index < boardSize; index += 1) {
  const cellButton = document.createElement("button");
  cellButton.type = "button";
  cellButton.className = "square";
  cellButton.dataset.index = String(index);
  cellButton.setAttribute("role", "gridcell");
  cellButton.addEventListener("click", () => handleMove(index));
  boardElement.append(cellButton);
  cells.push(cellButton);
}

restartButton.addEventListener("click", resetGame);

render();

function handleMove(index: number): void {
  if (gameState !== "playing" || board[index] !== null) {
    return;
  }

  board[index] = currentPlayer;
  lastMoveIndex = index;

  const result = evaluateBoard(board);
  gameState = result.state;
  winner = result.winner;
  winningLine = result.winningLine;

  if (gameState === "playing") {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }

  render();
}

function resetGame(): void {
  board.fill(null);
  currentPlayer = "X";
  gameState = "playing";
  winner = null;
  winningLine = [];
  lastMoveIndex = -1;
  render();
}

function evaluateBoard(currentBoard: Cell[]): GameResult {
  for (const line of winningLines) {
    const [a, b, c] = line;
    const mark = currentBoard[a];

    if (mark !== null && mark === currentBoard[b] && mark === currentBoard[c]) {
      return {
        state: "win",
        winner: mark,
        winningLine: line,
      };
    }
  }

  if (currentBoard.every((cell) => cell !== null)) {
    return {
      state: "draw",
      winner: null,
      winningLine: [],
    };
  }

  return {
    state: "playing",
    winner: null,
    winningLine: [],
  };
}

function render(): void {
  const moveCount = board.reduce((count, cell) => count + Number(cell !== null), 0);
  const isGameOver = gameState !== "playing";

  for (let index = 0; index < cells.length; index += 1) {
    const cellButton = cells[index];
    const cellValue = board[index];
    const isWinningCell = winningLine.includes(index);
    const isLastMove = index === lastMoveIndex;

    cellButton.textContent = cellValue ?? "";
    cellButton.disabled = isGameOver || cellValue !== null;
    cellButton.classList.toggle("is-x", cellValue === "X");
    cellButton.classList.toggle("is-o", cellValue === "O");
    cellButton.classList.toggle("is-winning", isWinningCell);
    cellButton.classList.toggle("is-last-move", isLastMove);
    cellButton.setAttribute(
      "aria-label",
      describeSquare(index, cellValue, isWinningCell)
    );
    cellButton.setAttribute("aria-disabled", String(cellButton.disabled));
  }

  currentPlayerElement.textContent = currentPlayer;
  boardStateElement.textContent = describeState();
  moveCountElement.textContent = String(moveCount);
  statusMessage.textContent = describeStatus();
}

function describeState(): string {
  if (gameState === "win") {
    return `${winner} wins`;
  }

  if (gameState === "draw") {
    return "Draw";
  }

  return "In progress";
}

function describeStatus(): string {
  if (gameState === "win") {
    return `${winner} wins with the ${describeLine(winningLine)}. Restart to play again.`;
  }

  if (gameState === "draw") {
    return "The board is full. Restart to open a fresh match.";
  }

  return `${currentPlayer} to move. Claim any open square.`;
}

function describeLine(line: readonly number[]): string {
  const lineKey = line.join(",");

  switch (lineKey) {
    case "0,1,2":
      return "top row";
    case "3,4,5":
      return "middle row";
    case "6,7,8":
      return "bottom row";
    case "0,3,6":
      return "left column";
    case "1,4,7":
      return "center column";
    case "2,5,8":
      return "right column";
    case "0,4,8":
      return "main diagonal";
    case "2,4,6":
      return "reverse diagonal";
    default:
      return "winning line";
  }
}

function describeSquare(index: number, cellValue: Cell, isWinningCell: boolean): string {
  const squareLabel = `Square ${index + 1}`;

  if (cellValue === null) {
    return gameState === "playing"
      ? `${squareLabel}, empty`
      : `${squareLabel}, unavailable`;
  }

  const suffix = isWinningCell ? ", winning square" : "";
  return `${squareLabel}, ${cellValue}${suffix}`;
}
