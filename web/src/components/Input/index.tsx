interface InputProps {
  value?: string;
  defaultValue?: string | number;
  onChange?: (val: string) => void;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  className?: string;
  step?: number;
  disabled?: boolean;
  inputRef?: React.RefObject<HTMLInputElement>;
}

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  type = "text",
  placeholder,
  step,
  disabled,
  className,
  inputRef,
  defaultValue,
}) => {
  return (
    <div className={`flex flex-col gap-y-1 ${className}`}>
      <label htmlFor={placeholder} className="ml-1 font-bold text-slate-500">
        {placeholder}
      </label>
      {onChange === undefined ? (
        <input
          className="w-full rounded-lg border border-slate-500 bg-slate-100 px-4 py-2.5
          disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
          placeholder={placeholder}
          type={type}
          name={placeholder}
          step={step}
          disabled={disabled}
          defaultValue={defaultValue}
          ref={inputRef}
        />
      ) : (
        <input
          className="w-full rounded-lg border border-slate-500 bg-slate-100 px-4 py-2.5 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
          placeholder={placeholder}
          type={type}
          name={placeholder}
          disabled={disabled}
          step={step}
          defaultValue={defaultValue}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          ref={inputRef}
        />
      )}
    </div>
  );
};

export default Input;