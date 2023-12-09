import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";

import { useMenuOptions } from "@/hooks/useMenuOptions";
import Button from "@/components/Button";
import Dropdown from "@/components/Dropdown/index.tsx";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import SideBar from "@/components/SideBar";

import { useListUsersModule } from "./module.ts";

const ANIMATION_DELAY = 0.1;

const UsersPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    users,
    roles,
    role,
    setRole,
    email,
    setEmail,
    isEmailValid,
    password,
    setPassword,
    phoneNumber,
    setPhoneNumber,
    isPhoneNumberValid,
    firstNameInputRef,
    lastNameInputRef,
    roleInputRef,
    isAgreed,
    handleCreateUser,
    setIsAgreed,
  } = useListUsersModule();

  const [isUserModalVisible, setIsUserModalVisible] = useState(false);

  const { menuOptions } = useMenuOptions();

  const handleRegister = async () => {
    try {
      handleCreateUser();

      swal("Success", "User created successfully", "success");
      navigate("/login");
    } catch (err) {
      console.log(err);
      swal("Error", "Error creating account", "error");
      setPassword("");
    }
  };

  return (
    <div className="flex">
      <SideBar menuOptions={menuOptions} />
      <main className="mt-12 flex h-full w-full flex-col gap-y-4 pl-12">
        <h1 className="text-4xl font-bold">Users</h1>
        <p className="text-slate-500">Manage here all users of the campus.</p>
        <div className="mr-12 mt-8 flex flex-col justify-between gap-y-6 text-left text-lg">
          <motion.button
            name="create-user"
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.2,
              delay: users.length || 0 * ANIMATION_DELAY,
            }}
            onClick={() => setIsUserModalVisible(true)}
            className="flex w-full items-center justify-center bg-secondary px-12 py-4 text-center text-5xl font-bold"
          >
            +
          </motion.button>

          {users.map((user, i) => (
            <motion.button
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: ANIMATION_DELAY * i }}
              key={user.email}
              onClick={() => navigate(`/users/${user.id}`)}
              className="flex w-full items-center gap-x-10 bg-slate-200 px-12 py-8"
            >
              <h2 className="text-5xl font-bold">
                {user.firstName} {user.lastName}
              </h2>
              <div className="flex flex-col">
                <h3 className="text-left text-2xl font-bold">{user.email}</h3>
                <div className="text-left text-sm capitalize text-slate-600">
                  {user.role}
                </div>
              </div>
            </motion.button>
          ))}

          <Modal
            setIsVisible={setIsUserModalVisible}
            isVisible={isUserModalVisible}
            title="Create User"
          >
            <div className="flex h-full flex-col justify-between gap-y-4">
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
              <Dropdown
                options={roles}
                placeholder="Select Role"
                className="w-full"
                inputRef={roleInputRef}
                name="Role"
                onChange={(e) => setRole(e.target.value)}
              />
              {role == "user" ? (
                <div className="flex w-full items-center gap-x-4">
                  <Input
                    placeholder="Phone Number"
                    type="text"
                    className="w-full"
                    value={phoneNumber}
                    onChange={setPhoneNumber}
                  />
                  <Input
                    placeholder="NIF"
                    type="text"
                    className="w-full"
                    value={phoneNumber}
                    onChange={setPhoneNumber}
                  />
                </div>
              ) : (
                <Input
                  placeholder="Phone Number"
                  type="text"
                  value={phoneNumber}
                  onChange={setPhoneNumber}
                />
              )}
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
                  The user agrees to the{" "}
                  <Link to="/privacy-policy" className="text-primary underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>
              <Button
                type="confirm"
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
            </div>
          </Modal>
        </div>
      </main>
    </div>
  );
};

export default UsersPage;
