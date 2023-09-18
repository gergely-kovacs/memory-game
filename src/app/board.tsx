"use client";

import { useState } from "react";

interface Card {
  value: number;
  isMatched: boolean;
  isFlipped: boolean;
}

const board: Card[] = [
  { value: 0, isMatched: false, isFlipped: false },
  { value: 0, isMatched: false, isFlipped: false },
  { value: 1, isMatched: false, isFlipped: false },
  { value: 1, isMatched: false, isFlipped: false },
  { value: 2, isMatched: false, isFlipped: false },
  { value: 2, isMatched: false, isFlipped: false },
  { value: 3, isMatched: false, isFlipped: false },
  { value: 3, isMatched: false, isFlipped: false },
  { value: 4, isMatched: false, isFlipped: false },
  { value: 4, isMatched: false, isFlipped: false },
];

export default function Board() {
  const [gameState, setGameState] = useState(board);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);

  // TODO: check if the game is over (all cards matched), add a button to reset the game
  function checkForMatch(otherCardIndex: number): void {
    if (gameState[otherCardIndex].isMatched) {
      return;
    }

    if (selectedCardIndex === otherCardIndex) {
      return;
    }

    const copiedBoard = [...gameState];

    if (selectedCardIndex === null) {
      setSelectedCardIndex(otherCardIndex);
      copiedBoard[otherCardIndex].isFlipped = true;
      setGameState(copiedBoard);
      return;
    }

    if (copiedBoard[selectedCardIndex].value === copiedBoard[otherCardIndex].value) {
      copiedBoard[selectedCardIndex].isMatched = true;
      copiedBoard[otherCardIndex].isMatched = true;
      setSelectedCardIndex(null);
      copiedBoard[otherCardIndex].isFlipped = false;
      setGameState(copiedBoard);
      return;
    }

    copiedBoard[otherCardIndex].isFlipped = true;

    setSelectedCardIndex(null);

    setTimeout(() => {
      setGameState((currentState) => {
        const stateCopy = [...currentState];
        stateCopy[selectedCardIndex].isFlipped = false;
        stateCopy[otherCardIndex].isFlipped = false;
        return stateCopy;
      });
    }, 1000);
  }

  return (
    <>
      {gameState.map((card, index) => (
        <div
          key={index}
          onClick={() => checkForMatch(index)}
          className="bg-green-400 text-gray-600 text-lg font-semibold flex items-center justify-center w-24 h-36 m-6"
        >
          <span>{card.isFlipped || card.isMatched ? card.value : ""}</span>
        </div>
      ))}
    </>
  );
}
