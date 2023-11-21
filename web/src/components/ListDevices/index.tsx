import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

import Button from "../Button";
import Input from "../Input";
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
    setFilters,
    filters,
    values,
    setValues,
    deviceTaskFilterInputRef,
    deviceTaskFilterValueInputRef,
    deviceModelDesignationFilterInputRef,
    deviceModelDesignationFilterValueInputRef,
  } = useListDeviceModule();

  const [isDeviceModalVisible, setIsDeviceModalVisible] = useState(false);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

  async function handleFilterClick() {
    try {
      const taskFilter = deviceTaskFilterInputRef.current?.value;
      const taskFilterValue = deviceTaskFilterValueInputRef.current?.value;
      const designationFilter =
        deviceModelDesignationFilterInputRef.current?.value;
      const designationFilterValue =
        deviceModelDesignationFilterValueInputRef.current?.value;

      const filtersArray = [];
      const valuesArray = [];

      if (taskFilter && taskFilterValue) {
        filtersArray.push(taskFilter);
        valuesArray.push(taskFilterValue);
      }

      if (designationFilter && designationFilterValue) {
        filtersArray.push(designationFilter);
        valuesArray.push(designationFilterValue);
      }

      console.log(filtersArray);
      console.log(valuesArray);

      if (filtersArray.length > 0) {
        setFilters(filtersArray);
        setValues(valuesArray);
      } else {
        setFilters(null);
        setValues(null);
      }

      setIsFilterModalVisible(false);
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

  return (
    <div className="mr-12 mt-8 flex flex-col justify-between gap-y-6 text-left text-lg">
      <motion.button
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.2,
          delay: devices.length * ANIMATION_DELAY,
        }}
        onClick={() => setIsFilterModalVisible(true)}
        className="flex w-full items-center justify-center gap-x-10 bg-slate-400 py-4"
      >
        <div className="flex flex-col text-lg font-bold text-slate-600">
          Filter devices
        </div>
      </motion.button>
      {devices.map((device, i) => (
        <motion.button
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, delay: ANIMATION_DELAY * i }}
          key={i}
          onClick={() => navigate(`/devices/robots/${device.code}`)}
          className={`flex w-full items-center gap-x-10 ${device.isAvailable ? "bg-slate-200" : "bg-red-100"} px-12 py-8`}
        >
          <h2 className="text-6xl font-bold">{device.code}</h2>
          <div className="flex flex-col">
            <h3 className="text-left text-2xl font-bold">{device.nickname}</h3>
            <div className="text-left text-sm text-slate-600">
              {device.description}
              {!device.isAvailable ? (
                <span>&nbsp;&middot; INACTIVE</span>
              ): <span>&nbsp;&middot; ACTIVE</span>}
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
            <Input
              className="w-full"
              placeholder="Model Code"
              inputRef={modelCodeInputRef}
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
        setIsVisible={setIsFilterModalVisible}
        isVisible={isFilterModalVisible}
        title="Filter devices"
      >
        <div className="flex h-full flex-col justify-between gap-y-4">
          <div className="flex w-full flex-col gap-y-4">
            <div className="flex w-full flex-col items-center gap-x-8 gap-y-4">
              <Input
                className="w-full"
                placeholder="Task Filter: ('task')"
                inputRef={deviceTaskFilterInputRef}
                defaultValue={filters ? filters[0] : undefined}
              />
              <Input
                className="w-full"
                placeholder="Device Task Value: ('pick_delivery'), ('surveillance')"
                inputRef={deviceTaskFilterValueInputRef}
                defaultValue={values ? values[0] : undefined}
              />
              <Input
                className="w-full"
                placeholder="Device Model Designation Filter: ('name')"
                inputRef={deviceModelDesignationFilterInputRef}
                defaultValue={filters ? filters[1] : undefined}
              />
              <Input
                className="w-full"
                placeholder="Device Model Designation Value: ('name model')"
                inputRef={deviceModelDesignationFilterValueInputRef}
                defaultValue={values ? values[1] : undefined}
              />
            </div>
          </div>
          <Button name="listfilter" onClick={handleFilterClick} type="confirm">
            List
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default ListDevices;
