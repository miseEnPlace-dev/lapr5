interface InputProps {
  value?: string;
  defaultValue?: string;
  onChange?: (val: string) => void;
  type?: string;
  placeholder?: string;
  className?: string;
  inputRef?: React.RefObject<HTMLInputElement>;
}

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  type = "text",
  placeholder,
  className,
  inputRef,
  defaultValue,
}) => {
  return (
    <input
      className={`w-full rounded-lg bg-slate-200 px-4 py-2.5 ${className}`}
      placeholder={placeholder}
      type={type}
      defaultValue={defaultValue}
      value={value}
      onChange={(e) => onChange && onChange(e.target.value)}
      ref={inputRef}
    />
  );
};

export default Input;
