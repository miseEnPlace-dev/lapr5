import { useCallback, useEffect, useRef, useState } from "react";
import { useInjection } from "inversify-react";
import swal from "sweetalert";

import { TYPES } from "../../inversify/types";
import { useAuth } from "@/hooks/useAuth";
import { IPaginationDTO } from "@/dto/IPaginationDTO";
import { DeviceModel } from "@/model/DeviceModel";
import { Floor } from "@/model/Floor";
import { Request } from "@/model/Request";
import { Room } from "@/model/Room";
import { DeviceModelService } from "@/service/deviceModelService";
import { IDeviceModelService } from "@/service/IService/IDeviceModelService";
import { IFloorService } from "@/service/IService/IFloorService";
import { IRequestService } from "@/service/IService/IRequestService";
import { IRoomService } from "@/service/IService/IRoomService";
import { RequestService } from "@/service/requestService";

import { Building } from "../../model/Building";
import { IBuildingService } from "../../service/IService/IBuildingService";

const taskTypes = [
  {
    name: "Pick and Delivery",
    code: "pick_delivery",
  },
  {
    name: "Surveillance",
    code: "surveillance",
  },
];

export const useTasksModule = () => {
  const buildingService = useInjection<IBuildingService>(TYPES.buildingService);
  const floorService = useInjection<IFloorService>(TYPES.floorService);
  const roomService = useInjection<IRoomService>(TYPES.roomService);
  const requestService = useInjection<IRequestService>(TYPES.requestService);
  const deviceModelService = useInjection<IDeviceModelService>(
    TYPES.deviceModelService
  );
  const [deviceModels, setDeviceModels] = useState<DeviceModel[]>([]);

  const fetchDeviceModels = useCallback(async () => {
    const deviceModels = await deviceModelService.getDeviceModels(1, 1000);
    setDeviceModels(deviceModels.data);
  }, [deviceModelService]);

  useEffect(() => {
    fetchDeviceModels();
  }, [fetchDeviceModels]);

  const { id, username, phoneNumber } = useAuth();

  const [requests, setRequests] = useState<IPaginationDTO<Request> | null>(
    null
  );

  const [page, setPage] = useState<number>(1);
  const [type, setType] = useState<string | null>(null);

  const [buildings, setBuildings] = useState<Building[]>([]);

  const [building1Floors, setBuilding1Floors] = useState<Floor[]>([]);

  const [building1Rooms, setBuilding1Rooms] = useState<Room[]>([]);
  const [building2Rooms, setBuilding2Rooms] = useState<Room[]>([]);

  const [building1Code, setBuilding1Code] = useState<string | null>("");
  const [building2Code, setBuilding2Code] = useState<string | null>("");

  const [stateFilter, setStateFilter] = useState<string | null>("");
  const stateInputRef = useRef<HTMLSelectElement>(null);

  const [deviceModelFilter, setDeviceModelFilter] = useState<string | null>("");
  const deviceModelInputRef = useRef<HTMLSelectElement>(null);

  const [userFilter, setUserFilter] = useState<string | null>("");
  const userInputRef = useRef<HTMLSelectElement>(null);

  const typeInputRef = useRef<HTMLSelectElement>(null);

  const floorInputRef = useRef<HTMLSelectElement>(null);
  const room1InputRef = useRef<HTMLSelectElement>(null);
  const room2InputRef = useRef<HTMLSelectElement>(null);

  const pickupUserNameInputRef = useRef<HTMLInputElement>(null);
  const pickupUserPhoneInputRef = useRef<HTMLInputElement>(null);
  const deliveryUserNameInputRef = useRef<HTMLInputElement>(null);
  const deliveryUserPhoneInputRef = useRef<HTMLInputElement>(null);

  const emergencyNameInputRef = useRef<HTMLInputElement>(null);
  const emergencyPhoneInputRef = useRef<HTMLInputElement>(null);

  const confirmationCodeInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);

  const itemsPerPage = 2;

  const handlePagination = (page: number) => {
    setPage(page);
  };

  async function handleCreate() {
    if (!typeInputRef.current || !typeInputRef.current.value) {
      swal("Error", "Type input is not defined", "error");
      return;
    } else {
      switch (typeInputRef.current.value) {
        case "pick_delivery":
          if (
            !pickupUserNameInputRef.current ||
            !pickupUserPhoneInputRef.current ||
            !deliveryUserNameInputRef.current ||
            !deliveryUserPhoneInputRef.current ||
            !confirmationCodeInputRef.current ||
            !descriptionInputRef.current ||
            !id ||
            !room1InputRef.current ||
            !room2InputRef.current
          )
            throw new Error("Some fields are not defined");

          const room1 = getRoom1();
          const room2 = getRoom2();

          if (!room1 || !room2) {
            swal("Error", "Rooms are not defined", "error");
            return;
          }

          await requestService.createPickAndDeliveryRequest({
            pickupUserName: pickupUserNameInputRef.current.value,
            pickupUserPhoneNumber: pickupUserPhoneInputRef.current.value,
            deliveryUserName: deliveryUserNameInputRef.current.value,
            deliveryUserPhoneNumber: deliveryUserPhoneInputRef.current.value,
            userId: id,
            confirmationCode: confirmationCodeInputRef.current.value,
            description: descriptionInputRef.current.value,
            pickupRoomId: room1.name,
            deliveryRoomId: room2.name,
            startCoordinateX: room1.roomDoor.x,
            startCoordinateY: room1.roomDoor.y,
            endCoordinateX: room2.roomDoor.x,
            endCoordinateY: room2.roomDoor.y,
            type: "pick_delivery",
            startFloorCode: room1.floorCode,
            endFloorCode: room2.floorCode,
          });
          break;
        case "surveillance":
          if (
            !emergencyNameInputRef.current ||
            !emergencyPhoneInputRef.current ||
            !descriptionInputRef.current ||
            !floorInputRef.current ||
            !id
          )
            throw new Error("Some fields are not defined");

          await requestService.createSurveillanceRequest({
            userName: emergencyNameInputRef.current.value,
            phoneNumber: emergencyPhoneInputRef.current.value,
            description: descriptionInputRef.current.value,
            userId: id,
            floorId: floorInputRef.current?.value,
            type: "surveillance",
          });
          break;
      }
    }

    fetchRequests();
  }

  function getRoom1(): Room | undefined {
    if (room1InputRef.current && room1InputRef.current.value)
      return building1Rooms.find(
        (room) => room.name === room1InputRef.current!.value
      );
  }

  function getRoom2(): Room | undefined {
    if (room2InputRef.current && room2InputRef.current.value)
      return building2Rooms.find(
        (room) => room.name === room2InputRef.current!.value
      );
  }

  const fetchBuildings = useCallback(async () => {
    try {
      const buildings = await buildingService.getBuildings();
      setBuildings(buildings.data);
    } catch (error) {
      setBuildings([]);
    }
  }, [buildingService]);

  const fetchFloors = useCallback(async () => {
    try {
      if (building1Code) {
        const floors = await floorService.getBuildingFloors(building1Code);
        setBuilding1Floors(floors);
      }
    } catch (error) {
      setBuilding1Floors([]);
    }
  }, [building1Code, floorService]);

  const fetchRooms1 = useCallback(async () => {
    try {
      if (building1Code) {
        const rooms = await roomService.getBuildingRooms(building1Code);
        setBuilding1Rooms(rooms);
      }
    } catch (error) {
      setBuilding1Rooms([]);
    }
  }, [building1Code, roomService]);

  const fetchRooms2 = useCallback(async () => {
    try {
      if (building2Code) {
        const rooms = await roomService.getBuildingRooms(building2Code);
        setBuilding2Rooms(rooms);
      }
    } catch (error) {
      setBuilding2Rooms([]);
    }
  }, [building2Code, roomService]);

  const fetchRequests = useCallback(async () => {
    try {
      if (deviceModelFilter) {
        const deviceModel =
          await deviceModelService.getDeviceModelWithCode(deviceModelFilter);

        if (deviceModel.capabilities.length == 2) {
          const r = await requestService.getAllRequests(
            undefined,
            undefined,
            page,
            itemsPerPage
          );
          setRequests(r);
          return;
        }

        if (deviceModel.capabilities[0] == "surveillance") {
          const r = await requestService.getRequestsByType(
            "surveillance",
            page,
            itemsPerPage
          );
          setRequests(r);
          return;
        }

        if (deviceModel.capabilities[0] == "pick_delivery") {
          const r = await requestService.getRequestsByType(
            "pick_delivery",
            page,
            itemsPerPage
          );
          setRequests(r);
          return;
        }
      }
      const r = await requestService.getAllRequests(
        stateFilter ? "state" : userFilter ? "userId" : undefined,
        stateFilter || userFilter || undefined,
        page,
        itemsPerPage
      );
      setRequests(r);
    } catch (error) {
      setRequests({ data: [] });
    }
  }, [requestService, stateFilter, userFilter, page, itemsPerPage]);

  useEffect(() => {
    fetchBuildings();
  }, [fetchBuildings, buildingService]);

  useEffect(() => {
    fetchFloors();
  }, [fetchFloors, floorService]);

  useEffect(() => {
    fetchRooms1();
  }, [fetchRooms1, roomService]);

  useEffect(() => {
    fetchRooms2();
  }, [roomService, fetchRooms2]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests, requestService]);

  const states = [
    {
      name: "Pending",
      code: "pending",
    },
    {
      name: "Accepted",
      code: "accepted",
    },
    {
      name: "Rejected",
      code: "rejected",
    },
    {
      name: "Executed",
      code: "executed",
    },
  ];

  return {
    requests,
    page,
    setPage,
    itemsPerPage,
    handlePagination,
    taskTypes,
    typeInputRef,
    type,
    setType,
    building1Floors,
    setBuilding1Code,
    setBuilding2Code,
    building2Code,
    building1Code,
    buildings,
    building1Rooms,
    building2Rooms,
    handleCreate,
    pickupUserNameInputRef,
    pickupUserPhoneInputRef,
    deliveryUserNameInputRef,
    deliveryUserPhoneInputRef,
    emergencyNameInputRef,
    emergencyPhoneInputRef,
    confirmationCodeInputRef,
    descriptionInputRef,
    floorInputRef,
    username,
    phoneNumber,
    stateFilter,
    setStateFilter,
    deviceModelFilter,
    setDeviceModelFilter,
    userFilter,
    setUserFilter,
    stateInputRef,
    deviceModelInputRef,
    userInputRef,
    states,
    deviceModels,
    room1InputRef,
    room2InputRef,
  };
};
