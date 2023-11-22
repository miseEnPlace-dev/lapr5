import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

import InputSelect from "@/components/InputSelect";

import Button from "../../components/Button";
import Input from "../../components/Input";
import TextArea from "../../components/TextArea";
import { ArrowLeftIcon } from "../../styles/Icons";
import { useDeviceModelPageModule } from "./module";

const DevicePage: React.FC = () => {
  const {
    device,
    nicknameInputRef,
    modelCodeInputRef,
    serialNumberInputRef,
    descriptionInputRef,
    handleSaveDevice,
    handleInhibitDevice,
    deviceModels,
  } = useDeviceModelPageModule();

  const navigate = useNavigate();

  async function handleSaveDeviceClick() {
    try {
      await handleSaveDevice();

      swal("Success", "Device Model saved successfully", "success");
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
          Device Code - {device?.code} (
          {device?.isAvailable ? "Active" : "Inactive"})
        </h1>
      </div>

      <div className="flex h-full w-full flex-col gap-x-8 gap-y-12 md:flex-row">
        <main className="flex h-full w-full flex-col gap-y-6 rounded-xl bg-slate-200 p-8 md:w-3/4">
          <div className="flex items-center justify-between gap-x-12">
            <Input
              className="w-full"
              placeholder="Nickname"
              defaultValue={device?.nickname}
              inputRef={nicknameInputRef}
            />
            <InputSelect
              className="w-full"
              name="Device Model"
              placeholder="Device Model"
              inputRef={modelCodeInputRef}
              selected={device?.modelCode ? device.modelCode : ""}
              options={deviceModels}
            />
            <Input
              defaultValue={device?.serialNumber}
              className="w-full"
              placeholder="Serial Number"
              inputRef={serialNumberInputRef}
            />
          </div>
          <TextArea
            className="w-full"
            placeholder="Description"
            defaultValue={device?.description}
            inputRef={descriptionInputRef}
          />
        </main>

        <div className="flex h-full w-full flex-col justify-between gap-y-12 rounded-xl bg-slate-200 px-4 py-8 md:w-1/4">
          <div className="flex flex-col gap-y-2">
            <h2 className="mb-4 text-center text-3xl font-bold">Actions</h2>
          </div>
          <div className="flex flex-col gap-y-2">
            <Button
              name="save"
              onClick={handleSaveDeviceClick}
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
              Delete Device
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevicePage;
