import { useCallback, useEffect, useRef, useState } from "react";
import { useInjection } from "inversify-react";

import { TYPES } from "../../inversify/types";
import { IPaginationDTO } from "@/dto/IPaginationDTO";
import { Floor } from "@/model/Floor";
import { Room } from "@/model/Room";
import { IFloorService } from "@/service/IService/IFloorService";
import { IRoomService } from "@/service/IService/IRoomService";

import { Building } from "../../model/Building";
import { IBuildingService } from "../../service/IService/IBuildingService";
import { Request } from "@/model/Request";
import { RequestService } from "@/service/requestService";

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
  const requestService = useInjection<RequestService>(TYPES.requestService);

  const [requests, setRequests] = useState<Request[]>([]);

  const [page, setPage] = useState<number>(1);
  const [type, setType] = useState<string | null>(null);

  const [buildings, setBuildings] = useState<Building[]>([]);

  const [building1Floors, setBuilding1Floors] = useState<Floor[]>([]);

  const [building1Rooms, setBuilding1Rooms] = useState<Room[]>([]);
  const [building2Rooms, setBuilding2Rooms] = useState<Room[]>([]);

  const [building1Code, setBuilding1Code] = useState<string | null>("");
  const [building2Code, setBuilding2Code] = useState<string | null>("");

  const typeInputRef = useRef<HTMLSelectElement>(null);
  const pickupUserNameInputRef = useRef<HTMLInputElement>(null);
  const pickupUserPhoneInputRef = useRef<HTMLInputElement>(null);
  const deliveryUserNameInputRef = useRef<HTMLInputElement>(null);
  const deliveryUserPhoneInputRef = useRef<HTMLInputElement>(null);

  const emergencyNameInputRef = useRef<HTMLInputElement>(null);
  const emergencyPhoneInputRef = useRef<HTMLInputElement>(null);

  const confirmationCodeInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);

  const itemsPerPage = 3;

  const handlePagination = (page: number) => {
    setPage(page);
  };

  async function handleCreate() {
    if (!typeInputRef.current) throw new Error("Type input is not defined");

    switch (typeInputRef.current.value) {
      case "pick_delivery":
        if (
          !pickupUserNameInputRef.current ||
          !pickupUserPhoneInputRef.current ||
          !deliveryUserNameInputRef.current ||
          !deliveryUserPhoneInputRef.current ||
          !building1Code ||
          !building2Code ||
          !confirmationCodeInputRef.current ||
          !descriptionInputRef.current
        )
          throw new Error("Some fields are not defined");

        /*await requestService.createPickupAndDeliveryRequest({
          pickupUser: {
            name: pickupUserNameInputRef.current.value,
            phone: pickupUserPhoneInputRef.current.value,
          },
          deliveryUser: {
            name: deliveryUserNameInputRef.current.value,
            phone: deliveryUserPhoneInputRef.current.value,
          },
          building1Code: building1Code,
          building2Code: building2Code,
          confirmationCode: confirmationCodeInputRef.current.value,
          description: descriptionInputRef.current.value,
        });*/
        break;
      case "surveillance":
        if (
          !emergencyNameInputRef.current ||
          !emergencyPhoneInputRef.current ||
          !building1Code ||
          !confirmationCodeInputRef.current ||
          !descriptionInputRef.current
        )
          throw new Error("Some fields are not defined");

        /*await requestService.createSurveillanceRequest({
          emergencyUser: {
            name: emergencyNameInputRef.current.value,
            phone: emergencyPhoneInputRef.current.value,
          },
          buildingCode: building1Code,
          confirmationCode: confirmationCodeInputRef.current.value,
          description: descriptionInputRef.current.value,
        });*/
        break;
    }
  }

  useEffect(() => {
    async function fetchBuildings() {
      const b = await buildingService.getBuildings();
      setBuildings(b.data);
    }

    fetchBuildings();
  }, [buildingService]);

  useEffect(() => {
    async function fetchFloors() {
      if (building1Code) {
        const floors = await floorService.getBuildingFloors(building1Code);
        setBuilding1Floors(floors);
      }
    }
    fetchFloors();
  }, [building1Code, floorService]);

  useEffect(() => {
    async function fetchRooms1() {
      if (building1Code) {
        const rooms = await roomService.getBuildingRooms(building1Code);
        setBuilding1Rooms(rooms);
      }
    }
    fetchRooms1();
  }, [building1Code, roomService]);

  useEffect(() => {
    async function fetchRooms2() {
      if (building2Code) {
        const rooms = await roomService.getBuildingRooms(building2Code);
        setBuilding2Rooms(rooms);
      }
    }
    fetchRooms2();
  }, [building2Code, roomService]);

  useEffect(() => {
    async function fetchRequests() {
      const r = await requestService.getAllRequests();
      console.log(r);
      setRequests(r);
    }

    fetchRequests();
  }, [requestService]);

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
  };
};
