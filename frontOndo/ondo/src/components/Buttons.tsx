const Buttons = (text :any, onClick :any) => {
  return (
    <button
      className={"Button"} 
      onClick={onClick}
    >
      {text}
    </button>
  );
};

Buttons.defaultProps = {
  // type: "default",
  text: "버튼",
};

export default Buttons;
