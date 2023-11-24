import { useCallback, useEffect, useRef, useState } from "react";
import { useInjection } from "inversify-react";
import { useParams } from "react-router-dom";

import { TYPES } from "../../inversify/types";
import { Floor } from "@/model/Floor";
import { Room } from "@/model/Room";
import { IFloorService } from "@/service/IService/IFloorService";
import { IRoomService } from "@/service/IService/IRoomService";

import { Building } from "../../model/Building";
import { IBuildingService } from "../../service/IService/IBuildingService";

export const useRoomPageModule = () => {
  const buildingService = useInjection<IBuildingService>(TYPES.buildingService);
  const roomService = useInjection<IRoomService>(TYPES.roomService);
  const floorService = useInjection<IFloorService>(TYPES.floorService);

  const { buildingCode, floorCode } = useParams();

  const [building, setBuilding] = useState<Building>();
  const [room, setRoom] = useState<Room>();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [floor, setFloor] = useState<Floor>();

  const roomNameInputRef = useRef<HTMLInputElement>(null);
  const roomDescriptionInputRef = useRef<HTMLTextAreaElement>(null);
  const roomCategoryInputRef = useRef<HTMLInputElement>(null);
  const roomWidthInputRef = useRef<HTMLInputElement>(null);
  const roomLengthInputRef = useRef<HTMLInputElement>(null);

  const fetchRoom = useCallback(
    async (buildingCode: string, floorCode: string, roomName: string) => {
      const room = await roomService.getRoomWithName(
        buildingCode,
        floorCode,
        roomName
      );
      setRoom(room);
    },
    [roomService]
  );

  async function handleCreate() {
    if (!buildingCode) throw new Error("No building code provided");
    if (!floorCode) throw new Error("No floor code provided");

    if (!roomNameInputRef.current?.value)
      throw new Error("No floor code provided");
    if (!roomLengthInputRef.current?.value)
      throw new Error("No floor length provided");
    if (!roomWidthInputRef.current?.value)
      throw new Error("No floor width provided");
    if (!roomCategoryInputRef.current?.value)
      throw new Error("No floor category provided");
    if (!floorCode) throw new Error("No floor code provided");

    const r: Room = {
      name: roomNameInputRef.current.value,
      description: roomDescriptionInputRef.current?.value,
      category: roomCategoryInputRef.current?.value,
      dimensions: {
        width: Number(roomWidthInputRef.current.value),
        length: Number(roomLengthInputRef.current.value),
      },
      floorCode: floorCode,
    };

    await roomService.createRoom(buildingCode, floorCode, r);
    if (!rooms) return setRooms([r]);
    setRooms([...rooms, r]);
  }

  async function handleSave() {
    if (!room) return await handleCreate();

    if (buildingCode && floorCode && room)
      fetchRoom(buildingCode, floorCode, room.name);
  }

  const fetchRooms = useCallback(async () => {
    if (!building?.code || !floor?.code) return;
    const rooms = await roomService.getFloorRooms(building?.code, floor?.code);
    setRooms(rooms);
  }, [roomService]);

  const fetchBuilding = useCallback(
    async (buildingCode: string) => {
      const building = await buildingService.getBuildingWithCode(buildingCode);
      setBuilding(building);
    },
    [buildingService]
  );

  const fetchFloor = useCallback(
    async (buildingCode: string, floorCode: string) => {
      const floor = await floorService.getFloor(buildingCode, floorCode);
      setFloor(floor);
    },
    [floorService]
  );

  useEffect(() => {
    async function fetchData() {
      if (!buildingCode || !floorCode) return;
      const b = await buildingService.getBuildingWithCode(buildingCode);
      setBuilding(b);

      const floors = await roomService.getFloorRooms(buildingCode, floorCode);
      setRooms(floors);
    }

    if (!buildingCode || !floorCode) return;
    fetchData();
    fetchBuilding(buildingCode);
    fetchFloor(buildingCode, floorCode);
    fetchRooms();
  }, [
    buildingCode,
    buildingService,
    roomService,
    fetchBuilding,
    fetchFloor,
    fetchRooms,
  ]);

  return {
    floor,
    handleSave,
    handleCreate,
    roomNameInputRef,
    roomDescriptionInputRef,
    roomCategoryInputRef,
    roomWidthInputRef,
    roomLengthInputRef,
    room,
    rooms,
  };
};
