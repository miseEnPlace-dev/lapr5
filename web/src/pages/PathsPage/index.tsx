import React from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

import Button from "@/components/Button";
import Dropdown from "@/components/Dropdown";
import { ArrowLeftIcon } from "@/styles/Icons";

import { usePathsPageModule } from "./module";

const PathsPage: React.FC = () => {
  const navigate = useNavigate();

  const {
    buildings,
    building1Floors,
    building2Floors,
    building1Code,
    building2Code,
    setBuilding1Code,
    setBuilding2Code,
    floor1Code,
    floor2Code,
    setFloor1Code,
    setFloor2Code,
    setStrategy,
    strategies,
    strategy,
    loading,
    handleFind,
    path,
  } = usePathsPageModule();

  async function handleFindClick() {
    try {
      await handleFind();
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
        <h1 className="text-center text-4xl font-bold">Path Finder</h1>
      </div>

      <div className="flex h-full w-full flex-col gap-x-8 gap-y-12 md:flex-row">
        <main className="flex h-full w-full flex-col justify-between rounded-xl bg-slate-200 p-8">
          <div className="flex flex-col gap-y-6">
            <div className="flex items-center justify-between gap-x-8">
              <Dropdown
                name="Building 1"
                options={buildings}
                className="w-full"
                onChange={(e) => setBuilding1Code(e.target?.value)}
              />
              <Dropdown
                className="w-full"
                onChange={(e) => setBuilding2Code(e.target?.value)}
                name="Building 2"
                options={buildings}
              />
            </div>
            <div className="flex items-center justify-between gap-x-8">
              <Dropdown
                name="Floor 1"
                disabled={building1Code === ""}
                options={building1Floors.map((floor) => ({
                  code: floor.code,
                  name: floor.code,
                }))}
                className="w-full"
                onChange={(e) => setFloor1Code(e.target?.value)}
              />
              <Dropdown
                className="w-full"
                name="Floor 2"
                disabled={building2Code === ""}
                options={building2Floors.map((floor) => ({
                  code: floor.code,
                  name: floor.code,
                }))}
                onChange={(e) => setFloor2Code(e.target?.value)}
              />
            </div>
            <Dropdown
              className="w-full"
              onChange={(e) => setStrategy(e.target?.value)}
              name="Strategy"
              options={strategies}
            />
            <div className="flex items-center justify-center">
              {loading ? (
                <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-gray-900"></div>
              ) : (
                <div className="flex flex-col gap-y-4">
                  {path.map((p) => (
                    <div className="flex items-center gap-x-4">
                      <span className="text-2xl font-bold">{p}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <Button
            disabled={floor1Code === "" || floor2Code === "" || strategy === ""}
            type="confirm"
            onClick={handleFindClick}
            name="find"
          >
            Find Path
          </Button>
        </main>
      </div>
    </div>
  );
};

export default PathsPage;
