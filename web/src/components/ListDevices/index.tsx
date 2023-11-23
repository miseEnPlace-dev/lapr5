import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

import { FilterIcon } from "@/styles/Icons";

import Button from "../Button";
import Input from "../Input";
import InputSelect from "../InputSelect";
import Modal from "../Modal";
import TextArea from "../TextArea";
import { useListDeviceModule } from "./module";

import { AxiosError } from "axios";

const ListDevices: React.FC = () => {
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

      swal("Success", "Devices saved successfully", "success");
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

  console.log(deviceModels);

  return (
    <div className="mr-12 mt-8 flex flex-col justify-between gap-y-6 text-left text-lg">
      <motion.button
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.2,
          delay: devices.length * ANIMATION_DELAY,
        }}
        onClick={() => setIsFilterByTaskModalVisible(true)}
        className={`flex w-full items-center justify-center gap-x-10 ${
          taskFilter ? "bg-slate-400" : "bg-slate-200"
        } py-4 text-gray-500`}
      >
        <div className="flex flex-row items-center gap-x-4 text-lg font-bold text-slate-600">
          {taskFilter ? <FilterIcon /> : ""}
          Filter Devices By Task
        </div>
      </motion.button>
      <motion.button
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.2,
          delay: devices.length * ANIMATION_DELAY,
        }}
        onClick={() => setIsFilterByModelModalVisible(true)}
        className={`flex w-full items-center justify-center gap-x-10 ${
          modelFilter ? "bg-slate-400" : "bg-slate-200"
        } py-4 text-gray-500`}
      >
        <div className="flex flex-row items-center gap-x-4 text-lg font-bold text-slate-600">
          {modelFilter ? <FilterIcon /> : ""}
          Filter Devices By Device Model Name
        </div>
      </motion.button>
      {devices.map((device, i) => (
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
            <h3 className="text-left text-2xl font-bold">{device.nickname}</h3>
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
      ))}
      <motion.button
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.2,
          delay: devices.length * ANIMATION_DELAY,
        }}
        onClick={() => setIsDeviceModalVisible(true)}
        className="flex w-full items-center justify-center bg-secondary px-12 py-4 text-center text-5xl font-bold"
      >
        +
      </motion.button>

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
            <InputSelect
              className="w-full"
              name="Device Model"
              placeholder="Device Model"
              inputRef={modelCodeInputRef}
              options={deviceModels}
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
              <InputSelect
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
              <InputSelect
                className="w-full"
                name="Device Model"
                placeholder="Device Model"
                inputRef={modelFilterInputRef}
                options={deviceModels}
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
            name="listfilter"
            onClick={handleFilterByModelNameClick}
            type="confirm"
          >
            List
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default ListDevices;
