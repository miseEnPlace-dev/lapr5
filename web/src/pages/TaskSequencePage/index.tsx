import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import swal from "sweetalert";

import { useMenuOptions } from "@/hooks/useMenuOptions";
import Button from "@/components/Button";
import Loading from "@/components/Loading";
import SideBar from "@/components/SideBar";

import { useModule } from "./module";

const TaskSequencePage: React.FC = () => {
  const { menuOptions } = useMenuOptions();
  const {
    tasks,
    sanitizeTaskType,
    sanitizeDate,
    generateSequence,
    sequence,
    loading,
    executeTask,
    executing,
    executeAll,
  } = useModule();

  const handleGeneratePath = () => {
    swal({
      title: "Are you sure?",
      text: "This action may take a while to complete.",
      icon: "warning",
      buttons: ["Cancel", "Generate"],
      dangerMode: true,
    }).then((willGenerate) => {
      if (willGenerate) {
        generateSequence();
        swal("Task Sequence generated!", {
          icon: "success",
          timer: 1000,
        });
      } else {
        swal({
          title: "Task Sequence not generated!",
          icon: "info",
          timer: 1500,
        });
      }
    });
  };

  const handleExecuteTask = (taskId: string) => {
    swal({
      title: "Are you sure?",
      text: "Once executed, the task will be marked as completed.",
      icon: "warning",
      buttons: ["Cancel", "Execute"],
      dangerMode: true,
    }).then((willExecute) => {
      if (willExecute) {
        swal("Task executed!", {
          icon: "success",
          timer: 250,
        });
        executeTask(taskId);
      } else {
        swal({
          title: "Task not executed!",
          icon: "info",
          timer: 1500,
        });
      }
    });
  };

  const handleExecuteAll = () => {
    swal({
      title: "Are you sure?",
      text: "Once executed, all tasks will be marked as completed.",
      icon: "warning",
      buttons: ["Cancel", "Execute"],
      dangerMode: true,
    }).then((willExecute) => {
      if (willExecute) {
        swal("All tasks executed!", {
          icon: "success",
          timer: 250,
        });
        executeAll();
      } else {
        swal({
          title: "Tasks not executed!",
          icon: "info",
          timer: 1500,
        });
      }
    });
  };

  const handleGoToAnimation = (
    route: [
      | {
          floor: string;
          x: number;
          y: number;
        }
      | {
          floor1: string;
          floor2: string;
          type: string;
        },
    ]
  ) => {
    console.log("route ", route);
  };

  return (
    <div className="flex">
      <SideBar menuOptions={menuOptions} />
      <main className="my-12 flex h-full w-full flex-col gap-y-4 pl-12">
        <h1 className="text-4xl font-bold">Task Sequence</h1>
        <p className="text-slate-500">
          Check the task sequence for all the approved task requests.
        </p>
        <section className="my-8 flex flex-wrap items-center justify-around gap-x-8">
          {tasks ? (
            tasks.map((task) => (
              <article
                className="relative flex w-full max-w-[320px] select-none flex-col rounded-lg border border-slate-200 px-12 py-8 hover:brightness-90"
                key={task.id}
              >
                <h2 className="text-2xl font-bold">
                  {task.user.firstName} {task.user.lastName}
                </h2>
                <span className="absolute right-2 top-2 text-slate-600">
                  {sanitizeDate(task.createdAt)}
                </span>
                <h2 className="text-base">
                  Type: {sanitizeTaskType(task.type)}
                </h2>
                <p className="mt-4 text-sm text-slate-600">
                  Details: {task.description}
                </p>
              </article>
            ))
          ) : (
            <div className="flex w-full flex-col items-center justify-center gap-y-2">
              <p className="text-2xl">
                There are no approved tasks to generate a valid sequence...
              </p>

              <span className="text-slate-600">
                Try to{" "}
                <Link className="underline" to="/task-requests">
                  go back
                </Link>{" "}
                and approve some tasks first.
              </span>
            </div>
          )}
        </section>
        {tasks.length > 0 ? (
          <div className="flex w-full items-center justify-center">
            <Button name="generate" type="confirm" onClick={handleGeneratePath}>
              Generate Task Sequence
            </Button>
          </div>
        ) : (
          <div className="flex w-full flex-col items-center justify-center gap-y-2">
            <p className="text-2xl">
              There are no approved tasks to generate a valid sequence...
            </p>

            <span className="text-slate-600">
              Try to{" "}
              <Link className="underline" to="/task-requests">
                go back
              </Link>{" "}
              and approve some tasks first.
            </span>
          </div>
        )}
        {loading && <Loading />}
        {sequence && (
          <section className="my-6 flex w-full flex-col items-center gap-y-8 pr-12">
            {sequence.tasks.map((task, i) => (
              <motion.article
                key={task.id}
                initial={{
                  opacity: 0,
                  x: -100,
                  y: 0,
                }}
                animate={{
                  opacity: executing === task.id ? 0 : 1,
                  x: 0,
                  y: executing === task.id ? -20 : 0,
                }}
                transition={{
                  x: { duration: 0.2 * i },
                  y: { duration: 0.4, delay: 2 },
                  opacity: {
                    duration: 0.4,
                    delay: executing === task.id ? 2 : 0,
                  },
                }}
                className="flex h-28 w-full items-center justify-between rounded-lg bg-slate-100 px-8"
              >
                <div className="flex items-center">
                  <h2 className="text-5xl font-bold">#{i + 1}</h2>
                  <div className="ml-8 flex flex-col">
                    <span className="text-base capitalize">
                      <b>From</b> {task.startFloorCode}: {task.startCoordinateX}
                      , {task.startCoordinateY}
                    </span>
                    <span className="text-base capitalize">
                      <b>To</b> {task.endFloorCode}: {task.endCoordinateX},{" "}
                      {task.endCoordinateY}{" "}
                    </span>
                    <p className="mt-4 text-base text-slate-600">
                      Details: {task.description}
                    </p>
                  </div>
                </div>
                {executing === task.id && (
                  <div className="h-2 w-64">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2 }}
                      className="h-full rounded-lg bg-green-500"
                    />
                  </div>
                )}
                <div className="flex items-center gap-x-4">
                  <Button
                    type="reset"
                    name="animation"
                    onClick={() => handleGoToAnimation(sequence.path[task.id])}
                  >
                    Go to Animation
                  </Button>
                  <Button
                    type="confirm"
                    name="execute"
                    onClick={() => handleExecuteTask(task.id)}
                  >
                    Execute
                  </Button>
                </div>
              </motion.article>
            ))}
            <Button
              name="execute-all"
              type="destroy"
              onClick={handleExecuteAll}
              className="px-24"
            >
              Execute All
            </Button>
          </section>
        )}
      </main>
    </div>
  );
};

export default TaskSequencePage;
