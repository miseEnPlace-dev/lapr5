interface InputGroupProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

const InputGroup: React.FC<InputGroupProps> = ({
  title,
  description,
  children,
}) => {
  return (
    <div>
      <div className="mb-2 ml-1 mt-4 text-slate-500">
        <p className="-mb-1 font-bold ">{title}</p>
        <p className="text-sm ">{description}</p>
      </div>
      <div className="flex w-full items-center gap-x-4 rounded-lg bg-slate-200 bg-opacity-50 p-5 shadow-sm">
        {children}
      </div>
    </div>
  );
};

export default InputGroup;
