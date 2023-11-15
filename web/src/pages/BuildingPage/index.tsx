import { useState } from "react";
import { Reorder } from "framer-motion";
import { useNavigate } from "react-router-dom";

import Button from "../../components/Button";
import Input from "../../components/Input";
import Modal from "../../components/Modal";
import TextArea from "../../components/TextArea";
import { ArrowLeftIcon } from "../../styles/Icons";
import { useBuildingPageModule } from "./module";

const BuildingPage: React.FC = () => {
  const { building, elevator, floors } = useBuildingPageModule();
  const navigate = useNavigate();
  const [isElevatorModalVisible, setIsElevatorModalVisible] = useState(false);
  const [selectedFloors, setSelectedFloors] = useState<string[]>([]);

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
          Edifício no. {building?.code} - {building?.name}
        </h1>
      </div>

      <div className="flex h-full w-full gap-x-8">
        <main className="flex h-full w-3/4 flex-col gap-y-6 rounded-xl bg-slate-200 p-8">
          <Input
            className="w-full"
            placeholder="Name"
            defaultValue={building?.name}
          />
          <div className="flex items-center justify-between gap-x-12">
            <Input
              className="w-full"
              placeholder="Width (m)"
              type="number"
              step={0.1}
              defaultValue={building?.maxDimensions.width}
            />
            <Input
              defaultValue={building?.maxDimensions.length}
              className="w-full"
              placeholder="Length (m)"
              step={0.1}
              type="number"
            />
          </div>
          <TextArea
            className="w-full"
            placeholder="Description"
            defaultValue={building?.description}
          />
        </main>

        <div className="flex h-full w-1/4 flex-col justify-between rounded-xl bg-slate-200 px-4 py-8">
          <div className="flex flex-col gap-y-2">
            <h2 className="mb-4 text-center text-3xl font-bold">Actions</h2>
            <Button
              onClick={() => setIsElevatorModalVisible((cur) => !cur)}
              className="w-full"
              type="default"
            >
              {elevator ? "Edit" : "Add"} Elevator
            </Button>
            <Button className="w-full" type="default">
              Add Floor
            </Button>
          </div>
          <div className="flex flex-col gap-y-2">
            <Button className="w-full self-end" type="confirm">
              Save
            </Button>
            <Button className="w-full self-end" disabled type="destroy">
              Delete Building
            </Button>
          </div>
        </div>

        <Modal
          setIsVisible={setIsElevatorModalVisible}
          isVisible={isElevatorModalVisible}
          title={`${elevator ? "Edit" : "Add"} Elevator`}
        >
          <div className="flex h-full flex-col justify-between">
            <div className="flex flex-col gap-y-4">
              <Input
                className="w-full"
                placeholder="Name"
                defaultValue={elevator?.code}
              />
              <Reorder.Group
                values={floors}
                onReorder={(values) => console.log(values)}
                axis="y"
              >
                {floors?.map((floor) => (
                  <Reorder.Item
                    key={floor.code}
                    className="flex flex-col gap-y-4"
                  >
                    {floor.code}
                  </Reorder.Item>
                ))}
              </Reorder.Group>
            </div>
          </div>
          <Button type="confirm" className="py-2 text-xl">
            Save
          </Button>
        </Modal>
      </div>
    </div>
  );
};

export default BuildingPage;
