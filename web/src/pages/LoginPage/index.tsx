import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { Link } from "react-router-dom";

import Button from "../../components/Button";
import Input from "../../components/Input";
import { useLoginPageModule } from "./module";

const LoginPage: React.FC = () => {
  const {
    email,
    setEmail,
    isEmailValid,
    password,
    setPassword,
    handleGoogleLogin,
    handleGoogleError,
    handleLogin,
  } = useLoginPageModule();

  return (
    <GoogleOAuthProvider clientId="838280803307-s71r87h9u07f6fjm3uuvcdgh233k7jds.apps.googleusercontent.com">
      <div className="flex h-screen items-center justify-center">
        <main className="flex h-3/4 w-5/6 flex-col items-center justify-center gap-y-6 rounded-lg bg-slate-100 px-6 md:px-24 lg:w-1/2">
          <div className="mb-10 flex flex-col gap-y-4">
            <h1 className="text-center text-xl font-bold md:text-2xl">
              Welcome to
            </h1>
            <img
              className="mx-auto w-1/2"
              src="/assets/logos/light/svg/logo-no-background.svg"
              alt="Logo dark"
            />
          </div>
          <form className="flex w-full flex-col gap-y-4">
            <Input
              placeholder="Email"
              type="email"
              value={email}
              onChange={setEmail}
            />
            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={setPassword}
            />
            <Button
              onClick={(e) => {
                e.preventDefault();
                handleLogin();
              }}
              name="login"
              disabled={!isEmailValid || !password}
              className="mt-4 w-full"
            >
              Login
            </Button>
          </form>
          <Link to="/register" className="mb-2 text-slate-600 underline">
            Don't have an account? Register here
          </Link>
          <div className="-mb-1 flex w-full items-center justify-center">
            <div className="h-0 w-full border border-slate-300"></div>
            <p className="mx-2 text-sm text-slate-400">or</p>
            <div className="h-0 w-full border border-slate-300"></div>
          </div>
          <GoogleLogin
            type="standard"
            shape="pill"
            theme="outline"
            text="continue_with"
            size="large"
            locale="en-GB"
            logo_alignment="center"
            width="400"
            onSuccess={handleGoogleLogin}
            onError={handleGoogleError}
          />
        </main>
      </div>
    </GoogleOAuthProvider>
  );
};

export default LoginPage;
