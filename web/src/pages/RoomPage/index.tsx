import { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

import Input from "@/components/Input";
import ListRooms from "@/components/ListRooms";
import Modal from "@/components/Modal";
import TextArea from "@/components/TextArea";

import Button from "../../components/Button";
import { ArrowLeftIcon } from "../../styles/Icons";
import { useRoomPageModule } from "./module";

const RoomPage: React.FC = () => {
  const navigate = useNavigate();
  const [isRoomModalVisible, setIsRoomModalVisible] = useState(false);

  async function handleSaveClick() {
    //TODO
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
        <h1 className="text-center text-4xl font-bold">Room </h1>
      </div>

      <div className="flex h-full w-full gap-x-8">
        <div className="flex h-full w-1/4 flex-col justify-between rounded-xl bg-slate-200 px-4 py-8">
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
      </div>
    </div>
  );
};

export default RoomPage;
