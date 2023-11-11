import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import AuthContext from "../../context/AuthContext";
import { useEmail } from "../../hooks/useEmail";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const { state } = useLocation();

  const { email, setEmail, isEmailValid } = useEmail("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    login().then(() => {
      navigate(state?.path || "/");
    });
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <main className="flex flex-col items-center justify-center gap-y-24 px-24 w-1/2 h-3/4 rounded-lg bg-slate-100">
        <div className="flex flex-col gap-y-4">
          <h1 className="text-3xl font-bold text-center">Login</h1>
          <img
            className="w-1/2 mx-auto"
            src="/assets/logos/dark-reverse/svg/logo-no-background.svg"
            alt="Logo dark"
          />
        </div>
        <form className="flex flex-col w-full gap-y-4">
          <input
            className="w-full px-4 py-2 rounded-lg bg-slate-200"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full px-4 py-2 rounded-lg bg-slate-200"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            onClick={handleLogin}
            disabled={!isEmailValid || !password}
            className="w-full mt-4"
          >
            Login
          </Button>
        </form>
      </main>
    </div>
  );
};

export default LoginPage;
