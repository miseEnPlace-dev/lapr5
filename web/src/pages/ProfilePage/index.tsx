import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

import { useMenuOptions } from "@/hooks/useMenuOptions";
import Button from "@/components/Button";
import Input from "@/components/Input";
import SideBar from "@/components/SideBar";

import { useModule } from "./module";

const ProfilePage: React.FC = () => {
  const { menuOptions } = useMenuOptions();
  const { username, role, deleteUser } = useModule();

  const navigate = useNavigate();

  async function handleDeleteAccount() {
    try {
      await deleteUser();
      swal("Success", "Account deleted successfully", "success");

      navigate("/login");
    } catch (err) {
      swal("Error", err as string, "error");
    }
  }

  return (
    <div className="flex">
      <SideBar menuOptions={menuOptions} />
      <main className="mt-12 flex h-full w-full flex-col gap-y-4 pl-12">
        <h1 className="text-3xl">
          Welcome, <span className="text-primary">{username}</span>
        </h1>
        <p className="-mt-4 text-xl capitalize text-slate-600">{role}</p>
        <div className="flex w-full flex-col gap-y-4 py-8 pr-24">
          <Input
            name="Username"
            type="text"
            defaultValue={username || ""}
            disabled
          />
        </div>
        <Button
          type="destroy"
          name="delete-account"
          className="mx-auto mr-24 w-1/2 -translate-x-1/2"
          onClick={handleDeleteAccount}
        >
          Delete Account
        </Button>
      </main>
    </div>
  );
};

export default ProfilePage;
