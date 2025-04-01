import Cell from "./Cell";

const Line = ({
  solution,
  line,
  finishType,
}: {
  solution: string;
  line: string;
  finishType: boolean;
}) => {
  const characters = [];

  for (let index = 0; index < solution.length; index++) {
    let className = "cell";

    if (finishType) {
      if (line[index] === solution[index]) {
        className += " correct";
      } else if (solution.includes(line[index])) {
        className += " wrongPlace";
      }
    }

    const value = (line && line[index]) || "";
    characters.push(<Cell value={value} className={className} key={index} />);
  }

  return <div className="line">{characters}</div>;
};

export default Line;
