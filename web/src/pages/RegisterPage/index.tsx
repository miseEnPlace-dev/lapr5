import { useRef, useState } from "react";
import { useInjection } from "inversify-react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";

import { TYPES } from "@/inversify/types";
import { usePhoneNumber } from "@/hooks/usePhoneNumber";
import { IUserService } from "@/service/IService/IUserService";

import Button from "../../components/Button";
import Input from "../../components/Input";
import { useEmail } from "../../hooks/useEmail";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const userService = useInjection<IUserService>(TYPES.userService);

  const { email, setEmail, isEmailValid } = useEmail("");
  const [password, setPassword] = useState("");
  const { phoneNumber, setPhoneNumber, isPhoneNumberValid } =
    usePhoneNumber("");
  const firstNameInputRef = useRef<HTMLInputElement>(null);
  const lastNameInputRef = useRef<HTMLInputElement>(null);
  const [isAgreed, setIsAgreed] = useState(false);

  const handleRegister = async () => {
    if (
      !isEmailValid ||
      !password ||
      !firstNameInputRef.current ||
      !lastNameInputRef.current ||
      !isPhoneNumberValid ||
      !isAgreed
    )
      return;

    try {
      await userService.register({
        email,
        password,
        firstName: firstNameInputRef.current.value,
        lastName: lastNameInputRef.current?.value,
        phoneNumber,
      });
      swal(
        "Success",
        "You must now wait for an Administrator to approve your account",
        "success"
      );
      navigate("/login");
    } catch (err) {
      console.log(err);
      swal("Error", "Error creating account", "error");
      setPassword("");
    }
  };

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
        </div>
        <form className="flex w-full flex-col gap-y-4">
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
          <Input
            placeholder="Phone Number"
            type="text"
            value={phoneNumber}
            onChange={setPhoneNumber}
          />
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
              !isEmailValid || !password || !isPhoneNumberValid || !isAgreed
            }
            className="mt-2 w-full"
          >
            Register
          </Button>
        </form>
        <Link to="/login" className="text-slate-600 underline">
          Already have an account? Login here
        </Link>
      </main>
    </div>
  );
};

export default RegisterPage;
