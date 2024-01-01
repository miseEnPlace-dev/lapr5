import { Link } from "react-router-dom";

import Button from "../../components/Button";
import Input from "../../components/Input";
import { useRegisterPageModule } from "./module";

const RegisterPage: React.FC = () => {
  const {
    email,
    setEmail,
    isEmailValid,
    password,
    setPassword,
    phoneNumber,
    setPhoneNumber,
    isPhoneNumberValid,
    nif,
    setNif,
    isNifValid,
    firstNameInputRef,
    lastNameInputRef,
    isAgreed,
    setIsAgreed,
    handleRegister,
    googleUserInfo,
    handleRegisterWithGoogle,
  } = useRegisterPageModule();

  return (
    <div className="flex h-screen items-center justify-center">
      <main className="flex h-3/4 w-5/6 flex-col items-center justify-center gap-y-6 rounded-lg bg-slate-100 px-6 md:px-24 lg:w-1/2">
        <div className="mb-4 flex flex-col gap-y-4">
          {/* <h1 className="text-center text-xl font-bold md:text-3xl">
            Welcome to
          </h1> */}
          <img
            className="mx-auto w-1/2"
            src="/assets/logos/light/svg/logo-no-background.svg"
            alt="Logo dark"
          />
          {googleUserInfo && (
            <div className="mt-5 flex w-full flex-col items-center justify-center">
              <h3 className="mb-1 text-xl font-bold text-slate-700">
                Welcome, {googleUserInfo.name}!
              </h3>
              <p className="text-slate-600">
                Please fill in the rest of your information to complete your
                account.
              </p>
            </div>
          )}
        </div>
        <form className="flex w-full flex-col gap-y-4">
          {!googleUserInfo ? (
            <>
              <div className="flex w-full items-center gap-x-4">
                <Input
                  placeholder="First Name"
                  type="text"
                  className="w-full"
                  inputRef={firstNameInputRef}
                />
                <Input
                  placeholder="Last Name"
                  className="w-full"
                  type="text"
                  inputRef={lastNameInputRef}
                />
              </div>
              <div className="flex w-full items-center gap-x-4">
                <Input
                  placeholder="Phone Number"
                  type="text"
                  className="w-3/4"
                  value={phoneNumber}
                  onChange={setPhoneNumber}
                />
                <Input
                  placeholder="NIF"
                  type="text"
                  className="w-full"
                  value={nif}
                  onChange={setNif}
                />
              </div>
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
              <div className="flex items-center gap-x-2">
                <input
                  type="checkbox"
                  onChange={(e) => setIsAgreed(e.target.checked)}
                />
                <label className="text-slate-600">
                  I agree to the{" "}
                  <Link to="/privacy-policy" className="text-primary underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  handleRegister();
                }}
                name="register"
                disabled={
                  !isEmailValid ||
                  !password ||
                  !isPhoneNumberValid ||
                  !isAgreed ||
                  !isNifValid
                }
                className="mt-2 w-full"
              >
                Register
              </Button>
            </>
          ) : (
            <>
              <div className="flex w-full items-center gap-x-4">
                <Input
                  placeholder="First Name"
                  type="text"
                  className="w-full"
                  disabled
                  value={googleUserInfo.given_name}
                  onChange={setEmail}
                />
                <Input
                  placeholder="Last Name"
                  className="w-full"
                  disabled
                  value={googleUserInfo.family_name}
                  type="text"
                  onChange={setEmail}
                />
              </div>
              <div className="flex w-full items-center gap-x-4">
                <Input
                  placeholder="Phone Number"
                  type="text"
                  className="w-3/4"
                  value={phoneNumber}
                  onChange={setPhoneNumber}
                />
                <Input
                  placeholder="NIF"
                  type="text"
                  className="w-full"
                  value={nif}
                  onChange={setNif}
                />
              </div>
              <Input
                placeholder="Email"
                type="email"
                disabled
                value={googleUserInfo.email}
                onChange={setEmail}
              />
              <div className="flex items-center gap-x-2">
                <input
                  type="checkbox"
                  onChange={(e) => setIsAgreed(e.target.checked)}
                />
                <label className="text-slate-600">
                  I agree to the{" "}
                  <Link to="/privacy-policy" className="text-primary underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  handleRegisterWithGoogle();
                }}
                name="register"
                disabled={!isPhoneNumberValid || !isAgreed || !isNifValid}
                className="mt-2 w-full"
              >
                Register
              </Button>
            </>
          )}
        </form>
        {!googleUserInfo && (
          <Link to="/login" className="text-slate-600 underline">
            Already have an account? Login here
          </Link>
        )}
      </main>
    </div>
  );
};

export default RegisterPage;
