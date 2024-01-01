import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

import { useMenuOptions } from "@/hooks/useMenuOptions";
import Button from "@/components/Button";
import Input from "@/components/Input";
import InputGroup from "@/components/InputGroup";
import Modal from "@/components/Modal";
import Pagination from "@/components/Pagination";
import SideBar from "@/components/SideBar";
import TextArea from "@/components/TextArea";
import { FilterIcon } from "@/styles/Icons";

import { useListBuildingsModule } from "./module";

import { AxiosError } from "axios";

const ANIMATION_DELAY = 0.1;

const BuildingsPage: React.FC = () => {
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
    handlePagination,
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

  async function handleRemoveFilter() {
    setFilters(null);

    setIsFilterModalVisible(false);
  }

  const { menuOptions } = useMenuOptions();

  return (
    <div className="flex">
      <SideBar menuOptions={menuOptions} />
      <main className="my-12 flex h-full w-full flex-col gap-y-4 pl-12">
        <h1 className="text-4xl font-bold">Buildings</h1>
        <p className="text-slate-500">
          Manage here all buildings of the campus.
        </p>
        <div
          aria-label="buildings-container"
          className="mr-12 mt-8 flex flex-col justify-between gap-y-6 text-left text-lg"
        >
          <motion.button
            name="filter"
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.2,
              delay: buildings?.data.length || 0 * ANIMATION_DELAY,
            }}
            onClick={() => setIsFilterModalVisible(true)}
            className={`flex w-full items-center justify-center gap-x-10 ${
              filters ? "bg-slate-400" : "bg-slate-300"
            } py-4 text-gray-500`}
          >
            <div className="flex flex-row items-center gap-x-4 text-lg font-bold text-slate-600">
              {filters ? <FilterIcon /> : ""}
              Filter Buildings by Number of Floors
            </div>
          </motion.button>
          <motion.button
            name="create-building"
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.2,
              delay: buildings?.data.length || 0 * ANIMATION_DELAY,
            }}
            onClick={() => setIsBuildingModalVisible(true)}
            className="flex w-full items-center justify-center bg-secondary px-12 py-4 text-center text-5xl font-bold"
          >
            +
          </motion.button>
          {!buildings ? null : buildings.data.length == 0 ? ( // TODO: skeleton component // TODO: skeleton component
            <p className="text-slate-500">
              No results were found for your search... Try to change or remove
              the filters.
            </p>
          ) : (
            buildings.data.map((building, i) => (
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
                  <h3 className="text-left text-2xl font-bold">
                    {building.name}
                  </h3>
                  <div className="text-left text-sm text-slate-600">
                    {building.maxDimensions.length} x{" "}
                    {building.maxDimensions.width}
                    {building.description && (
                      <span>&nbsp;&middot; {building.description}</span>
                    )}
                  </div>
                </div>
              </motion.button>
            ))
          )}

          <Pagination
            meta={buildings?.meta}
            changePage={handlePagination}
            className="flex items-center justify-center gap-x-4"
          />

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
                <InputGroup
                  title="Dimensions"
                  description="Specify the dimensions of the building."
                >
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
                </InputGroup>
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
            title="Filter Buildings by Number of Floors"
          >
            <div className="flex h-full flex-col justify-between gap-y-4">
              <div className="flex w-full flex-col gap-y-4">
                <div className="flex w-full flex-col gap-x-8 gap-y-4">
                  <InputGroup
                    title="Floor's Interval"
                    description="Select the Minimum and Maximum number of floors of the buildings you want to filter."
                  >
                    <Input
                      className="w-full"
                      placeholder="Minimum"
                      type="number"
                      inputRef={minFloorsFilterInputRef}
                      defaultValue={filters ? filters[0] : undefined}
                    />
                    <Input
                      className="w-full"
                      placeholder="Maximum"
                      type="number"
                      inputRef={maxFloorsFilterInputRef}
                      defaultValue={filters ? filters[1] : undefined}
                    />
                  </InputGroup>

                  {filters && (
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
                onClick={handleFilterClick}
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

export default BuildingsPage;
