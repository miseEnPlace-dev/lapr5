import Skeleton from "react-loading-skeleton";

import { RepeatIcon } from "@/styles/Icons";

import "react-loading-skeleton/dist/skeleton.css";

const Loading: React.FC = () => {
  return (
    <div className="mt-6 w-full pr-8">
      <h1 className="flex w-full items-center justify-center gap-x-6 text-center text-4xl font-bold">
        Loading...
        <RepeatIcon className="h-8 w-8 animate-spin" />
      </h1>
      <Skeleton className="mt-4 h-24 w-full" count={5} />
    </div>
  );
};

export default Loading;
