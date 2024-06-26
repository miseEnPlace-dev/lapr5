import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

import { useMenuOptions } from "@/hooks/useMenuOptions";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import Pagination from "@/components/Pagination";
import Selector from "@/components/Selector";
import SideBar from "@/components/SideBar";

import { useListDeviceModelModule } from "./module";

const DeviceModelsPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    deviceModels,
    codeInputRef,
    handleSave,
    nameInputRef,
    brandInputRef,
    selectedCapabilities,
    setSelectedCapabilities,
    handlePagination,
  } = useListDeviceModelModule();

  const [isBuildingModalVisible, setIsBuildingModalVisible] = useState(false);

  async function handleSaveClick() {
    try {
      await handleSave();

      swal("Success", "Device model saved successfully", "success");
      setIsBuildingModalVisible(false);
    } catch (err: unknown) {
      swal("Error", err as string, "error");
    }
  }

  const ANIMATION_DELAY = 0.1;

  const { menuOptions } = useMenuOptions();

  return (
    <div className="flex">
      <SideBar menuOptions={menuOptions} />
      <main className="my-12 flex h-full w-full flex-col gap-y-4 pl-12">
        <h1 className="text-4xl font-bold">Device Models</h1>
        <p className="text-slate-500">
          Manage here all the device models of the fleet.
        </p>
        <div
          aria-label="device-models-container"
          className="mr-12 mt-8 flex flex-col justify-between gap-y-6 overflow-y-auto text-left text-lg"
        >
          <motion.button
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.2,
              delay: deviceModels?.data.length || 0 * ANIMATION_DELAY,
            }}
            onClick={() => setIsBuildingModalVisible(true)}
            name="create-device-model"
            className="flex w-full items-center justify-center bg-secondary px-12 py-4 text-center text-5xl font-bold"
          >
            +
          </motion.button>
          {!deviceModels ? null : deviceModels.data.length == 0 ? ( // TODO: skeleton component
            <p className="text-slate-600">
              No results were found for your search...
            </p>
          ) : (
            deviceModels.data.map((deviceModel, i) => (
              <motion.button
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: ANIMATION_DELAY * i }}
                key={deviceModel.code}
                onClick={() => navigate(`/device-models/${deviceModel.code}`)}
                className="flex w-full items-center gap-x-10 bg-slate-200 px-12 py-8"
              >
                <h2 className="text-6xl font-bold">{deviceModel.code}</h2>
                <div className="flex flex-col">
                  <h3 className="text-left text-2xl font-bold">
                    {deviceModel.name}
                  </h3>
                  <div className="text-left text-sm text-slate-600">
                    {deviceModel.type}
                    {deviceModel.brand && (
                      <span>&nbsp;&middot; {deviceModel.brand}</span>
                    )}
                  </div>
                </div>
              </motion.button>
            ))
          )}

          <Pagination
            meta={deviceModels?.meta}
            changePage={handlePagination}
            className="flex items-center justify-center gap-x-4"
          />

          <Modal
            setIsVisible={setIsBuildingModalVisible}
            isVisible={isBuildingModalVisible}
            title="Create Device Model"
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
                  placeholder="Name"
                  inputRef={nameInputRef}
                />
                <Input
                  className="w-full"
                  placeholder="Brand"
                  inputRef={brandInputRef}
                />
                <Input
                  className="w-full"
                  disabled
                  placeholder="Type"
                  defaultValue="Robot"
                />
                <Selector
                  items={selectedCapabilities}
                  title="Capabilities"
                  setItems={
                    setSelectedCapabilities as unknown as React.Dispatch<
                      React.SetStateAction<
                        { name: string; selected: boolean }[]
                      >
                    >
                  }
                />
              </div>
              <Button name="save" onClick={handleSaveClick} type="confirm">
                Save
              </Button>
            </div>
          </Modal>
        </div>
      </main>
    </div>
  );
};

export default DeviceModelsPage;
