interface FloorMapVisualizerProps {
  map: number[][];
}

const FloorMapVisualizer: React.FC<FloorMapVisualizerProps> = ({ map }) => {
  if (map.length === 0)
    return (
      <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-gray-900"></div>
    );

  const m = map[0].map((_, c) => map.map((r) => r[c]));

  return (
    <div className="h-full w-full">
      <div className="flex h-12 items-center justify-center gap-x-4">
        {Array.from(Array(m[0].length).keys()).map((i) => (
          <div
            key={i.toString()}
            className="h-6 w-6 text-center align-middle text-xl font-bold"
          >
            {i + 1}
          </div>
        ))}
      </div>
      {m.map((row, i) => (
        <div
          key={row.toString()}
          className="flex h-12 items-center justify-center gap-x-4"
        >
          <div className="h-6 w-6 text-center align-middle text-xl font-bold">
            {i + 1}
          </div>
          {row.map((cell, j) => (
            <div
              key={cell.toString()}
              className={`h-6 w-6 text-center align-middle text-xl font-bold ${
                cell === 1 || cell === 2 || cell === 3
                  ? "bg-gray-800"
                  : i === m.length - 1 && j === row.length - 1
                  ? "bg-gray-800"
                  : "bg-gray-200"
              }`}
            >
              {cell === 4 || cell === 5
                ? "E"
                : cell === 11 || cell === 12
                ? "D"
                : ""}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default FloorMapVisualizer;
