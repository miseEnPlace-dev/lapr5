import { createElement, useContext } from "react";

import AuthContext from "../../context/AuthContext";
import { useMenuOptions } from "../../hooks/useMenuOptions";

const SideBar: React.FC = () => {
  const { menuOptions } = useMenuOptions();
  const { role, username } = useContext(AuthContext);
  if (!role) return <></>;

  const sanitizedRole =
    role.charAt(0).toUpperCase() + role.slice(1) + " Manager";

  return (
    <nav className="grid h-screen w-1/4 max-w-sm grid-rows-[1fr_4fr_1fr] bg-primary pt-8">
      <img
        src="/assets/logos/light-reverse/png/logo-no-background.png"
        alt="Logo"
        className="mx-auto w-3/4"
      />

      <ul className="flex flex-col text-2xl">
        {menuOptions.map((option) => (
          <button
            onClick={option.onClick}
            className="ml-12 flex h-16 items-center gap-x-4 text-white hover:text-secondary"
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
          className="h-16 w-16 rounded-full"
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
