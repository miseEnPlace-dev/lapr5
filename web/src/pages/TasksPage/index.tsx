import { useState } from "react";
import { motion } from "framer-motion";
import swal from "sweetalert";

import { useMenuOptions } from "@/hooks/useMenuOptions";
import Button from "@/components/Button";
import Dropdown from "@/components/Dropdown";
import Input from "@/components/Input";
import InputGroup from "@/components/InputGroup";
import Loading from "@/components/Loading";
import Modal from "@/components/Modal";
import Pagination from "@/components/Pagination";
import SideBar from "@/components/SideBar";
import TextArea from "@/components/TextArea";
import { RequestPickAndDelivery } from "@/model/RequestPickAndDelivery";
import { RequestSurveillance } from "@/model/RequestSurveillance";
import { formatDate } from "@/utils/formatDate";

import { useTasksModule } from "./module";

import { AxiosError } from "axios";

const ANIMATION_DELAY = 0.1;

const TasksPage: React.FC = () => {
  const {
    requests,
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
    username,
    phoneNumber,
    room1Code,
    room2Code,
    setRoom1Code,
    setRoom2Code,
    setFloorCode,
    floorCode,
    floorRooms,
  } = useTasksModule();

  const [isTaskModalVisible, setIsTaskModalVisible] = useState(false);

  const { menuOptions } = useMenuOptions();

  async function handleSaveClick() {
    try {
      await handleCreate();

      swal("Success", "Request created successfully", "success");
      setIsTaskModalVisible(false);
    } catch (err: unknown) {
      console.error(err);
      if (err instanceof AxiosError && err.response?.data.message)
        swal("Error", err.response.data.message, "error");
      else swal("Error", "Error creating request", "error");
    }
  }

  function getStateTextColor(state: string | undefined) {
    switch (state) {
      case "Pending":
        return "text-yellow-700";
      case "Accepted":
        return "text-green-800";
      case "Rejected":
        return "text-red-800";
      default:
        return "text-slate-600";
    }
  }

  return (
    <div className="flex">
      <SideBar menuOptions={menuOptions} />
      <main className="my-12 flex h-full w-full flex-col gap-y-4 pl-12">
        <h1 className="text-4xl font-bold">Tasks</h1>
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
              delay: requests?.data.length || 0 * ANIMATION_DELAY,
            }}
            onClick={() => setIsTaskModalVisible(true)}
            className="flex w-full items-center justify-center bg-secondary px-12 py-4 text-center text-5xl font-bold"
          >
            +
          </motion.button>
          {!requests ? (
            <Loading loadingText={false} />
          ) : requests.data.length == 0 ? (
            <p className="text-slate-500">
              No results were found for your search... Create your first request
              or try to change or remove the filters.
            </p>
          ) : (
            requests.data.map((request, i) => (
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: ANIMATION_DELAY * i }}
                key={i}
                className="w-full items-center bg-slate-200 px-12 py-8"
              >
                {request.type == "surveillance" ? (
                  <div className="flex gap-x-10">
                    <h3 className="text-4xl font-bold capitalize">
                      Floor {(request as RequestSurveillance).floorId}
                    </h3>
                    <div className="flex flex-col text-start text-base text-slate-500">
                      <div className="font-bold uppercase">
                        Surveillance &nbsp;&middot;&nbsp;&nbsp;
                        {request.requestedAt && formatDate(request.requestedAt)}
                        &nbsp;&nbsp;&middot;&nbsp;&nbsp;
                        <span className={`${getStateTextColor(request.state)}`}>
                          {request.state}
                        </span>
                      </div>
                      <div className="text-sm">{request.description}</div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="mb-4 flex gap-x-10">
                      <h3 className="text-4xl font-bold">
                        {(request as RequestPickAndDelivery).pickupRoomId}&nbsp;
                        to &nbsp;
                        {(request as RequestPickAndDelivery).deliveryRoomId}
                      </h3>
                      <div className="flex flex-col text-start text-slate-500">
                        <div className="text-base font-bold uppercase">
                          Pick and Delivery &nbsp;&middot;&nbsp;&nbsp;
                          {request.requestedAt &&
                            formatDate(request.requestedAt)}
                          &nbsp;&nbsp;&middot;&nbsp;&nbsp;
                          <span
                            className={`${getStateTextColor(request.state)}`}
                          >
                            {request.state}
                          </span>
                        </div>
                        <div className="text-sm">{request.description}</div>
                      </div>
                    </div>
                    <div className="text-start text-slate-600">
                      <div className="text-sm">
                        From{" "}
                        <span className="font-bold">
                          {(request as RequestPickAndDelivery).pickupUserName}
                        </span>{" "}
                        (
                        {
                          (request as RequestPickAndDelivery)
                            .pickupUserPhoneNumber
                        }
                        ) to{" "}
                        <span className="font-bold">
                          {(request as RequestPickAndDelivery).deliveryUserName}
                        </span>{" "}
                        (
                        {
                          (request as RequestPickAndDelivery)
                            .deliveryUserPhoneNumber
                        }
                        )
                      </div>
                      <div className="text-sm">
                        Confirmation Code:{" "}
                        <span className="font-bold">
                          {(request as RequestPickAndDelivery).confirmationCode}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            ))
          )}

          <Pagination
            meta={requests?.meta}
            changePage={handlePagination}
            className="flex items-center justify-center gap-x-4"
          />

          <Modal
            setIsVisible={setIsTaskModalVisible}
            isVisible={isTaskModalVisible}
            title="Create Task Request"
          >
            <div className="flex h-full flex-col justify-between gap-y-4">
              <div className="flex w-full flex-col gap-y-6">
                <Dropdown
                  options={taskTypes}
                  placeholder="Select Task Type"
                  className="w-full"
                  name="Task Type"
                  defaultValue={type || ""}
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
                          value={room1Code}
                          onChange={(e) => setRoom1Code(e.target?.value)}
                          disabled={building1Code === ""}
                          options={building1Rooms.map((room) => ({
                            code: room.name,
                            name: room.name,
                          }))}
                        />
                        {room1Code && (
                          <span className="absolute right-2 top-2 text-sm text-slate-500">
                            Door:{" "}
                            {
                              building1Rooms.find(
                                (room) => room.name == room1Code
                              )?.roomDoor.x
                            }{" "}
                            x{" "}
                            {
                              building1Rooms.find(
                                (room) => room.name == room1Code
                              )?.roomDoor.y
                            }
                          </span>
                        )}
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
                          value={room2Code}
                          onChange={(e) => setRoom2Code(e.target?.value)}
                          disabled={building2Code === ""}
                          options={building2Rooms.map((room) => ({
                            code: room.name,
                            name: room.name,
                          }))}
                        />
                        {room2Code && (
                          <span className="absolute right-2 top-2 text-sm text-slate-500">
                            Door:{" "}
                            {
                              building2Rooms.find(
                                (room) => room.name == room2Code
                              )?.roomDoor.x
                            }{" "}
                            x{" "}
                            {
                              building2Rooms.find(
                                (room) => room.name == room2Code
                              )?.roomDoor.y
                            }
                          </span>
                        )}
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
                          defaultValue={username || ""}
                          inputRef={pickupUserNameInputRef}
                        />
                        <Input
                          placeholder="Phone Number"
                          type="text"
                          className="w-full"
                          defaultValue={phoneNumber || ""}
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
                          className="w-full"
                          inputRef={deliveryUserPhoneInputRef}
                        />
                      </InputGroup>
                    </div>
                    <Input
                      name="Confirmation Code"
                      description="This code will be asked to the recipient to confirm the delivery."
                      placeholder="Numerical code between 4 and 6 digits"
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
                        onChange={(e) => setFloorCode(e.target?.value)}
                        inputRef={floorInputRef}
                      />
                    </InputGroup>
                    {floorCode && (
                      <div className="flex gap-x-4">
                        <InputGroup
                          title="Initial Position"
                          description="Select the room from which the robot will start the surveillance service."
                        >
                          <Dropdown
                            className="w-full"
                            name="Room"
                            disabled={floorCode === ""}
                            options={floorRooms.map((room) => ({
                              code: room.name,
                              name: room.name,
                            }))}
                            value={room1Code}
                            onChange={(e) => setRoom1Code(e.target?.value)}
                          />
                          {room1Code && (
                            <span className="absolute right-2 top-2 text-sm text-slate-500">
                              Door:{" "}
                              {
                                building1Rooms.find(
                                  (room) => room.name == room1Code
                                )?.roomDoor.x
                              }{" "}
                              x{" "}
                              {
                                building1Rooms.find(
                                  (room) => room.name == room1Code
                                )?.roomDoor.y
                              }
                            </span>
                          )}
                        </InputGroup>
                        <InputGroup
                          title="Final Position"
                          description="Select the room where the robot will end the surveillance service."
                        >
                          <Dropdown
                            className="w-full"
                            name="Room"
                            disabled={floorCode === ""}
                            options={floorRooms.map((room) => ({
                              code: room.name,
                              name: room.name,
                            }))}
                            value={room2Code}
                            onChange={(e) => setRoom2Code(e.target?.value)}
                          />
                          {room2Code && (
                            <span className="absolute right-2 top-2 text-sm text-slate-500">
                              Door:{" "}
                              {
                                building1Rooms.find(
                                  (room) => room.name == room2Code
                                )?.roomDoor.x
                              }{" "}
                              x{" "}
                              {
                                building1Rooms.find(
                                  (room) => room.name == room2Code
                                )?.roomDoor.y
                              }
                            </span>
                          )}
                        </InputGroup>
                      </div>
                    )}
                    <InputGroup
                      title="Emergency Contact"
                      description="Provide the Name and Phone Number of someone that the robot can contact in case of an emergency."
                    >
                      <Input
                        placeholder="Name"
                        type="text"
                        className="w-full"
                        defaultValue={username || ""}
                        inputRef={emergencyNameInputRef}
                      />
                      <Input
                        placeholder="Phone Number"
                        type="text"
                        className="w-2/3"
                        defaultValue={phoneNumber || ""}
                        inputRef={emergencyPhoneInputRef}
                      />
                    </InputGroup>
                    <TextArea
                      placeholder="Additional Information"
                      description="Provide any additional information that you consider relevant."
                      className="w-full"
                      inputRef={descriptionInputRef}
                    />
                  </>
                ) : (
                  ""
                )}
              </div>
              <Button name="save" type="confirm" onClick={handleSaveClick}>
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
