interface TextAreaProps {
  value?: string;
  defaultValue?: string;
  onChange?: (val: string) => void;
  placeholder?: string;
  className?: string;
  inputRef?: React.RefObject<HTMLTextAreaElement>;
  rows?: number;
}

const TextArea: React.FC<TextAreaProps> = ({
  value,
  onChange,
  placeholder,
  className,
  inputRef,
  defaultValue,
  rows = 5,
}) => {
  return (
    <div className={`flex flex-col gap-y-1 ${className}`}>
      <label htmlFor={placeholder} className="ml-1 font-bold text-slate-500">
        {placeholder}
      </label>
      <textarea
        className={`h-28 max-h-64 min-h-[80px] w-full resize-y rounded-lg border border-slate-500 bg-slate-100 px-4 py-2.5 ${className}`}
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={value}
        name={placeholder}
        maxLength={255}
        rows={rows}
        onChange={(e) => onChange && onChange(e.target.value)}
        ref={inputRef}
      />
    </div>
  );
};

export default TextArea;
