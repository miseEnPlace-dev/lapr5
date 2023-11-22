import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

import InputSelect from "@/components/InputSelect";
import Selector from "@/components/Selector";

import Button from "../../components/Button";
import Input from "../../components/Input";
import { ArrowLeftIcon } from "../../styles/Icons";
import { useDeviceModelPageModule } from "./module";

const DevicePage: React.FC = () => {
  const {
    deviceModel,
    nameInputRef,
    brandInputRef,
    handleSaveDeviceModel,
    selectedCapabilities,
    setSelectedCapabilities,
  } = useDeviceModelPageModule();

  const navigate = useNavigate();

  async function handleSaveDeviceModelClick() {
    try {
      await handleSaveDeviceModel();

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
          Device Model {deviceModel?.code} - {deviceModel?.name}
        </h1>
      </div>

      <div className="flex h-full w-full flex-col gap-x-8 gap-y-12 md:flex-row">
        <main className="flex h-full w-full flex-col gap-y-6 rounded-xl bg-slate-200 p-8 md:w-3/4">
          <div className="flex w-full flex-col gap-y-4">
            <Input
              className="w-full"
              placeholder="Name"
              defaultValue={deviceModel?.name}
              inputRef={nameInputRef}
            />
            <Input
              className="w-full"
              placeholder="Brand"
              defaultValue={deviceModel?.brand}
              inputRef={brandInputRef}
            />
            <Input
              className="w-full"
              disabled
              placeholder="Type"
              defaultValue="Robot"
            />
            <Selector
              items={selectedCapabilities}
              title="Capabilities"
              setItems={
                setSelectedCapabilities as unknown as React.Dispatch<
                  React.SetStateAction<{ name: string; selected: boolean }[]>
                >
              }
            />
          </div>
        </main>

        <div className="flex h-full w-full flex-col justify-between gap-y-12 rounded-xl bg-slate-200 px-4 py-8 md:w-1/4">
          <div className="flex flex-col gap-y-2">
            <h2 className="mb-4 text-center text-3xl font-bold">Actions</h2>
          </div>
          <div className="flex flex-col gap-y-2">
            {/* <Button
              name="save"
              onClick={handleSaveDeviceClick}
              className="w-full self-end"
              type="confirm"
            >
              Save
            </Button> */}
            <Button
              className="w-full self-end"
              disabled
              type="destroy"
              name="delete"
            >
              Delete Device Model
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevicePage;
