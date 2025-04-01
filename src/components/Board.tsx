import { useEffect, useState } from "react";
import Line from "./Line";
import KeyBoard from "./KeyBoard";
import LevelModal from "./LevelModal";
const USER_ATTEMPS = 6;

const Board = () => {
  const [solution, setSolution] = useState<string>("");
  const [attemps, setAttemps] = useState(Array(USER_ATTEMPS).fill(null));
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [userAttemps, setUserAttemps] = useState<number>(0);
  const [wordsUsed, setWordsUsed] = useState<Set<string>>(new Set());
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const [selectedLevel, setSelectedLevel] = useState<number>(5);

  const handleReset = () => {
    setAttemps(Array(USER_ATTEMPS).fill(null));
    setUserAttemps(0);
    const newSet = new Set("");
    setWordsUsed(newSet);
    setGameOver(false);
    setCurrentGuess("");
    fetchWord(selectedLevel);
  };

  const fetchWord = async (level: number) => {
    const url = buildUrl(level);

    if (url) {
      const result = await fetch(url);
      const response = await result.json();

      const randomWord =
        response[Math.floor(Math.random() * response.length)].word;
      setSolution(randomWord);
    }
  };

  useEffect(() => {
    const handleGuess = (e: KeyboardEvent) => {
      const key = e.key;

      if (key === "Backspace") {
        setCurrentGuess(currentGuess.slice(0, -1));
      }

      if (key === "Enter") {
        if (currentGuess.length < solution.length) {
          return;
        }
        if (currentGuess === solution) {
          setGameOver(true);
        }

        const copyAttemps = [...attemps];

        copyAttemps[copyAttemps.findIndex((item) => item == null)] =
          currentGuess;
        setAttemps(copyAttemps);
        setUsedWords();
        setCurrentGuess("");
        setUserAttemps(userAttemps + 1);
      }

      if (
        currentGuess.length >= solution.length ||
        gameOver ||
        wordsUsed.has(key)
      ) {
        return;
      }

      if (key.match(/^[a-z]$/)) {
        setCurrentGuess((prev) => prev + key);
      }
    };

    document.addEventListener("keydown", handleGuess);

    return () => {
      document.removeEventListener("keydown", handleGuess);
    };
  }, [currentGuess, solution, attemps, userAttemps, gameOver, wordsUsed]);

  useEffect(() => {
    if (attemps.includes(solution)) {
      setGameOver(true);
    }
  }, [attemps, solution]);

  const handleKey = (key: string) => {
    setCurrentGuess((prev) => prev + key.toLocaleLowerCase());
  };

  const handleSubmit = () => {
    if (currentGuess.length < solution.length) {
      return;
    }
    const copyAttemps = [...attemps];

    copyAttemps[copyAttemps.findIndex((item) => item == null)] = currentGuess;
    setAttemps(copyAttemps);
    setUsedWords();
    setCurrentGuess("");
    setUserAttemps(userAttemps + 1);
  };

  const handleDelete = () => {
    setCurrentGuess(currentGuess.slice(0, -1));
  };

  const setUsedWords = () => {
    const newSet = new Set(wordsUsed);

    for (let index = 0; index < solution.length; index++) {
      if (!solution.includes(currentGuess[index])) {
        newSet.add(currentGuess[index]);
      }
    }

    setWordsUsed(newSet);
  };

  const selectLevel = (level: number) => {
    setIsModalOpen(false);
    handleReset();
    setSelectedLevel(level);
    fetchWord(level);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const buildUrl = (level: number = 5) => {
    const pattern = "?".repeat(level);
    return `https://api.datamuse.com/words?sp=${pattern}`;
  };

  return (
    <div className="board">
      <h1>Guess The Word</h1>
      <div className="lostContainer">
        {gameOver && (
          <>
            <h2>YOU DID IT !!!</h2>
            <button onClick={handleReset}>Try Again</button>
          </>
        )}
        {userAttemps === USER_ATTEMPS &&
          attemps[attemps.length - 1] !== solution && (
            <>
              <span>
                {`Failed, the correct word was `}
                <strong>{solution.toUpperCase()}</strong>
              </span>
              <button onClick={handleReset}>Try Again</button>
            </>
          )}
      </div>
      {attemps.map((line, index) => {
        const isCurrentLine = index === attemps.findIndex((val) => val == null);

        return (
          <Line
            key={index}
            solution={solution}
            line={isCurrentLine ? currentGuess : line ?? ""}
            finishType={line && line.length === solution.length}
          />
        );
      })}
      <KeyBoard
        handleKey={handleKey}
        handleSubmit={handleSubmit}
        wordsUsed={wordsUsed}
        handleDelete={handleDelete}
      />
      {isModalOpen && <LevelModal selectLevel={selectLevel} />}
      {!(gameOver || userAttemps === USER_ATTEMPS) && (
        <button onClick={openModal}>Choose Level</button>
      )}
    </div>
  );
};

export default Board;
