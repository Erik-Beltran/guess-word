import { ReactNode } from "react";

const KeyBoard = ({
  handleKey,
  handleSubmit,
  wordsUsed,
  handleDelete,
}: {
  handleKey: (buttonId: string) => void;
  handleSubmit: () => void;
  handleDelete: () => void;
  wordsUsed: Set<string>;
}) => {
  const alphabet = [
    "Q",
    "W",
    "E",
    "R",
    "T",
    "Y",
    "U",
    "I",
    "O",
    "P",
    "A",
    "S",
    "D",
    "F",
    "G",
    "H",
    "J",
    "K",
    "L",
    "Z",
    "X",
    "C",
    "V",
    "B",
    "N",
    "M",
  ];

  return (
    <div className="alphabet-board">
      {alphabet.map((letter, index): ReactNode => {
        return (
          <button
            className={
              wordsUsed.has(letter.toLocaleLowerCase())
                ? "letter used-letter"
                : "letter"
            }
            key={index}
            onClick={() => handleKey(letter)}
            disabled={wordsUsed.has(letter.toLocaleLowerCase())}
          >
            {letter}
          </button>
        );
      })}
      <button className="letter" onClick={handleDelete}>
        Del
      </button>
      <div className="submit-button">
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default KeyBoard;
