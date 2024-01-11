import { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

import Dropdown from "@/components/Dropdown";
import Input from "@/components/Input";
import InputGroup from "@/components/InputGroup";
import ListRooms from "@/components/ListRooms";
import Modal from "@/components/Modal";
import TextArea from "@/components/TextArea";

import Button from "../../components/Button";
import { ArrowLeftIcon } from "../../styles/Icons";
import { useRoomPageModule } from "./module";

const RoomsPage: React.FC = () => {
  const {
    room,
    categories,
    rooms,
    handleSave,
    floor,
    roomCategoryInputRef,
    roomNameInputRef,
    roomWidthInputRef,
    roomDescriptionInputRef,
    roomLengthInputRef,
    doorXInputRef,
    doorYInputRef,
  } = useRoomPageModule();
  const navigate = useNavigate();
  const [isRoomModalVisible, setIsRoomModalVisible] = useState(false);

  async function handleSaveClick() {
    try {
      await handleSave();

      swal("Success", "Room saved successfully", "success");
      setIsRoomModalVisible(false);
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
          Rooms of Floor {floor?.code}
        </h1>
      </div>

      <div className="flex h-full w-full gap-x-8">
        <main className="flex h-full w-full flex-col gap-y-6 rounded-xl bg-slate-200 p-8">
          <ListRooms rooms={rooms} />
        </main>

        <div className="flex h-full w-1/4 gap-x-8">
          <div className="flex h-full w-full flex-col justify-between rounded-xl bg-slate-200 px-4 py-8">
            <div className="flex flex-col gap-y-2">
              <h2 className="mb-4 text-center text-3xl font-bold">Actions</h2>
              <Button
                name="add-room"
                onClick={() => setIsRoomModalVisible((cur) => !cur)}
                className="w-full"
                type="default"
              >
                Add Room
              </Button>
            </div>
          </div>

          <Modal
            setIsVisible={setIsRoomModalVisible}
            isVisible={isRoomModalVisible}
            title={`Add Room`}
          >
            <div className="flex h-full flex-col justify-between gap-y-4">
              <div className="flex flex-col items-center justify-between gap-x-8 gap-y-4">
                <Input
                  className="w-full"
                  placeholder="Name"
                  inputRef={roomNameInputRef}
                />
                <TextArea
                  className="w-full"
                  placeholder="Description"
                  defaultValue={room?.description}
                  inputRef={roomDescriptionInputRef}
                />
                <InputGroup
                  title="Room Dimensions"
                  description="Specify the dimensions of the room."
                >
                  <Input
                    className="w-full"
                    placeholder="Width (m)"
                    type="number"
                    step={1}
                    inputRef={roomWidthInputRef}
                  />
                  <Input
                    className="w-full"
                    placeholder="Length (m)"
                    step={1}
                    type="number"
                    inputRef={roomLengthInputRef}
                  />
                </InputGroup>
                <InputGroup
                  title="Door Coordinates"
                  description="Specify the coordinates of the room's door."
                >
                  <Input
                    className="w-full"
                    placeholder="X Coordinate"
                    type="number"
                    step={1}
                    inputRef={doorXInputRef}
                  />
                  <Input
                    className="w-full"
                    placeholder="Y Coordinate"
                    step={1}
                    type="number"
                    inputRef={doorYInputRef}
                  />
                </InputGroup>
                <Dropdown
                  className="w-full"
                  name="Category"
                  placeholder="Category"
                  inputRef={roomCategoryInputRef}
                  options={categories}
                />
              </div>
              <Button
                name="save"
                onClick={handleSaveClick}
                type="confirm"
                className="my-2 w-full py-2 text-xl"
              >
                Save
              </Button>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default RoomsPage;
