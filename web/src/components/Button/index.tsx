const backgrounds = {
  submit:
    "bg-green-500 hover:bg-green-700 disabled:hover:bg-green-500",
  cancel: "bg-red-500 hover:bg-red-700 disabled:hover:bg-red-500",
  reset: "bg-gray-500 hover:bg-gray-700 disabled:hover:bg-gray-500",
};

interface ButtonProps {
  children: React.ReactNode;
  type: keyof typeof backgrounds;
  onClick?: () => void;
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
      className={`${backgrounds[type]} font-poppins text-lg text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline
      disabled:opacity-50 disabled:cursor-not-allowed
       ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
