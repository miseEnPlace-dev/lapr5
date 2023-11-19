import { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

import Button from "../../components/Button";
import Input from "../../components/Input";
import TextArea from "../../components/TextArea";
import { ArrowLeftIcon } from "../../styles/Icons";
import { useBuildingPageModule } from "./module";

const FloorPage: React.FC = () => {
  const {
    floor,
    descriptionInputRef,
    lengthInputRef,
    widthInputRef,
    handleSaveFloor,
  } = useBuildingPageModule();

  const navigate = useNavigate();
  const [isElevatorModalVisible, setIsElevatorModalVisible] = useState(false);

  async function handleSaveFloorClick() {
    try {
      await handleSaveFloor();

      swal("Success", "Floor saved successfully", "success");
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
          Floor no. {floor?.code}
        </h1>
      </div>

      <div className="flex h-full w-full flex-col gap-x-8 gap-y-12 md:flex-row">
        <main className="flex h-full w-full flex-col gap-y-6 rounded-xl bg-slate-200 p-8 md:w-3/4">
          <div className="flex items-center justify-between gap-x-12">
            <Input
              className="w-full"
              placeholder="Width (m)"
              type="number"
              step={0.1}
              defaultValue={floor?.dimensions.width}
              inputRef={widthInputRef}
            />
            <Input
              defaultValue={floor?.dimensions.length}
              className="w-full"
              placeholder="Length (m)"
              step={0.1}
              type="number"
              inputRef={lengthInputRef}
            />
          </div>
          <TextArea
            className="w-full"
            placeholder="Description"
            defaultValue={floor?.description}
            inputRef={descriptionInputRef}
          />
        </main>

        <div className="flex h-full w-full flex-col justify-between gap-y-12 rounded-xl bg-slate-200 px-4 py-8 md:w-1/4">
          <div className="flex flex-col gap-y-2">
            <h2 className="mb-4 text-center text-3xl font-bold">Actions</h2>
            <Button
              name="rooms"
              className="w-full"
              type="default"
              onClick={() => navigate("rooms")}
            >
              Rooms
            </Button>
          </div>
          <div className="flex flex-col gap-y-2">
            <Button
              name="save"
              onClick={handleSaveFloorClick}
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
      </div>
    </div>
  );
};

export default FloorPage;
