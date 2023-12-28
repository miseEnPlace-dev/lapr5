import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

import { useMenuOptions } from "@/hooks/useMenuOptions";
import Button from "@/components/Button";
import Dropdown from "@/components/Dropdown";
import Input from "@/components/Input";
import InputGroup from "@/components/InputGroup";
import Modal from "@/components/Modal";
import Pagination from "@/components/Pagination";
import SideBar from "@/components/SideBar";
import TextArea from "@/components/TextArea";
import { RequestPickAndDelivery } from "@/model/RequestPickAndDelivery";
import { RequestSurveillance } from "@/model/RequestSurveillance";
import { FilterIcon } from "@/styles/Icons";
import { formatDate } from "@/utils/formatDate";

import { useTasksModule } from "./module";

import { AxiosError } from "axios";

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
    username,
    phoneNumber,
    setStateFilter,
    stateFilter,
    userFilter,
    setUserFilter,
    stateInputRef,
    states,
    room1InputRef,
    room2InputRef,
  } = useTasksModule();
  const [isTaskModalVisible, setIsTaskModalVisible] = useState(false);
  const [isFilterByStateModalVisible, setIsFilterByStateModalVisible] =
    useState(false);
  const [isFilterByUserModalVisible, setIsFilterByUserModalVisible] =
    useState(false);

  async function handleRequestFilterByStateClick() {
    try {
      if (!stateInputRef.current?.value) setStateFilter(null);
      else setStateFilter(stateInputRef.current.value);

      // Only one filter is valid, remove the other
      setUserFilter(null);

      setIsFilterByStateModalVisible(false);
    } catch (err: unknown) {
      if (err instanceof AxiosError && err.response)
        swal("Error", err.response.data.errors as string, "error");

      swal("Error", err as string, "error");
    }
  }

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

  async function handleRemoveFilter() {
    setStateFilter(null);
    setUserFilter(null);

    setIsFilterByStateModalVisible(false);
    setIsFilterByUserModalVisible(false);
  }

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
          <div className="flex flex-row gap-x-4">
            <motion.button
              name="filterByTask"
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.2,
                delay: requests?.length || 0 * ANIMATION_DELAY,
              }}
              onClick={() => setIsFilterByStateModalVisible(true)}
              className={`flex w-full items-center justify-center gap-x-10 ${
                stateFilter ? "bg-slate-400" : "bg-slate-300"
              } py-4 text-gray-500`}
            >
              <div className="flex flex-row items-center gap-x-4 text-lg font-bold text-slate-600">
                {stateFilter ? <FilterIcon /> : ""}
                Filter Requests By State
              </div>
            </motion.button>
          </div>
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
              No results were found for your search... Create your first request
              or try to change or remove the filters.
            </p>
          ) : (
            requests.map((request, i) => (
              <motion.button
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: ANIMATION_DELAY * i }}
                key={i}
                //onClick={() => navigate(`/requests/${request.id}`)}
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
                        <span className="text-yellow-800">{request.state}</span>
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
                          <span className="text-yellow-800">
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
                          inputRef={room1InputRef}
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
                          inputRef={room2InputRef}
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
                          defaultValue={username || ""}
                          inputRef={pickupUserNameInputRef}
                        />
                        <Input
                          placeholder="Phone Number"
                          type="text"
                          className="w-2/3"
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
                          className="w-2/3"
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
          <Modal
            setIsVisible={setIsFilterByStateModalVisible}
            isVisible={isFilterByStateModalVisible}
            title="Filter Requests by State"
          >
            <div className="flex h-full flex-col justify-between gap-y-4">
              <div className="flex w-full flex-col gap-y-4">
                <div className="flex w-full flex-col gap-x-8 gap-y-4">
                  <Dropdown
                    className="w-full"
                    name="Task"
                    placeholder="Task"
                    inputRef={stateInputRef}
                    options={states}
                    selected={stateFilter ? stateFilter : undefined}
                  />
                  {stateFilter && (
                    <Button
                      name="removeFilter"
                      onClick={handleRemoveFilter}
                      type="reset"
                    >
                      Remove Filter
                    </Button>
                  )}
                </div>
              </div>
              <Button
                name="listfilter"
                onClick={handleRequestFilterByStateClick}
                type="confirm"
              >
                List
              </Button>
            </div>
          </Modal>
        </div>
      </main>
    </div>
  );
};

export default TasksPage;
