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

  return (
    <div className="flex">
      <SideBar menuOptions={menuOptions} />
      <main className="mt-12 flex h-full w-full flex-col gap-y-4 pl-12">
        <h1 className="text-4xl font-bold">
          Welcome, <span className="text-primary">{username}</span>
        </h1>
        <p className="-mt-2 text-lg capitalize text-slate-600">{role}</p>
        <div className="mr-12 mt-8 flex flex-col justify-between gap-y-6 text-left">
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
          className="mr-12 mt-4"
          onClick={handleDeleteAccount}
        >
          Delete Account
        </Button>
      </main>
    </div>
  );
};

export default ProfilePage;
