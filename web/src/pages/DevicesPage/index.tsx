import { useState } from "react";
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
import { FilterIcon } from "@/styles/Icons";

import { useListDeviceModule } from "./module";

import { AxiosError } from "axios";

const DevicesPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    devices,
    codeInputRef,
    handleSave,
    modelCodeInputRef,
    nicknameInputRef,
    descriptionInputRef,
    serialNumberInputRef,
    deviceModels,
    capabilities,
    taskFilter,
    setTaskFilter,
    modelFilter,
    setModelFilter,
    taskFilterInputRef,
    modelFilterInputRef,
    handlePagination,
    widthInputRef,
    depthInputRef,
    floorCodeInputRef,
    floors,
  } = useListDeviceModule();

  const [isDeviceModalVisible, setIsDeviceModalVisible] = useState(false);
  const [isFilterByTaskModalVisible, setIsFilterByTaskModalVisible] =
    useState(false);
  const [isFilterByModelNameModalVisible, setIsFilterByModelModalVisible] =
    useState(false);

  async function handleFilterByTaskClick() {
    try {
      if (!taskFilterInputRef.current?.value) setTaskFilter(null);
      else setTaskFilter(taskFilterInputRef.current.value);

      // Only one filter is valid, remove the other
      setModelFilter(null);

      setIsFilterByTaskModalVisible(false);
    } catch (err: unknown) {
      if (err instanceof AxiosError && err.response)
        swal("Error", err.response.data.errors as string, "error");

      swal("Error", err as string, "error");
    }
  }

  async function handleRemoveFilter() {
    setModelFilter(null);
    setTaskFilter(null);

    setIsFilterByModelModalVisible(false);
    setIsFilterByTaskModalVisible(false);
  }

  async function handleFilterByModelNameClick() {
    try {
      if (!modelFilterInputRef.current?.value) setModelFilter(null);
      else setModelFilter(modelFilterInputRef.current.value);

      // Only one filter is valid, remove the other
      setTaskFilter(null);

      setIsFilterByModelModalVisible(false);
    } catch (err: unknown) {
      if (err instanceof AxiosError && err.response)
        swal("Error", err.response.data.errors as string, "error");

      swal("Error", err as string, "error");
    }
  }

  async function handleSaveClick() {
    try {
      await handleSave();

      swal("Success", "Device saved successfully", "success");
      setIsDeviceModalVisible(false);
    } catch (err: unknown) {
      console.error(err);
      swal(
        "Error",
        "An error occurred. Check the console for details.",
        "error"
      );
    }
  }

  const ANIMATION_DELAY = 0.1;

  const { menuOptions } = useMenuOptions();

  return (
    <div className="flex">
      <SideBar menuOptions={menuOptions} />
      <main className="mt-12 flex h-full w-full flex-col gap-y-4 pl-12">
        <h1 className="text-4xl font-bold">Devices</h1>
        <p className="text-slate-500">
          Manage here all the devices of the fleet.
        </p>
        <div
          aria-label="devices-container"
          className="mr-12 mt-8 flex flex-col justify-between gap-y-6 text-left text-lg"
        >
          <div className="flex flex-row gap-x-4">
            <motion.button
              name="filterByTask"
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.2,
                delay: devices?.data.length || 0 * ANIMATION_DELAY,
              }}
              onClick={() => setIsFilterByTaskModalVisible(true)}
              className={`flex w-full items-center justify-center gap-x-10 ${
                taskFilter ? "bg-slate-400" : "bg-slate-300"
              } py-4 text-gray-500`}
            >
              <div className="flex flex-row items-center gap-x-4 text-lg font-bold text-slate-600">
                {taskFilter ? <FilterIcon /> : ""}
                Filter Devices By Task
              </div>
            </motion.button>
            <motion.button
              name="filterByModel"
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.2,
                delay: devices?.data.length || 0 * ANIMATION_DELAY,
              }}
              onClick={() => setIsFilterByModelModalVisible(true)}
              className={`flex w-full items-center justify-center gap-x-10 ${
                modelFilter ? "bg-slate-400" : "bg-slate-300"
              } py-4 text-gray-500`}
            >
              <div className="flex flex-row items-center gap-x-4 text-lg font-bold text-slate-600">
                {modelFilter ? <FilterIcon /> : ""}
                Filter Devices By Device Model Name
              </div>
            </motion.button>
          </div>
          <motion.button
            name="createDevice"
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.2,
              delay: devices?.data.length || 0 * ANIMATION_DELAY,
            }}
            onClick={() => setIsDeviceModalVisible(true)}
            className="flex w-full items-center justify-center bg-secondary px-12 py-4 text-center text-5xl font-bold"
          >
            +
          </motion.button>
          {!devices ? null : devices.data.length == 0 ? ( // TODO: skeleton component // TODO: skeleton component
            <p className="text-slate-600">
              No results were found for your search... Try to change or remove
              the filters.
            </p>
          ) : (
            devices.data.map((device, i) => (
              <motion.button
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: ANIMATION_DELAY * i }}
                key={i}
                onClick={() => navigate(`/devices/robots/${device.code}`)}
                className={`flex w-full items-center gap-x-10 ${
                  device.isAvailable ? "bg-slate-200" : "bg-red-100"
                } px-12 py-8`}
              >
                <h2 className="text-6xl font-bold">{device.code}</h2>
                <div className="flex flex-col">
                  <h3 className="text-left text-2xl font-bold">
                    {device.nickname}
                  </h3>
                  <div className="text-left text-sm text-slate-600">
                    {device.description}
                    {!device.isAvailable ? (
                      <span>&nbsp;&middot; INACTIVE</span>
                    ) : (
                      <span>&nbsp;&middot; ACTIVE</span>
                    )}
                  </div>
                </div>
              </motion.button>
            ))
          )}

          <Pagination
            meta={devices?.meta}
            changePage={handlePagination}
            className="flex items-center justify-center gap-x-4"
          />

          <Modal
            setIsVisible={setIsDeviceModalVisible}
            isVisible={isDeviceModalVisible}
            title="Create Device"
          >
            <div className="flex h-full flex-col justify-between gap-y-4">
              <div className="flex w-full flex-col gap-y-4">
                <Input
                  className="w-full"
                  placeholder="Code"
                  inputRef={codeInputRef}
                />
                <Dropdown
                  className="w-full"
                  name="Device Model"
                  placeholder="Device Model"
                  inputRef={modelCodeInputRef}
                  options={!deviceModels ? [] : deviceModels.data}
                />
                <Input
                  className="w-full"
                  placeholder="Nickname"
                  inputRef={nicknameInputRef}
                />
                <Input
                  className="w-full"
                  placeholder="Serial Number"
                  inputRef={serialNumberInputRef}
                />
                <InputGroup
                  title="Initial Position"
                  description="Specify the initial position of the device."
                >
                  <Dropdown
                    className="w-full"
                    name="Floor"
                    placeholder="Floor"
                    inputRef={floorCodeInputRef}
                    options={floors.map((floor) => ({
                      code: floor.code,
                      name: floor.code,
                    }))}
                  />
                  <Input
                    className="w-full"
                    placeholder="X-axis Coordinate"
                    inputRef={widthInputRef}
                  />
                  <Input
                    className="w-full"
                    placeholder="Y-axis Coordinate"
                    inputRef={depthInputRef}
                  />
                </InputGroup>
                <TextArea
                  className="w-full"
                  placeholder="Description"
                  inputRef={descriptionInputRef}
                />
              </div>
              <Button name="save" onClick={handleSaveClick} type="confirm">
                Save
              </Button>
            </div>
          </Modal>

          <Modal
            setIsVisible={setIsFilterByTaskModalVisible}
            isVisible={isFilterByTaskModalVisible}
            title="Filter Devices by Task"
          >
            <div className="flex h-full flex-col justify-between gap-y-4">
              <div className="flex w-full flex-col gap-y-4">
                <div className="flex w-full flex-col gap-x-8 gap-y-4">
                  <Dropdown
                    className="w-full"
                    name="Task"
                    placeholder="Task"
                    inputRef={taskFilterInputRef}
                    options={capabilities}
                    selected={taskFilter ? taskFilter : undefined}
                  />
                  {taskFilter && (
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
                onClick={handleFilterByTaskClick}
                type="confirm"
              >
                List
              </Button>
            </div>
          </Modal>

          <Modal
            setIsVisible={setIsFilterByModelModalVisible}
            isVisible={isFilterByModelNameModalVisible}
            title="Filter Devices by Device Model Name"
          >
            <div className="flex h-full flex-col justify-between gap-y-4">
              <div className="flex w-full flex-col gap-y-4">
                <div className="flex w-full flex-col gap-x-8 gap-y-4">
                  <Dropdown
                    className="w-full"
                    name="Device Model"
                    placeholder="Device Model"
                    inputRef={modelFilterInputRef}
                    options={!deviceModels ? [] : deviceModels.data}
                    selected={modelFilter ? modelFilter : undefined}
                  />
                  {modelFilter && (
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
                name="listfiltermodel"
                onClick={handleFilterByModelNameClick}
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

export default DevicesPage;
