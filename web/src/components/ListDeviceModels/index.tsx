import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

import Button from "../Button";
import Input from "../Input";
import Modal from "../Modal";
import { useListDeviceModelModule } from "./module";

const ListDeviceModels: React.FC = () => {
  const navigate = useNavigate();
  const {
    deviceModels,
    codeInputRef,
    handleSave,
    nameInputRef,
    brandInputRef,
  } = useListDeviceModelModule();

  const [isBuildingModalVisible, setIsBuildingModalVisible] = useState(false);

  async function handleSaveClick() {
    try {
      await handleSave();

      swal("Success", "Elevator saved successfully", "success");
      setIsBuildingModalVisible(false);
    } catch (err: unknown) {
      swal("Error", err as string, "error");
    }
  }

  const ANIMATION_DELAY = 0.1;

  return (
    <div className="mr-12 mt-8 flex flex-col justify-between gap-y-6 text-left text-lg">
      {deviceModels.map((deviceModel, i) => (
        <motion.button
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, delay: ANIMATION_DELAY * i }}
          key={deviceModel.code}
          onClick={() => navigate(`/deviceModels/${deviceModel.code}`)}
          className="flex w-full items-center gap-x-10 bg-slate-200 px-12 py-8"
        >
          <h2 className="text-6xl font-bold">{deviceModel.code}</h2>
          <div className="flex flex-col">
            <h3 className="text-left text-2xl font-bold">{deviceModel.name}</h3>
            <div className="text-left text-sm text-slate-600">
              {deviceModel.type}
              {deviceModel.brand && (
                <span>&nbsp;&middot; {deviceModel.brand}</span>
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
          delay: deviceModels.length * ANIMATION_DELAY,
        }}
        onClick={() => setIsBuildingModalVisible(true)}
        className="flex w-full items-center justify-center bg-secondary px-12 py-4 text-center text-5xl font-bold"
      >
        +
      </motion.button>

      <Modal
        setIsVisible={setIsBuildingModalVisible}
        isVisible={isBuildingModalVisible}
        title="Create Building"
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
          </div>
          <Button onClick={handleSaveClick} type="confirm">
            Save
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default ListDeviceModels;
