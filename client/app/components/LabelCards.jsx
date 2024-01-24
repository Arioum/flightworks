const LabelCards = ({ children, className }) => {
  return (
    <div className={`bg-[#e9e9e9] p-[1em] rounded-[20px] ${className}`}>
      {children}
    </div>
  );
};

export default LabelCards;
