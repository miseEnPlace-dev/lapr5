import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

import Dropdown from "@/components/Dropdown";

import Button from "../../components/Button";
import Input from "../../components/Input";
// import Dropdown from "../../components/Dropdown";
import TextArea from "../../components/TextArea";
import { ArrowLeftIcon } from "../../styles/Icons";
import { useDevicePageModule } from "./module";

const DevicePage: React.FC = () => {
  const {
    device,
    nicknameInputRef,
    modelCodeInputRef,
    serialNumberInputRef,
    descriptionInputRef,
    handleInhibitDevice,
    deviceModels,
  } = useDevicePageModule();

  const navigate = useNavigate();

  async function handleInhibitDeviceClick() {
    try {
      await handleInhibitDevice();

      swal("Success", "Status of the Device changed successfully", "success");
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
          Device {device?.code} ({device?.nickname}) -{" "}
          {device?.isAvailable ? "Active" : "Inactive"}
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
            <Dropdown
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

            <Button
              name="inhibitDevice"
              className="w-full"
              type="default"
              onClick={handleInhibitDeviceClick}
            >
              {device?.isAvailable ? "Disable Device" : "Enable Device"}
            </Button>
          </div>
          <div className="flex flex-col gap-y-2">
            <Button
              name="save"
              disabled
              onClick={() => {}}
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
