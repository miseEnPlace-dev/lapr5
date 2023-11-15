interface SelectorProps {
  items: { name: string; selected: boolean }[];
  setItems: React.Dispatch<
    React.SetStateAction<{ name: string; selected: boolean }[]>
  >;
  additionalText?: string;
  activeClassName?: string;
}

const Selector: React.FC<SelectorProps> = ({
  items,
  setItems,
  additionalText,
  activeClassName = "bg-secondary",
}) => {
  return (
    <div className="flex flex-col gap-y-4">
      {items.map((item) => (
        <button
          key={item.name}
          className={`relative flex items-center justify-center gap-x-4 text-center text-xl font-bold hover:brightness-90
          ${
            item.selected ? activeClassName : "bg-slate-200"
          } w-full rounded-md py-2`}
          onClick={() => {
            setItems(
              items.map((item_) =>
                item_.name === item.name
                  ? { ...item_, selected: !item_.selected }
                  : item_
              )
            );
          }}
        >
          {additionalText}
          {item.name}
          <span>{item.selected ? "✅" : "❌"}</span>
        </button>
      ))}
    </div>
  );
};

export default Selector;
