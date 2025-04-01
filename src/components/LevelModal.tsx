const LevelModal = ({
  selectLevel,
}: {
  selectLevel: (level: number) => void;
}) => {
  return (
    <div className="modal-container">
      <div className="modal-content">
        <h2>Choose a Level</h2>
        <div>
          <button onClick={() => selectLevel(5)} style={{ margin: "5px" }}>
            Easy
          </button>
          <button onClick={() => selectLevel(8)} style={{ margin: "5px" }}>
            Medium
          </button>
          <button onClick={() => selectLevel(12)} style={{ margin: "5px" }}>
            Hard
          </button>
        </div>
      </div>
    </div>
  );
};

export default LevelModal;
