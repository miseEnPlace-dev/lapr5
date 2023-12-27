import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { useMenuOptions } from "@/hooks/useMenuOptions";
import Button from "@/components/Button";
import Dropdown from "@/components/Dropdown";
import Input from "@/components/Input";
import InputGroup from "@/components/InputGroup";
import Modal from "@/components/Modal";
import Pagination from "@/components/Pagination";
import SideBar from "@/components/SideBar";
import TextArea from "@/components/TextArea";

import { useTasksModule } from "./module";

const ANIMATION_DELAY = 0.1;

const TasksPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    requests,
    page,
    setPage,
    itemsPerPage,
    handlePagination,
    taskTypes,
    typeInputRef,
    setType,
    type,
    building1Floors,
    setBuilding1Code,
    setBuilding2Code,
    building2Code,
    building1Code,
    buildings,
    building1Rooms,
    building2Rooms,
    handleCreate,
    pickupUserNameInputRef,
    pickupUserPhoneInputRef,
    deliveryUserNameInputRef,
    deliveryUserPhoneInputRef,
    confirmationCodeInputRef,
    descriptionInputRef,
    emergencyNameInputRef,
    emergencyPhoneInputRef,
    floorInputRef,
  } = useTasksModule();
  const [isTaskModalVisible, setIsTaskModalVisible] = useState(false);

  const { menuOptions } = useMenuOptions();

  return (
    <div className="flex">
      <SideBar menuOptions={menuOptions} />
      <main className="mt-12 flex h-full w-full flex-col gap-y-4 pl-12">
        <h1 className="text-4xl font-bold">Task Requests</h1>
        <p className="text-slate-500">Manage here all your task requests.</p>
        <div
          aria-label="tasks-container"
          className="mr-12 mt-8 flex flex-col justify-between gap-y-6 text-left text-lg"
        >
          <motion.button
            name="create-task"
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.2,
              delay: requests?.length || 0 * ANIMATION_DELAY,
            }}
            onClick={() => setIsTaskModalVisible(true)}
            className="flex w-full items-center justify-center bg-secondary px-12 py-4 text-center text-5xl font-bold"
          >
            +
          </motion.button>
          {!requests ? null : requests.length == 0 ? ( // TODO: skeleton component // TODO: skeleton component
            <p className="text-slate-500">
              Seems like you didn't request any task yet. Click the button above
              to request a new task.
            </p>
          ) : (
            requests.map((request, i) => (
              <motion.button
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: ANIMATION_DELAY * i }}
                key={i}
                //onClick={() => navigate(`/buildings/${building.code}`)}
                className="flex w-full items-center gap-x-10 bg-slate-200 px-12 py-8"
              >
                <h2 className="text-3xl font-bold">{request.userName}</h2>
                <div className="flex flex-col">
                  <h3 className="text-left text-2xl font-bold">
                    {request.phoneNumber}
                  </h3>
                  <div className="text-left text-sm text-slate-600">
                    <span>&nbsp;&middot; {request.description}</span>
                  </div>
                </div>
              </motion.button>
            ))
          )}

          <Pagination
            changePage={handlePagination}
            className="flex items-center justify-center gap-x-4"
          />

          <Modal
            setIsVisible={setIsTaskModalVisible}
            isVisible={isTaskModalVisible}
            title="Create Task Request"
          >
            <div className="flex h-full flex-col justify-between gap-y-4">
              <div className="flex w-full flex-col gap-y-5">
                <Dropdown
                  options={taskTypes}
                  placeholder="Select Task Type"
                  className="w-full"
                  name="Task Type"
                  inputRef={typeInputRef}
                  onChange={(e) => setType(e.target.value)}
                />
                {type == "pick_delivery" ? (
                  <>
                    <div className="flex w-full items-center gap-x-4">
                      <InputGroup
                        title="Pickup Location"
                        description="Select the room from which the robot will pick up the object."
                      >
                        <Dropdown
                          name="Building"
                          options={buildings}
                          onChange={(e) => setBuilding1Code(e.target?.value)}
                          className="w-full"
                        />
                        <Dropdown
                          className="w-full"
                          name="Room"
                          disabled={building1Code === ""}
                          options={building1Rooms.map((room) => ({
                            code: room.name,
                            name: room.name,
                          }))}
                        />
                      </InputGroup>
                      <InputGroup
                        title="Delivery Location"
                        description="Select the room to which the robot will deliver the object."
                      >
                        <Dropdown
                          name="Building"
                          options={buildings}
                          onChange={(e) => setBuilding2Code(e.target?.value)}
                          className="w-full"
                        />
                        <Dropdown
                          className="w-full"
                          name="Room"
                          disabled={building2Code === ""}
                          options={building2Rooms.map((room) => ({
                            code: room.name,
                            name: room.name,
                          }))}
                        />
                      </InputGroup>
                    </div>
                    <div className="flex w-full items-center gap-x-4">
                      <InputGroup
                        title="Pickup Contact"
                        description="Provide information about the person that will deliver the object to the robot."
                      >
                        <Input
                          placeholder="Name"
                          type="text"
                          className="w-full"
                          inputRef={pickupUserNameInputRef}
                        />
                        <Input
                          placeholder="Phone Number"
                          type="text"
                          className="w-2/3"
                          inputRef={pickupUserPhoneInputRef}
                        />
                      </InputGroup>
                      <InputGroup
                        title="Delivery Contact"
                        description="Provide information about the person that will receive the object from the robot."
                      >
                        <Input
                          placeholder="Name"
                          type="text"
                          className="w-full"
                          inputRef={deliveryUserNameInputRef}
                        />
                        <Input
                          placeholder="Phone Number"
                          type="text"
                          className="w-2/3"
                          inputRef={deliveryUserPhoneInputRef}
                        />
                      </InputGroup>
                    </div>
                    <Input
                      name="Confirmation Code"
                      description="This code will be asked to the recipient to confirm the delivery."
                      placeholder="Maximum of 6 digits"
                      type="text"
                      className="w-full"
                      inputRef={confirmationCodeInputRef}
                    />
                    <TextArea
                      placeholder="Object Description"
                      description="Provide a meaningful description of the object that will be transported."
                      className="w-full"
                      inputRef={descriptionInputRef}
                    />
                  </>
                ) : type == "surveillance" ? (
                  <>
                    <InputGroup
                      title="Floor"
                      description="Select the floor on which the surveillance will be made."
                    >
                      <Dropdown
                        name="Building"
                        options={buildings}
                        onChange={(e) => setBuilding1Code(e.target?.value)}
                        className="w-full"
                      />
                      <Dropdown
                        className="w-full"
                        name="Floor"
                        disabled={building1Code === ""}
                        options={building1Floors.map((floor) => ({
                          code: floor.code,
                          name: floor.code,
                        }))}
                        inputRef={floorInputRef}
                      />
                    </InputGroup>
                    <InputGroup
                      title="Emergency Contact"
                      description="Provide the Name and Phone Number of someone that the robot can contact in case of an emergency."
                    >
                      <Input
                        placeholder="Name"
                        type="text"
                        className="w-full"
                        inputRef={emergencyNameInputRef}
                      />
                      <Input
                        placeholder="Phone Number"
                        type="text"
                        className="w-2/3"
                        inputRef={emergencyPhoneInputRef}
                      />
                    </InputGroup>
                    <TextArea
                      placeholder="Object Description"
                      description="Provide a meaningful description of the object that will be transported."
                      className="w-full"
                      inputRef={descriptionInputRef}
                    />
                  </>
                ) : (
                  ""
                )}
              </div>
              <Button name="save" type="confirm" onClick={handleCreate}>
                Request
              </Button>
            </div>
          </Modal>
        </div>
      </main>
    </div>
  );
};

export default TasksPage;
