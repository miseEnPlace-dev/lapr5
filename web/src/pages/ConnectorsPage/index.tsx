import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

import { useMenuOptions } from "@/hooks/useMenuOptions";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import SideBar from "@/components/SideBar";
import { FilterIcon } from "@/styles/Icons";

import { useListConnectorsModule } from "./module";

import { AxiosError } from "axios";

const ConnectorsPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    connectors,
    codeInputRef,
    floor1InputRef,
    floor2InputRef,
    handleSave,
    filters,
    setFilters,
  } = useListConnectorsModule();

  const [isConnectorModalVisible, setIsConnectorModalVisible] = useState(false);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

  const building1FilterInputRef = useRef<HTMLInputElement>(null);
  const building2FilterInputRef = useRef<HTMLInputElement>(null);

  async function handleSaveClick() {
    try {
      await handleSave();

      swal("Success", "Connector saved successfully", "success");
      setIsConnectorModalVisible(false);
    } catch (err: unknown) {
      if (err instanceof AxiosError && err.response)
        swal("Error", err.response.data.errors as string, "error");

      swal("Error", err as string, "error");
    }
  }

  async function handleFilterClick() {
    try {
      if (
        !building1FilterInputRef.current?.value ||
        !building2FilterInputRef.current?.value
      )
        setFilters(null);
      else
        setFilters([
          building1FilterInputRef.current.value,
          building2FilterInputRef.current.value,
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

  const ANIMATION_DELAY = 0.1;

  const { menuOptions } = useMenuOptions();

  return (
    <div className="flex">
      <SideBar menuOptions={menuOptions} />
      <div className="mt-12 flex h-full w-full flex-col gap-y-4 pl-12">
        <h1 className="text-4xl font-bold">Connectors</h1>
        <p className="text-slate-500">
          Manage here all connectors of the campus.
        </p>
        <div className="mr-12 mt-8 flex flex-col justify-between gap-y-6 text-left text-lg">
          <motion.button
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.2,
              delay: connectors.length * ANIMATION_DELAY,
            }}
            onClick={() => setIsFilterModalVisible(true)}
            className={`flex w-full items-center justify-center gap-x-10 ${
              filters ? "bg-slate-400" : "bg-slate-300"
            } py-4 text-gray-500`}
          >
            <div className="flex flex-row items-center gap-x-4 text-lg font-bold text-slate-600">
              {filters ? <FilterIcon /> : ""}
              Filter Connectors between Buildings
            </div>
          </motion.button>
          {connectors.map((c, i) => (
            <motion.button
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: ANIMATION_DELAY * i }}
              key={c.code}
              onClick={() => navigate(`/connectors/${c.code}`)}
              className="flex w-full items-center gap-x-10 bg-slate-200 px-12 py-8"
            >
              <h2 className="text-6xl font-bold">{c.code}</h2>
              <div className="flex flex-col">
                <div className="text-left text-sm text-slate-600">
                  Floor {c.floor1Code} - Floor {c.floor2Code}
                </div>
              </div>
            </motion.button>
          ))}
          <motion.button
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.2,
              delay: connectors.length * ANIMATION_DELAY,
            }}
            onClick={() => setIsConnectorModalVisible(true)}
            className="flex w-full items-center justify-center bg-secondary px-12 py-4 text-center text-5xl font-bold"
          >
            +
          </motion.button>

          <Modal
            setIsVisible={setIsConnectorModalVisible}
            isVisible={isConnectorModalVisible}
            title="Create Connector"
          >
            <div className="flex h-full flex-col justify-between gap-y-4">
              <div className="flex w-full flex-col gap-y-4">
                <Input
                  className="w-full"
                  placeholder="Code"
                  inputRef={codeInputRef}
                />
                <div className="flex w-full flex-col items-center gap-x-8 gap-y-4 md:flex-row">
                  <Input
                    className="w-full"
                    placeholder="Floor 1 Code"
                    inputRef={floor1InputRef}
                  />
                  <Input
                    className="w-full"
                    placeholder="Floor 2 Code"
                    inputRef={floor2InputRef}
                  />
                </div>
              </div>
              <Button name="save" onClick={handleSaveClick} type="confirm">
                Save
              </Button>
            </div>
          </Modal>

          <Modal
            setIsVisible={setIsFilterModalVisible}
            isVisible={isFilterModalVisible}
            title="Filter Connectors between Buildings"
          >
            <div className="flex h-full flex-col justify-between gap-y-4">
              <div className="flex w-full flex-col gap-y-4">
                <div className="flex w-full flex-col gap-x-8 gap-y-4">
                  <Input
                    className="w-full"
                    placeholder="Building 1 Code"
                    inputRef={building1FilterInputRef}
                    defaultValue={filters ? filters[0] : undefined}
                  />
                  <Input
                    className="w-full"
                    placeholder="Building 2 Code"
                    inputRef={building2FilterInputRef}
                    defaultValue={filters ? filters[1] : undefined}
                  />
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
      </div>
    </div>
  );
};

export default ConnectorsPage;
