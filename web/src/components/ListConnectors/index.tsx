import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

import Button from "../Button";
import Input from "../Input";
import Modal from "../Modal";
import { useListConnectorsModule } from "./module";

import { AxiosError } from "axios";

const ListConnectors: React.FC = () => {
  const navigate = useNavigate();
  const {
    connectors,
    codeInputRef,
    floor1InputRef,
    floor2InputRef,
    handleSave,
  } = useListConnectorsModule();

  const [isConnectorModalVisible, setIsConnectorModalVisible] = useState(false);

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

  const ANIMATION_DELAY = 0.1;

  return (
    <div className="mr-12 mt-8 flex flex-col justify-between gap-y-6 text-left text-lg">
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
                placeholder="Floor 1 Code"
                inputRef={floor2InputRef}
              />
            </div>
          </div>
          <Button onClick={handleSaveClick} type="confirm">
            Save
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default ListConnectors;
