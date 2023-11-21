import { DeviceModel } from "@/model/DeviceModel";

interface InputSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  center?: boolean;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  inputRef?: React.Ref<HTMLSelectElement>;
  options: DeviceModel[];
}

const InputSelect: React.FC<InputSelectProps> = ({
  name,
  center,
  placeholder,
  className,
  disabled,
  inputRef,
  options,
  ...rest
}) => {
  return (
    <div className={`flex flex-col gap-y-1 ${className}`}>
      <label
        className="ml-1 font-bold text-slate-500"
        htmlFor={name}
      >
        {name}
      </label>
      <select
        name={name}
        id={name}
        disabled={disabled}
        placeholder={placeholder}
        ref={inputRef}
        className={`w-full rounded-lg border border-slate-500 bg-slate-100 px-4 py-2.5 text-left
        disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 ${className}`}
        {...rest}
      >
        {options.map((option, index) => (
          <option key={index} value={option.code}>
            {option.name}
          </option>
        ))} 
      </select> 
    </div>
  );
};

export default InputSelect;