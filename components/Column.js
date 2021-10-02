const Column = (props) => {
  return (
    <div>
      <div
        className={`bg-blue-400 flex h-16 ${
          props.round ? props.round : ""
        } w-52 items-center justify-center`}
      >
        <strong>{props.label}</strong>
      </div>
      {props.rows.map((row, index) => (
        <div
          key={index}
          className={`text-xs ${
            index % 2 == 0 ? "bg-gray-200" : "bg-gray-300"
          } flex h-16 w-52 items-center justify-center`}
        >
          {row}
        </div>
      ))}
    </div>
  );
};
export default Column;
