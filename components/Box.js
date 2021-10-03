const Card = (props) => {
  const classData = `bg-${props.color ? props.color : "white"} 
      h-auto 
      w-${props.width ? props.width : "full"}
      justify-self-center
      shadow-md
      font-rob 
      p-6
      rounded-lg`;
  return (
    <div className={classData}>
      {props.title ? (
        <div
          id="title"
          className={`text-${
            props.titleAlign ? props.titleAlign : "left"
          } text-3xl mb-3`}
        >
          <strong>{props.title}</strong>
        </div>
      ) : (
        <div></div>
      )}
      <div className="text-blue-300" id="body">{props.children}</div>
    </div>
  );
};

export default Card;
