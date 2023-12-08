import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { useMenuOptions } from "@/hooks/useMenuOptions";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import SideBar from "@/components/SideBar";

import { useListUsersModule } from "./module.ts";

const ANIMATION_DELAY = 0.1;

const UsersPage: React.FC = () => {
  const navigate = useNavigate();
  const { users } = useListUsersModule();

  const [isUserModalVisible, setIsUserModalVisible] = useState(false);

  const { menuOptions } = useMenuOptions();

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
              <div className="flex w-full flex-col gap-y-4">
                <Input className="w-full" placeholder="Name" />
              </div>
              <Button name="save" type="confirm">
                Save
              </Button>
            </div>
          </Modal>
        </div>
      </main>
    </div>
  );
};

export default UsersPage;
