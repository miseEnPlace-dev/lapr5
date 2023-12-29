import { motion } from "framer-motion";
import swal from "sweetalert";

import { useMenuOptions } from "@/hooks/useMenuOptions";
import Button from "@/components/Button";
import Loading from "@/components/Loading";
import SideBar from "@/components/SideBar";

import { useModule } from "./module";

const TaskSequencePage: React.FC = () => {
  const { menuOptions } = useMenuOptions();
  const {
    requests,
    sanitizeTaskType,
    sanitizeDate,
    generateSequence,
    sequence,
    loading,
  } = useModule();

  const handleGeneratePath = () => {
    swal({
      title: "Are you sure?",
      text: "Once generated, the tasks will be executed in the order of the sequence.",
      icon: "warning",
      buttons: ["Cancel", "Generate"],
      dangerMode: true,
    }).then((willGenerate) => {
      if (willGenerate) {
        generateSequence();
        swal("Task Sequence generated!", {
          icon: "success",
          timer: 1500,
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

  return (
    <div className="flex">
      <SideBar menuOptions={menuOptions} />
      <main className="mt-12 flex h-full w-full flex-col gap-y-4 pl-12">
        <h1 className="text-4xl font-bold">Task Sequence</h1>
        <p className="text-slate-500">
          Check the task sequence for all the approved task requests.
        </p>
        <section className="my-8 flex flex-wrap items-center justify-around gap-x-8">
          {requests.map((request) => (
            <article
              className="relative flex w-full max-w-[320px] select-none flex-col rounded-lg border border-slate-200 px-12 py-8 hover:brightness-90"
              key={request.id}
            >
              <h2 className="text-2xl font-bold">
                {request.user.firstName} {request.user.lastName}
              </h2>
              <span className="absolute right-2 top-2 text-slate-600">
                {sanitizeDate(request.requestedAt)}
              </span>
              <h2 className="text-base">
                Type: {sanitizeTaskType(request.type)}
              </h2>
              <p className="mt-4 text-sm text-slate-600">
                Details: {request.description}
              </p>
            </article>
          ))}
        </section>
        <div className="flex w-full items-center justify-center">
          <Button name="generate" type="confirm" onClick={handleGeneratePath}>
            Generate Task Sequence
          </Button>
        </div>
        {loading && <Loading />}
        {sequence && (
          <section className="mt-6 flex w-full flex-col items-center gap-y-8 pr-12">
            {sequence.tasks.map((request, i) => (
              <motion.article
                key={request.id}
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 * i }}
                className="flex h-28 w-full items-center justify-between rounded-lg bg-slate-100 px-8"
              >
                <div className="flex items-center">
                  <h2 className="text-5xl font-bold">#{i + 1}</h2>
                  <div className="ml-8 flex flex-col">
                    <span className="text-base font-bold">
                      From: {request.startCoordinateX} x{" "}
                      {request.startCoordinateY}
                    </span>
                    <span className="text-base font-bold">
                      To: {request.endCoordinateX} x {request.endCoordinateY}
                    </span>
                    <p className="mt-4 text-base text-slate-600">
                      Details: {request.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-x-4">
                  <Button type="reset" name="animation">
                    Go to Animation
                  </Button>
                  <Button type="confirm" name="execute">
                    Execute
                  </Button>
                </div>
              </motion.article>
            ))}
            <Button
              name="execute-all"
              type="destroy"
              onClick={handleGeneratePath}
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
