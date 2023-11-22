import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

import Button from "../Button";
import Input from "../Input";
import Modal from "../Modal";
import TextArea from "../TextArea";
import { useListBuildingsModule } from "./module";

import { AxiosError } from "axios";

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
    filters,
    setFilters,
  } = useListBuildingsModule();

  const [isBuildingModalVisible, setIsBuildingModalVisible] = useState(false);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

  const minFloorsFilterInputRef = useRef<HTMLInputElement>(null);
  const maxFloorsFilterInputRef = useRef<HTMLInputElement>(null);

  async function handleSaveClick() {
    try {
      await handleSave();

      swal("Success", "Building saved successfully", "success");
      setIsBuildingModalVisible(false);
    } catch (err: unknown) {
      swal("Error", err as string, "error");
    }
  }

  async function handleFilterClick() {
    try {
      if (
        !minFloorsFilterInputRef.current?.value ||
        !maxFloorsFilterInputRef.current?.value
      )
        setFilters(null);
      else if (
        maxFloorsFilterInputRef.current?.value <
        minFloorsFilterInputRef.current?.value
      ) {
        swal(
          "Warning",
          "Maximum value must be greater than minimum value!",
          "warning"
        );
        return;
      } else
        setFilters([
          minFloorsFilterInputRef.current.value,
          maxFloorsFilterInputRef.current.value,
        ]);

      setIsFilterModalVisible(false);
    } catch (err: unknown) {
      if (err instanceof AxiosError && err.response)
        swal("Error", err.response.data.errors as string, "error");

      swal("Error", err as string, "error");
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
          delay: buildings.length * ANIMATION_DELAY,
        }}
        onClick={() => setIsFilterModalVisible(true)}
        className="flex w-full items-center justify-center gap-x-10 bg-slate-400 py-4"
      >
        <div className="flex flex-col text-lg font-bold text-slate-600">
          Filter Buildings by Number of Floors
        </div>
      </motion.button>
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

      <Modal
        setIsVisible={setIsFilterModalVisible}
        isVisible={isFilterModalVisible}
        title="Filter buildings by Number of Floors"
      >
        <div className="flex h-full flex-col justify-between gap-y-4">
          <div className="flex w-full flex-col gap-y-4">
            <div className="flex w-full flex-col items-center gap-x-8 gap-y-4 md:flex-row">
              <Input
                className="w-full"
                placeholder="Minimum Number of Floors"
                type="number"
                inputRef={minFloorsFilterInputRef}
                defaultValue={filters ? filters[0] : undefined}
              />
              <Input
                className="w-full"
                placeholder="Maximum Number of Floors"
                type="number"
                inputRef={maxFloorsFilterInputRef}
                defaultValue={filters ? filters[1] : undefined}
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

export default ListBuildings;
