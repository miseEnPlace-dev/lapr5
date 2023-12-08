import { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

import { useMenuOptions } from "@/hooks/useMenuOptions";
import Button from "@/components/Button";
import Input from "@/components/Input";
import SideBar from "@/components/SideBar";

import { useModule } from "./module";

import { AxiosError } from "axios";

const ProfilePage: React.FC = () => {
  const { menuOptions } = useMenuOptions();
  const {
    username,
    role,
    user,
    deleteUser,
    firstNameInputRef,
    lastNameInputRef,
    phoneNumberInputRef,
    passwordInputRef,
    handleUpdate,
    confirmPasswordInputRef,
  } = useModule();

  const navigate = useNavigate();

  async function handleDeleteAccount() {
    try {
      if (
        await swal({
          title: "Do you want to delete your account?",
          icon: "warning",
          buttons: ["Cancel", "Yes, delete it"],
          dangerMode: true,
        })
      ) {
        await deleteUser();
        swal("Success", "Account deleted successfully", "success");
        navigate("/login");
      }
    } catch (err) {
      swal("Error", err as string, "error");
    }
  }

  async function handleSave() {
    try {
      await handleUpdate();

      swal("Success", "Profile saved successfully", "success");
    } catch (err: unknown) {
      if (err instanceof AxiosError && err.response)
        swal("Error", err.response.data.errors as string, "error");
      else if (err instanceof Error) swal("Error", err.message, "error");
      else swal("Error", err as string, "error");
    }
  }

  console.log("USER", user);

  return (
    <div className="flex">
      <SideBar menuOptions={menuOptions} />
      <main className="mt-12 flex h-full w-full flex-col gap-y-4 pl-12">
        <h1 className="text-4xl font-bold">
          Welcome, <span className="text-primary">{username}</span>
        </h1>
        <p className="text-slate-500">
          Manage here all your personal information.
        </p>
        <div className="mr-12 mt-8 flex flex-col justify-between gap-y-6 text-left">
          <div className="flex flex-row gap-x-4">
            <Input
              name="First Name"
              type="text"
              className="w-full"
              inputRef={firstNameInputRef}
              defaultValue={user?.firstName || ""}
            />
            <Input
              name="Last Name"
              type="text"
              className="w-full"
              inputRef={lastNameInputRef}
              defaultValue={user?.lastName || ""}
            />
          </div>
          <Input name="Role" type="text" defaultValue={role || ""} disabled />
          <Input
            name="Email"
            type="text"
            defaultValue={user?.email || ""}
            disabled
          />
          <Input
            name="Phone Number"
            type="text"
            inputRef={phoneNumberInputRef}
            defaultValue={user?.phoneNumber || ""}
          />
          <Input
            name="New Password"
            type="password"
            inputRef={passwordInputRef}
            placeholder="Insert a new password"
          />
          <Input
            name="Confirm your New Password"
            type="password"
            inputRef={confirmPasswordInputRef}
            placeholder="Reinsert your new password"
          />
        </div>
        <Button
          type="confirm"
          name="save"
          className="mr-12 mt-4"
          onClick={handleSave}
        >
          Save
        </Button>
        <Button
          type="destroy"
          name="delete-account"
          className="mr-12"
          onClick={handleDeleteAccount}
        >
          Delete Account
        </Button>
      </main>
    </div>
  );
};

export default ProfilePage;
