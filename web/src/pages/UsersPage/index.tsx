import { useState } from "react";
import { motion } from "framer-motion";
import swal from "sweetalert";

import { useMenuOptions } from "@/hooks/useMenuOptions";
import Button from "@/components/Button";
import Dropdown from "@/components/Dropdown/index.tsx";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import Pagination from "@/components/Pagination/index.tsx";
import PasswordInput from "@/components/PasswordInput/index.tsx";
import SideBar from "@/components/SideBar";

import { useListUsersModule } from "./module.ts";

import { AxiosError } from "axios";

const ANIMATION_DELAY = 0.1;

const UsersPage: React.FC = () => {
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
    nif,
    setNif,
    isNifValid,
    isPhoneNumberValid,
    firstNameInputRef,
    lastNameInputRef,
    roleInputRef,
    handleCreateUser,
    handlePagination,
  } = useListUsersModule();

  const [isUserModalVisible, setIsUserModalVisible] = useState(false);

  const { menuOptions } = useMenuOptions();

  const handleRegister = async () => {
    try {
      await handleCreateUser();

      swal("Success", "User created successfully", "success");
      setIsUserModalVisible(false);
    } catch (err) {
      console.log(err);
      if (err instanceof AxiosError && err.response?.data.message)
        swal("Error", err.response.data.message, "error");
      else swal("Error", "Error creating account", "error");
      setPassword("");
    }
  };

  function changeRole(role: string) {
    if (role == "user") setNif("");
    setRole(role);
  }

  return (
    <div className="flex">
      <SideBar menuOptions={menuOptions} />
      <main className="my-12 flex h-full w-full flex-col gap-y-4 pl-12">
        <h1 className="text-4xl font-bold">Users</h1>
        <p className="text-slate-500">Manage here all users of the campus.</p>
        <div className="mr-12 mt-8 flex flex-col justify-between gap-y-6 text-left text-lg">
          <motion.button
            name="create-user"
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.2,
              delay: users?.data.length || 0 * ANIMATION_DELAY,
            }}
            onClick={() => setIsUserModalVisible(true)}
            className="flex w-full items-center justify-center bg-secondary px-12 py-4 text-center text-5xl font-bold"
          >
            +
          </motion.button>
          {!users ? null : users.data.length == 0 ? ( // TODO: skeleton component
            <p className="text-slate-600">
              No results were found for your search...
            </p>
          ) : (
            users.data.map((user, i) => (
              <motion.button
                initial={{
                  opacity: 0,
                  x: -100,
                }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: ANIMATION_DELAY * i }}
                key={user.email}
                className="flex w-full cursor-auto items-center gap-x-10 bg-slate-200 px-12 py-8"
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
            ))
          )}

          <Pagination
            meta={users?.meta}
            changePage={handlePagination}
            className="flex items-center justify-center gap-x-4"
          />

          <Modal
            setIsVisible={setIsUserModalVisible}
            isVisible={isUserModalVisible}
            title="Create User"
            className="px-12 pb-12"
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
                onChange={(e) => changeRole(e.target.value)}
              />
              {role == "user" ? (
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
                autoComplete="off"
                value={email}
                onChange={setEmail}
              />
              <PasswordInput value={password} onChange={setPassword} />
              <Button
                type="confirm"
                onClick={(e) => {
                  e.preventDefault();
                  handleRegister();
                }}
                name="register"
                disabled={
                  !isEmailValid ||
                  !password ||
                  !isPhoneNumberValid ||
                  (!isNifValid && role == "user")
                }
                className="mt-8 w-full"
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
