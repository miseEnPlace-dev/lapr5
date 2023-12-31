import { useState } from "react";
import { motion } from "framer-motion";

import { useMenuOptions } from "@/hooks/useMenuOptions";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import SideBar from "@/components/SideBar";
import { CheckIcon } from "@/styles/Icons.ts";

import { useListRequestsModule } from "./module.ts";

const ANIMATION_DELAY = 0.1;

const RequestsPage: React.FC = () => {
  const { requests, handleAcceptRequest, handleRejectRequest } =
    useListRequestsModule();

  const [isUserModalVisible, setIsUserModalVisible] = useState(false);

  const { menuOptions } = useMenuOptions();

  return (
    <div className="flex">
      <SideBar menuOptions={menuOptions} />
      <main className="my-12 flex h-full w-full flex-col gap-y-4 pl-12">
        <h1 className="text-4xl font-bold">Requests</h1>
        <p className="text-slate-500">
          Manage here all requests from users that want to sign up in
          RobDroneGO.
        </p>
        <div className="mr-12 mt-8 flex flex-col justify-between gap-y-6 text-left text-lg">
          {requests.length === 0 && (
            <p className="text-slate-500">
              There are no requests pending at the moment.
            </p>
          )}
          {requests.map((request, i) => (
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: ANIMATION_DELAY * i }}
              key={request.email}
              className="relative flex w-full items-center gap-x-10 bg-slate-200 px-12 py-8"
            >
              <h2 className="text-5xl font-bold">
                {request.firstName} {request.lastName}
              </h2>
              <div className="flex flex-col">
                <h3 className="text-left text-2xl font-bold">
                  {request.email}
                </h3>
                <div className="text-left text-base text-slate-600">
                  {request.phoneNumber}
                </div>
              </div>
              <div className="absolute right-8 flex items-center gap-x-6">
                <Button
                  className="relative h-12 w-12 items-center justify-center"
                  name="confirm"
                  type="confirm"
                  onClick={() => handleAcceptRequest(request.id)}
                >
                  <CheckIcon className="absolute left-1/2 top-1/2 z-10 h-6 w-6 flex-1 -translate-x-1/2 -translate-y-1/2" />
                </Button>
                <Button
                  className="flex h-12 w-12 items-center justify-center text-center font-semibold"
                  name="delete"
                  type="destroy"
                  onClick={() => handleRejectRequest(request.id)}
                >
                  X
                </Button>
              </div>
            </motion.div>
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

export default RequestsPage;
