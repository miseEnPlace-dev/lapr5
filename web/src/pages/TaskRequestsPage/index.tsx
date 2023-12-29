import { useState } from "react";
import { motion } from "framer-motion";
import swal from "sweetalert";

import { useMenuOptions } from "@/hooks/useMenuOptions";
import Button from "@/components/Button";
import Dropdown from "@/components/Dropdown/index.tsx";
import Modal from "@/components/Modal";
import Pagination from "@/components/Pagination/index.tsx";
import SideBar from "@/components/SideBar";
import { RequestPickAndDelivery } from "@/model/RequestPickAndDelivery.ts";
import { RequestSurveillance } from "@/model/RequestSurveillance.ts";
import { CheckIcon, FilterIcon } from "@/styles/Icons.ts";
import { formatDate } from "@/utils/formatDate.ts";

import { useListTaskRequestsModule } from "./module.ts";

import { AxiosError } from "axios";

const ANIMATION_DELAY = 0.1;

const TaskRequestsPage: React.FC = () => {
  const {
    states,
    requests,
    stateInputRef,
    stateFilter,
    setStateFilter,
    handleAcceptRequest,
    handleRejectRequest,
    handlePagination,
    userInputRef,
    userFilter,
    setUserFilter,
    deviceModelInputRef,
    deviceModelFilter,
    setDeviceModelFilter,
    deviceModels,
    devices,
    deviceInputRef,
  } = useListTaskRequestsModule();

  const [isFilterByStateModalVisible, setIsFilterByStateModalVisible] =
    useState(false);
  const [isFilterByModelModalVisible, setIsFilterByModelModalVisible] =
    useState(false);
  const [isAddRobotModalVisible, setIsAddRobotModalVisible] = useState(false);

  async function handleAddRobotClick() {
    setIsAddRobotModalVisible(true);
  }

  async function handleRemoveFilter() {
    setStateFilter(null);
    setUserFilter(null);
    setDeviceModelFilter(null);

    setIsFilterByStateModalVisible(false);
    // setIsFilterByUserModalVisible(false);
    setIsFilterByModelModalVisible(false);
  }

  async function handleFilterByDeviceModelClick() {
    try {
      if (!deviceModelInputRef.current?.value) setDeviceModelFilter(null);
      else setDeviceModelFilter(deviceModelInputRef.current.value);

      // Only one filter is valid, remove the other
      setUserFilter(null);
      setStateFilter(null);

      setIsFilterByModelModalVisible(false);
    } catch (err: unknown) {
      if (err instanceof AxiosError && err.response)
        swal("Error", err.response.data.errors as string, "error");

      swal("Error", err as string, "error");
    }
  }

  async function handleFilterByStateClick() {
    try {
      if (!stateInputRef.current?.value) setStateFilter(null);
      else setStateFilter(stateInputRef.current.value);

      // Only one filter is valid, remove the other
      setUserFilter(null);
      setDeviceModelFilter(null);

      setIsFilterByStateModalVisible(false);
    } catch (err: unknown) {
      if (err instanceof AxiosError && err.response)
        swal("Error", err.response.data.errors as string, "error");

      swal("Error", err as string, "error");
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

  const { menuOptions } = useMenuOptions();

  return (
    <div className="flex">
      <SideBar menuOptions={menuOptions} />
      <main className="mt-12 flex h-full w-full flex-col gap-y-4 pl-12">
        <h1 className="text-4xl font-bold">Task Requests</h1>
        <p className="text-slate-500">
          Manage here all task requests from system.
        </p>
        <div
          aria-label="tasks-container"
          className="mr-12 mt-8 flex flex-col justify-between gap-y-6 text-left text-lg"
        >
          <div className="flex flex-row gap-x-4">
            <motion.button
              name="filterByState"
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.2,
                delay: requests?.data.length || 0 * ANIMATION_DELAY,
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
            <motion.button
              name="filterByDeviceModel"
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.2,
                delay: requests?.data.length || 0 * ANIMATION_DELAY,
              }}
              onClick={() => setIsFilterByModelModalVisible(true)}
              className={`flex w-full items-center justify-center gap-x-10 ${
                deviceModelFilter ? "bg-slate-400" : "bg-slate-300"
              } py-4 text-gray-500`}
            >
              <div className="flex flex-row items-center gap-x-4 text-lg font-bold text-slate-600">
                {deviceModelFilter ? <FilterIcon /> : ""}
                Filter Requests By Device Model
              </div>
            </motion.button>
          </div>
          {!requests ? null : requests.data.length == 0 ? ( // TODO: skeleton component // TODO: skeleton component
            <p className="text-slate-500">
              No results were found for your search... Try to change or remove
              the filters.
            </p>
          ) : (
            requests.data.map((request, i) => (
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: ANIMATION_DELAY * i }}
                key={i}
                className="relative flex w-full items-center bg-slate-200 px-12 py-8"
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
                      <div className="text-sm">
                        Requested by{" "}
                        <span className="font-bold">
                          {(request as RequestSurveillance).userName}
                        </span>
                        &nbsp;&middot;&nbsp;{request.description}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col">
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
                        <div className="text-sm">
                          Requested by{" "}
                          <span className="font-bold">
                            {(request as RequestPickAndDelivery).pickupUserName}
                          </span>
                          &nbsp;&middot;&nbsp;{request.description}
                        </div>
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
                  </div>
                )}
                {request.state === "Pending" ? (
                  <div className="absolute right-8 flex items-center gap-x-6">
                    <Button
                      className="relative h-12 w-12 items-center justify-center"
                      name="confirm"
                      type="confirm"
                      onClick={() => handleAcceptRequest(request.id || "")}
                    >
                      <CheckIcon className="absolute left-1/2 top-1/2 z-10 h-6 w-6 flex-1 -translate-x-1/2 -translate-y-1/2" />
                    </Button>
                    <Button
                      className="flex h-12 w-12 items-center justify-center text-center font-semibold"
                      name="delete"
                      type="destroy"
                      onClick={() => handleRejectRequest(request.id || "")}
                    >
                      X
                    </Button>
                  </div>
                ) : null}
              </motion.div>
            ))
          )}

          <Pagination
            meta={requests?.meta}
            changePage={handlePagination}
            className="flex items-center justify-center gap-x-4"
          />

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
                    name="State"
                    placeholder="State"
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
                onClick={handleFilterByStateClick}
                type="confirm"
              >
                List
              </Button>
            </div>
          </Modal>

          <Modal
            setIsVisible={setIsFilterByModelModalVisible}
            isVisible={isFilterByModelModalVisible}
            title="Filter Requests by Device Model"
          >
            <div className="flex h-full flex-col justify-between gap-y-4">
              <div className="flex w-full flex-col gap-y-4">
                <div className="flex w-full flex-col gap-x-8 gap-y-4">
                  <Dropdown
                    className="w-full"
                    name="Task"
                    placeholder="Task"
                    inputRef={deviceInputRef}
                    options={deviceModels.map((deviceModel) => ({
                      code: deviceModel.code,
                      name: deviceModel.name,
                    }))}
                    selected={deviceModelFilter ? deviceModelFilter : undefined}
                  />
                  {deviceModelFilter && (
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
                onClick={handleFilterByDeviceModelClick}
                type="confirm"
              >
                List
              </Button>
            </div>
          </Modal>

          <Modal
            setIsVisible={setIsAddRobotModalVisible}
            isVisible={isAddRobotModalVisible}
            title="Add robot to this task"
          >
            <div className="flex h-full flex-col justify-between gap-y-4">
              <div className="flex w-full flex-col gap-y-4">
                <div className="flex w-full flex-col gap-x-8 gap-y-4">
                  <Dropdown
                    className="w-full"
                    name="Robot"
                    placeholder="Ro"
                    inputRef={deviceModelInputRef}
                    options={devices.map((device) => ({
                      code: device.code,
                      name: device.nickname,
                    }))}
                    selected={deviceModelFilter ? deviceModelFilter : undefined}
                  />
                </div>
              </div>
              <Button
                name="AddRobot"
                onClick={handleAddRobotClick}
                type="confirm"
              >
                Add
              </Button>
            </div>
          </Modal>
        </div>
      </main>
    </div>
  );
};

export default TaskRequestsPage;
