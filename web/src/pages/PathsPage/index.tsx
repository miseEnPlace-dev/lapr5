/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

import Button from "@/components/Button";
import Dropdown from "@/components/Dropdown";
import FloorMapVisualizer from "@/components/FloorMapVisualizer";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
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
    setMapModelOpen,
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
    fromCoords,
    setFromCoords,
    setToCoords,
    toCoords,
    activeMap,
    mapModelOpen,
    handleMapShow,
  } = usePathsPageModule();

  async function handleFindClick() {
    try {
      await handleFind();
    } catch (err: unknown) {
      swal("Error", (err as { message: string }).message, "error");
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
              <div className="flex w-full flex-col">
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
                <span
                  className={`-mb-4 ml-2 mt-1 w-max text-slate-600 underline hover:cursor-pointer hover:brightness-50 ${
                    floor1Code ? "visible" : "invisible"
                  }`}
                  onClick={() => handleMapShow(building1Code, floor1Code)}
                >
                  Check floor map
                </span>
              </div>
              <div className="flex w-full flex-col">
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
                <span
                  className={`-mb-4 ml-2 mt-1 w-max text-slate-600 underline hover:cursor-pointer hover:brightness-50 ${
                    floor2Code ? "visible" : "invisible"
                  }`}
                  onClick={() => handleMapShow(building2Code, floor2Code)}
                >
                  Check floor map
                </span>
              </div>
              <Modal
                setIsVisible={setMapModelOpen}
                title="Floor Map"
                isVisible={mapModelOpen}
                className="w-11/12"
              >
                <FloorMapVisualizer map={activeMap} />
              </Modal>
            </div>
            <div className="flex items-center justify-between gap-x-8">
              <div className="flex w-full items-center justify-between gap-x-8">
                <Input
                  className="w-full"
                  placeholder="X"
                  name="From X"
                  disabled={floor1Code === ""}
                  type="number"
                  value={fromCoords?.x.toString()}
                  onChange={(value) =>
                    setFromCoords({ ...fromCoords, x: +value })
                  }
                />
                <Input
                  className="w-full"
                  disabled={floor1Code === ""}
                  placeholder="Y"
                  name="From Y"
                  type="number"
                  value={fromCoords?.y.toString()}
                  onChange={(value) =>
                    setFromCoords({ ...fromCoords, y: +value })
                  }
                />
              </div>
              <div className="flex w-full items-center justify-between gap-x-8">
                <Input
                  className="w-full"
                  placeholder="X"
                  name="To X"
                  type="number"
                  disabled={floor2Code === ""}
                  value={toCoords?.x.toString()}
                  onChange={(value) => setToCoords({ ...toCoords, x: +value })}
                />
                <Input
                  className="w-full"
                  placeholder="Y"
                  disabled={floor2Code === ""}
                  type="number"
                  name="To Y"
                  value={toCoords?.y.toString()}
                  onChange={(value) => setToCoords({ ...toCoords, y: +value })}
                />
              </div>
            </div>
            <Dropdown
              className="w-full"
              onChange={(e) => setStrategy(e.target?.value)}
              name="Strategy"
              options={strategies}
            />
            <div className="flex items-center justify-center">
              {loading || !path ? (
                <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-gray-900"></div>
              ) : (
                <div className="mt-4 h-96 w-full overflow-y-scroll">
                  <table className="w-full table-auto overflow-scroll">
                    <thead>
                      <tr className="bg-secondary">
                        <th className="w-24 text-2xl font-bold">X</th>
                        <th className="w-24 text-2xl font-bold">Y</th>
                        <th className="w-24 text-2xl font-bold">Floor</th>
                      </tr>
                    </thead>
                    <tbody className="text-center">
                      {path.map((p: any) => (
                        <>
                          {p.x ? (
                            <tr>
                              <td className="py-1 text-2xl font-bold">{p.x}</td>
                              <td className="py-1 text-2xl font-bold">{p.y}</td>
                              <td className="py-1 text-2xl font-bold">
                                {p.floor}
                              </td>
                            </tr>
                          ) : (
                            <tr>
                              <td
                                colSpan={3}
                                className="py-1 text-2xl font-bold"
                              >{`Use ${p.type} from ${p.floor1} to ${p.floor2}`}</td>
                            </tr>
                          )}
                        </>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
          <Button
            disabled={
              floor1Code === "" ||
              floor2Code === "" ||
              strategy === "" ||
              loading ||
              !fromCoords ||
              !toCoords
            }
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
