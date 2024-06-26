import { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

import InputGroup from "@/components/InputGroup";
import Selector from "@/components/Selector";

import Button from "../../components/Button";
import Input from "../../components/Input";
import Modal from "../../components/Modal";
import TextArea from "../../components/TextArea";
import { ArrowLeftIcon } from "../../styles/Icons";
import { useBuildingPageModule } from "./module";

const BuildingPage: React.FC = () => {
  const {
    building,
    elevator,
    selectedFloors,
    setSelectedFloors,
    handleSave,
    handleSaveBuilding,
    modelInputRef,
    brandInputRef,
    descriptionInputRef,
    serialNumberInputRef,
    lengthInputRef,
    widthInputRef,
    nameInputRef,
    buildingDescriptionInputRef,
  } = useBuildingPageModule();

  const navigate = useNavigate();
  const [isElevatorModalVisible, setIsElevatorModalVisible] = useState(false);

  async function handleSaveClick() {
    try {
      await handleSave();

      swal("Success", "Elevator saved successfully", "success");
      setIsElevatorModalVisible(false);
    } catch (err: unknown) {
      swal("Error", err as string, "error");
    }
  }

  async function handleSaveBuildingClick() {
    try {
      await handleSaveBuilding();

      swal("Success", "Building saved successfully", "success");
    } catch (err: unknown) {
      swal("Error", err as string, "error");
    }
  }

  return (
    <main className="mx-auto flex h-screen min-h-screen w-11/12 flex-col gap-y-8 py-8">
      <button
        className="flex items-center gap-x-2"
        onClick={() => navigate(-1)}
      >
        <ArrowLeftIcon className="absolute left-4 top-4 h-8 w-8 text-slate-500" />
      </button>
      <div className="w-full rounded-xl bg-slate-200 py-4">
        <h1 className="text-center text-4xl font-bold">
          Building {building?.code} ({building?.name})
        </h1>
      </div>

      <div className="flex h-full w-full flex-col gap-x-8 gap-y-12 md:flex-row">
        <main className="flex h-full w-full flex-col gap-y-6 rounded-xl bg-slate-200 p-8 md:w-3/4">
          <Input
            className="w-full"
            placeholder="Name"
            defaultValue={building?.name}
            inputRef={nameInputRef}
          />
          <InputGroup title="Dimensions" bgAlt>
            <Input
              className="w-full"
              placeholder="Width (m)"
              type="number"
              step={0.1}
              defaultValue={building?.maxDimensions.width}
              inputRef={widthInputRef}
            />
            <Input
              defaultValue={building?.maxDimensions.length}
              className="w-full"
              placeholder="Length (m)"
              step={0.1}
              type="number"
              inputRef={lengthInputRef}
            />
          </InputGroup>
          <TextArea
            className="w-full"
            placeholder="Description"
            defaultValue={building?.description}
            inputRef={buildingDescriptionInputRef}
          />
        </main>

        <div className="flex h-full w-full flex-col justify-between gap-y-12 rounded-xl bg-slate-200 px-4 py-8 md:w-1/4">
          <div className="flex flex-col gap-y-2">
            <h2 className="mb-4 text-center text-3xl font-bold">Actions</h2>
            <Button
              name="floors"
              className="w-full"
              type="default"
              onClick={() => navigate("floors")}
            >
              Floors
            </Button>
            <Button
              name={`${elevator ? "edit" : "add"}-elevator`}
              onClick={() => setIsElevatorModalVisible((cur) => !cur)}
              className="w-full"
              type="default"
            >
              {elevator ? "Edit" : "Add"} Elevator
            </Button>
          </div>
          <div className="flex flex-col gap-y-2">
            <Button
              name="save"
              onClick={handleSaveBuildingClick}
              className="w-full self-end"
              type="confirm"
            >
              Save
            </Button>
            <Button
              className="w-full self-end"
              disabled
              type="destroy"
              name="delete"
            >
              Delete Building
            </Button>
          </div>
        </div>

        <Modal
          setIsVisible={setIsElevatorModalVisible}
          isVisible={isElevatorModalVisible}
          title={`${elevator ? "Edit" : "Add"} Elevator`}
        >
          <div className="flex h-full flex-col gap-y-4">
            <Input
              className="w-full"
              placeholder="Code"
              disabled={!!elevator}
              defaultValue={elevator?.code}
            />
            <div className="flex flex-col items-center justify-between gap-x-8 md:flex-row">
              <Input
                className="w-full"
                placeholder="Model"
                defaultValue={elevator?.model}
                inputRef={modelInputRef}
              />
              <Input
                className="w-full"
                placeholder="Brand"
                defaultValue={elevator?.brand}
                inputRef={brandInputRef}
              />
            </div>
            <Input
              className="w-full"
              placeholder="Serial Number"
              defaultValue={elevator?.serialNumber}
              inputRef={serialNumberInputRef}
            />
            <TextArea
              className="w-full"
              placeholder="Description"
              defaultValue={elevator?.description}
              inputRef={descriptionInputRef}
            />
            {selectedFloors.length > 0 ? (
              <Selector
                title="Floors"
                items={selectedFloors}
                setItems={setSelectedFloors}
                additionalText="Floor "
              />
            ) : (
              <div className="flex h-32 items-center justify-center">
                <p className="text-2xl font-bold text-slate-600">
                  No floors in the building
                </p>
              </div>
            )}
          </div>
          <Button
            name="save"
            onClick={handleSaveClick}
            type="confirm"
            disabled={selectedFloors.length === 0}
            className="mt-4 py-2 text-xl"
          >
            Save
          </Button>
        </Modal>
      </div>
    </main>
  );
};

export default BuildingPage;
