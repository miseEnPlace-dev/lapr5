import { useState } from "react";
import { motion } from "framer-motion";

import { useMenuOptions } from "@/hooks/useMenuOptions";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import SideBar from "@/components/SideBar";
import { RequestPickAndDelivery } from "@/model/RequestPickAndDelivery.ts";
import { RequestSurveillance } from "@/model/RequestSurveillance.ts";
import { CheckIcon, FilterIcon } from "@/styles/Icons.ts";
import { formatDate } from "@/utils/formatDate.ts";

import { useListTaskRequestsModule } from "./module.ts";

const ANIMATION_DELAY = 0.1;

const TaskRequestsPage: React.FC = () => {
  const {
    requests,
    stateFilter,
    handleAcceptRequest,
    handleRejectRequest,
    page,
    setPage,
    itemsPerPage,
    handlePagination,
  } = useListTaskRequestsModule();

  const [isTaskModalVisible, setIsTaskModalVisible] = useState(false);
  const [isFilterByStateModalVisible, setIsFilterByStateModalVisible] =
    useState(false);

  const { menuOptions } = useMenuOptions();

  return (
    <div className="flex">
      <SideBar menuOptions={menuOptions} />
      <main className="mt-12 flex h-full w-full flex-col gap-y-4 pl-12">
        <h1 className="text-4xl font-bold">Task Requests</h1>
        <p className="text-slate-500">
          Manage here all task requests from system.
        </p>
        <div
          aria-label="tasks-container"
          className="mr-12 mt-8 flex flex-col justify-between gap-y-6 text-left text-lg"
        >
          <div className="flex flex-row gap-x-4">
            <motion.button
              name="filterByTask"
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.2,
                delay: requests?.data.length || 0 * ANIMATION_DELAY,
              }}
              onClick={() => setIsFilterByStateModalVisible(true)}
              className={`flex w-full items-center justify-center gap-x-10 ${
                stateFilter ? "bg-slate-400" : "bg-slate-300"
              } py-4 text-gray-500`}
            >
              <div className="flex flex-row items-center gap-x-4 text-lg font-bold text-slate-600">
                {stateFilter ? <FilterIcon /> : ""}
                Filter Requests By State
              </div>
            </motion.button>
          </div>
          <motion.button
            name="create-task"
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.2,
              delay: requests?.data.length || 0 * ANIMATION_DELAY,
            }}
            onClick={() => setIsTaskModalVisible(true)}
            className="flex w-full items-center justify-center bg-secondary px-12 py-4 text-center text-5xl font-bold"
          >
            +
          </motion.button>
          {!requests ? null : requests.data.length == 0 ? ( // TODO: skeleton component // TODO: skeleton component
            <p className="text-slate-500">
              No results were found for your search... Create your first request
              or try to change or remove the filters.
            </p>
          ) : (
            requests.data.map((request, i) => (
              <motion.button
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: ANIMATION_DELAY * i }}
                key={i}
                //onClick={() => navigate(`/requests/${request.id}`)}
                className="w-full items-center bg-slate-200 px-12 py-8"
              >
                {request.type == "surveillance" ? (
                  <div className="flex gap-x-10">
                    <h3 className="text-4xl font-bold capitalize">
                      Floor {(request as RequestSurveillance).floorId}
                    </h3>
                    <div className="flex flex-col text-start text-base text-slate-500">
                      <div className="font-bold uppercase">
                        Surveillance &nbsp;&middot;&nbsp;&nbsp;
                        {request.requestedAt && formatDate(request.requestedAt)}
                        &nbsp;&nbsp;&middot;&nbsp;&nbsp;
                        <span className="text-yellow-800">{request.state}</span>
                      </div>
                      <div className="text-sm">{request.description}</div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="mb-4 flex gap-x-10">
                      <h3 className="text-4xl font-bold">
                        {(request as RequestPickAndDelivery).pickupRoomId}&nbsp;
                        to &nbsp;
                        {(request as RequestPickAndDelivery).deliveryRoomId}
                      </h3>
                      <div className="flex flex-col text-start text-slate-500">
                        <div className="text-base font-bold uppercase">
                          Pick and Delivery &nbsp;&middot;&nbsp;&nbsp;
                          {request.requestedAt &&
                            formatDate(request.requestedAt)}
                          &nbsp;&nbsp;&middot;&nbsp;&nbsp;
                          <span className="text-yellow-800">
                            {request.state}
                          </span>
                        </div>
                        <div className="text-sm">{request.description}</div>
                      </div>
                    </div>
                    <div className="text-start text-slate-600">
                      <div className="text-sm">
                        From{" "}
                        <span className="font-bold">
                          {(request as RequestPickAndDelivery).pickupUserName}
                        </span>{" "}
                        (
                        {
                          (request as RequestPickAndDelivery)
                            .pickupUserPhoneNumber
                        }
                        ) to{" "}
                        <span className="font-bold">
                          {(request as RequestPickAndDelivery).deliveryUserName}
                        </span>{" "}
                        (
                        {
                          (request as RequestPickAndDelivery)
                            .deliveryUserPhoneNumber
                        }
                        )
                      </div>
                      <div className="text-sm">
                        Confirmation Code:{" "}
                        <span className="font-bold">
                          {(request as RequestPickAndDelivery).confirmationCode}
                        </span>
                      </div>
                    </div>
                  </>
                )}
                <div className="right-16 flex items-center gap-x-6">
                  {request.state === "Pending" ? (
                    <>
                      <Button
                        className="relative h-12 w-12 items-center justify-center"
                        name="confirm"
                        type="confirm"
                        onClick={() => handleAcceptRequest(request.id || "")}
                      >
                        <CheckIcon className="absolute left-1/2 top-1/2 z-10 h-6 w-6 flex-1 -translate-x-1/2 -translate-y-1/2" />
                      </Button>
                      <Button
                        className="flex h-12 w-12 items-center justify-center text-center font-semibold"
                        name="delete"
                        type="destroy"
                        onClick={() => handleRejectRequest(request.id || "")}
                      >
                        X
                      </Button>
                    </>
                  ) : null}
                </div>
              </motion.button>
            ))
          )}
        </div>
      </main>{" "}
    </div>
  );
};

export default TaskRequestsPage;
