const backgrounds = {
  submit: "bg-primary hover:bg-primary-700 disabled:hover:bg-primary",
  cancel: "bg-red-500 hover:bg-red-700 disabled:hover:bg-red-500",
  reset: "bg-gray-500 hover:bg-gray-700 disabled:hover:bg-gray-500",
};

interface ButtonProps {
  children: React.ReactNode;
  type: keyof typeof backgrounds;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  type,
  onClick,
  disabled,
  className,
}) => {
  return (
    <button
      className={`${backgrounds[type]} rounded px-6 py-2 font-poppins text-lg font-bold text-white focus:outline-none
      disabled:cursor-not-allowed disabled:opacity-50
       ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
