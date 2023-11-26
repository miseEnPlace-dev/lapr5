import { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

import Input from "@/components/Input";
import ListFloors from "@/components/ListFloors";
import Modal from "@/components/Modal";
import Selector from "@/components/Selector";
import TextArea from "@/components/TextArea";

import Button from "../../components/Button";
import { ArrowLeftIcon } from "../../styles/Icons";
import { useBuildingFloorsPageModule } from "./module";

const BuildingFloorsPage: React.FC = () => {
  const {
    building,
    floor,
    floors,
    filters,
    setFilters,
    handleSave,
    floorCodeInputRef,
    floorDescriptionInputRef,
    floorLengthInputRef,
    floorWidthInputRef,
    floorMapInputRef,
  } = useBuildingFloorsPageModule();
  const navigate = useNavigate();
  const [isFloorModalVisible, setIsFloorModalVisible] = useState(false);

  async function handleSaveClick() {
    try {
      await handleSave();

      swal("Success", "Floor saved successfully", "success");
      setIsFloorModalVisible(false);
    } catch (err: unknown) {
      swal("Error", err as string, "error");
    }
  }

  return (
    <div className="mx-auto flex h-screen min-h-screen w-11/12 flex-col gap-y-8 py-8">
      <button
        className="flex items-center gap-x-2"
        onClick={() => navigate(-1)}
      >
        <ArrowLeftIcon className="absolute left-4 top-4 h-8 w-8 text-slate-500" />
      </button>
      <div className="w-full rounded-xl bg-slate-200 py-4">
        <h1 className="text-center text-4xl font-bold">
          Floors of Building {building?.code}
        </h1>
      </div>

      <div className="flex h-full w-full gap-x-8">
        <main className="flex h-full w-3/4 flex-col gap-y-6 rounded-xl bg-slate-200 p-8">
          <h2 className="text-3xl font-bold">Floors</h2>
          <ListFloors floors={floors} buildingCode={building?.code} />
        </main>

        <div className="flex h-full w-1/4 flex-col justify-between rounded-xl bg-slate-200 px-4 py-8">
          <div className="flex flex-col gap-y-2">
            <h2 className="mb-4 text-center text-3xl font-bold">Actions</h2>
            <Button
              name="add-floor"
              onClick={() => setIsFloorModalVisible((cur) => !cur)}
              className="w-full"
              type="default"
            >
              Add Floor
            </Button>
            <Selector
              items={filters}
              setItems={setFilters}
              title="Filters"
              additionalText="With "
              activeClassName="bg-primary text-white"
            />
          </div>
        </div>

        <Modal
          setIsVisible={setIsFloorModalVisible}
          isVisible={isFloorModalVisible}
          title={`Add Floor`}
        >
          <div className="flex h-full flex-col justify-between gap-y-4">
            <div className="flex flex-col items-center justify-between gap-x-8 gap-y-4">
              <Input
                name="code"
                className="w-full"
                placeholder="Code"
                inputRef={floorCodeInputRef}
              />
              <TextArea
                name="description"
                className="w-full"
                placeholder="Description"
                defaultValue={floor?.description}
                inputRef={floorDescriptionInputRef}
              />
              <div className="flex w-full items-center justify-between gap-x-12">
                <Input
                  name="width"
                  className="w-full"
                  placeholder="Width (m)"
                  type="number"
                  step={0.1}
                  defaultValue={floor?.dimensions.width}
                  inputRef={floorWidthInputRef}
                />
                <Input
                  name="length"
                  defaultValue={floor?.dimensions.length}
                  className="w-full"
                  placeholder="Length (m)"
                  step={0.1}
                  type="number"
                  inputRef={floorLengthInputRef}
                />
              </div>
            </div>
            <Button
              name="save"
              onClick={handleSaveClick}
              type="confirm"
              className="my-2 py-2 text-xl"
            >
              Save
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default BuildingFloorsPage;
