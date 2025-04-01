const Cell = ({ value, className }: { value: string; className: string }) => {
  return <div className={className}>{value}</div>;
};

export default Cell;
