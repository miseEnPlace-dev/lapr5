import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

import Button from "../Button";
import Input from "../Input";
import Modal from "../Modal";
import TextArea from "../TextArea";
import { useListBuildingsModule } from "./module";

const ListBuildings: React.FC = () => {
  const navigate = useNavigate();
  const {
    buildings,
    codeInputRef,
    descriptionInputRef,
    handleSave,
    lengthInputRef,
    nameInputRef,
    widthInputRef,
  } = useListBuildingsModule();

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
      {buildings.map((building, i) => (
        <motion.button
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, delay: ANIMATION_DELAY * i }}
          key={building.code}
          onClick={() => navigate(`/buildings/${building.code}`)}
          className="flex w-full items-center gap-x-10 bg-slate-200 px-12 py-8"
        >
          <h2 className="text-6xl font-bold">{building.code}</h2>
          <div className="flex flex-col">
            <h3 className="text-left text-2xl font-bold">{building.name}</h3>
            <div className="text-left text-sm text-slate-600">
              {building.maxDimensions.length} x {building.maxDimensions.width}
              {building.description && (
                <span>&nbsp;&middot; {building.description}</span>
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
          delay: buildings.length * ANIMATION_DELAY,
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
            <div className="flex w-full flex-col items-center gap-x-8 gap-y-4 md:flex-row">
              <Input
                className="w-full"
                placeholder="Width"
                type="number"
                step={0.1}
                inputRef={widthInputRef}
              />
              <Input
                className="w-full"
                placeholder="Length"
                type="number"
                step={0.1}
                inputRef={lengthInputRef}
              />
            </div>
            <TextArea
              placeholder="Description"
              inputRef={descriptionInputRef}
            />
          </div>
          <Button name="save" onClick={handleSaveClick} type="confirm">
            Save
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default ListBuildings;
