import React from "react";

const LoginPage: React.FC = () => {
  return (
    <div className="flex flex-col h-screen lg:flex-row">
      <div className="flex justify-center items-center py-12 bg-primary">
        <img className="w-56" src="/assets/Logos/LogoLightModeReverse/png/logo-no-background.png" alt="RobDroneGO" />
      </div>
      <div className="flex flex-col h-full">
        <div className="font-heading text-2xl font-bold">
          <h1>Welcome!</h1>
        </div>
        <div>
            <input type="text" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
