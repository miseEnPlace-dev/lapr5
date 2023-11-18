import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

import Button from "../../components/Button";
import Input from "../../components/Input";
import { ArrowLeftIcon } from "../../styles/Icons";
import { useConnectorPageModule } from "./module";

const ConnectorPage: React.FC = () => {
  const { connector, handleUpdate, floor1InputRef, floor2InputRef } =
    useConnectorPageModule();

  const navigate = useNavigate();

  async function handleSaveClick() {
    try {
      await handleUpdate();
      swal("Success", "Connector updated successfully!", "success");
    } catch (err: unknown) {
      if (err instanceof Error) swal("Error", err.message, "error");
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
          Connector {connector?.code}
        </h1>
      </div>

      <div className="flex h-full w-full flex-col gap-x-8 gap-y-12 md:flex-row">
        <main className="flex h-full w-full flex-col gap-y-6 rounded-xl bg-slate-200 p-8 md:w-3/4">
          <div className="flex items-center justify-between gap-x-12">
            <Input
              defaultValue={connector?.floor1Code}
              className="w-full"
              placeholder="Floor 1 Code"
              inputRef={floor1InputRef}
            />
            <Input
              defaultValue={connector?.floor2Code}
              className="w-full"
              placeholder="Floor 2 Code"
              inputRef={floor2InputRef}
            />
          </div>
        </main>

        <div className="flex h-full w-full flex-col justify-between gap-y-12 rounded-xl bg-slate-200 px-4 py-8 md:w-1/4">
          <div className="flex flex-col gap-y-2">
            <h2 className="mb-4 text-center text-3xl font-bold">Actions</h2>
          </div>
          <div className="flex flex-col gap-y-2">
            <Button
              name="save"
              className="w-full self-end"
              type="confirm"
              onClick={handleSaveClick}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectorPage;
