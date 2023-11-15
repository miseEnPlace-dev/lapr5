import { createElement, useContext } from "react";

import AuthContext from "../../context/AuthContext";

interface SideBarProps {
  activeOption: string;
  menuOptions: {
    label: string;
    icon: string;
    onClick: () => void;
  }[];
}
const SideBar: React.FC<SideBarProps> = ({ menuOptions, activeOption }) => {
  const { role, username } = useContext(AuthContext);
  if (!role) return <></>;

  const sanitizedRole =
    role.charAt(0).toUpperCase() + role.slice(1) + " Manager";

  return (
    <nav className="grid h-screen w-1/4 max-w-sm grid-rows-[1fr_4fr_1fr] bg-primary pt-12">
      <img
        src="/assets/logos/light-reverse/png/logo-no-background.png"
        alt="Logo"
        className="mx-auto w-3/4"
      />

      <ul className="flex flex-col text-2xl">
        {menuOptions.map((option) => (
          <button
            onClick={option.onClick}
            key={option.label}
            className={`ml-12 flex h-16 items-center gap-x-4 text-white hover:text-secondary ${
              activeOption === option.label && "text-accent"
            }`}
          >
            {createElement(option.icon)}
            {option.label}
          </button>
        ))}
      </ul>

      <div className="flex items-center justify-center gap-x-4">
        <img
          src="/assets/avatar.jpg"
          alt="Avatar"
          className="aspect-square h-1/3 max-h-[64px] max-w-[64px] rounded-full"
        />
        <div>
          <h1 className="text-2xl font-bold text-white">{username}</h1>
          <p className="text-sm text-white">
            {sanitizedRole} at <span className="font-bold">RobDroneGO</span>
          </p>
        </div>
      </div>
    </nav>
  );
};

export default SideBar;
