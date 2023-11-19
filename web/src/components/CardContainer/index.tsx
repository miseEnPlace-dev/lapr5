interface CardContainerProps {
  children: React.ReactNode;
}

const CardContainer: React.FC<CardContainerProps> = ({ children }) => {
  return (
    <div className="flex flex-col flex-wrap items-center justify-center gap-x-8 gap-y-6 md:flex-row md:justify-start">
      {children}
    </div>
  );
};

export default CardContainer;
