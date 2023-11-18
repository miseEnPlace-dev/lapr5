import { useEffect } from "react";
import * as THREE from "three";

import "./index.css";

import Orientation from "./orientation";
import ThumbRaiser from "./thumb_raiser";

const maps = [
  "building-d-floor-1.json",
  "building-c-floor-1.json",
  "building-d-floor-2.json",
  "Loquitas_5x5.json",
  "Loquitas_10x10.json",
  "Loquitas_20x20.json",
];

const FloorEditor: React.FC = () => {
  useEffect(() => {
    let thumbRaiser: ThumbRaiser;

    function initialize() {
      // Initialize the game
      thumbRaiser = new ThumbRaiser(
        {}, // General Parameters
        {
          enabled: true,
          introductionClips: [
            {
              url: "./clips/el-gringo-12613.mp3",
              position: "initial", // Global (non-positional) audio object: ""; positional audio object: "scene x y z" (scene specific position in cartesian coordinates), "maze line column" (maze specific position in cell coordinates), "exit" (maze exit location), "initial" (player initial position), "player" (player current position), "spotlight" (spotlight current position)
              referenceDistance: 1.0,
              loop: false,
              volume: 0.5,
            },
          ],
          idleClips: [
            {
              url: "./clips/Clearing-Throat-Moderate-Speed-www.fesliyanstudios.com.mp3",
              position: "player",
              referenceDistance: 1.0,
              loop: false,
              volume: 0.75,
            },
            {
              url: "./clips/Small-Double-Cough-1-www.fesliyanstudios.com.mp3",
              position: "player",
              referenceDistance: 1.0,
              loop: false,
              volume: 0.75,
            },
            {
              url: "./clips/Yawn-A2-www.fesliyanstudios.com.mp3",
              position: "player",
              referenceDistance: 1.0,
              loop: false,
              volume: 0.75,
            },
          ],
          jumpClips: [
            {
              url: "./clips/Cheering-A6-www.fesliyanstudios.com.mp3",
              position: "player",
              referenceDistance: 1.0,
              loop: false,
              volume: 0.75,
            },
            {
              url: "./clips/Cheering-A7-www.fesliyanstudios.com.mp3",
              position: "player",
              referenceDistance: 1.0,
              loop: false,
              volume: 0.75,
            },
          ],
          deathClips: [
            {
              url: "./clips/176653326.mp3",
              position: "player",
              referenceDistance: 1.0,
              loop: false,
              volume: 0.75,
            },
            {
              url: "./clips/Horn+Squeeze+Clown.mp3",
              position: "player",
              referenceDistance: 1.0,
              loop: false,
              volume: 0.75,
            },
          ],
          danceClips: [
            {
              url: "./clips/best-buddies-12609.mp3",
              position: "exit",
              referenceDistance: 1.0,
              loop: true,
              volume: 0.5,
            },
          ],
          endClips: [
            {
              url: "./clips/Ba-Bum-Tss-Joke-Drum-A1-www.fesliyanstudios.com.mp3",
              position: "exit",
              referenceDistance: 1.0,
              loop: false,
              volume: 2.0,
            },
            {
              url: "./clips/yay-6326.mp3",
              position: "exit",
              referenceDistance: 1.0,
              loop: false,
              volume: 0.75,
            },
            {
              url: "./clips/crowd-cheer-ii-6263.mp3",
              position: "exit",
              referenceDistance: 1.0,
              loop: false,
              volume: 0.75,
            },
          ],
          credits:
            "Sound clips downloaded from <a href='https://www.dreamstime.com/' target='_blank' rel='noopener'>Dreamstime</a>, <a href='https://www.fesliyanstudios.com/' target='_blank' rel='noopener'>Fesliyan Studios</a> and <a href='https://pixabay.com/' target='_blank' rel='noopener'>Pixabay</a>.",
        }, // Audio parameters
        {
          skyboxes: [
            {
              // Stormy days
              name: "Stormy days",
              texturePath: "./cube_textures/envmap_stormydays/",
              texturePositiveXUrl: "stormydays_ft.jpg",
              textureNegativeXUrl: "stormydays_bk.jpg",
              texturePositiveYUrl: "stormydays_up.jpg",
              textureNegativeYUrl: "stormydays_dn.jpg",
              texturePositiveZUrl: "stormydays_rt.jpg",
              textureNegativeZUrl: "stormydays_lf.jpg",
              credits:
                "Skybox created by <a href='https://opengameart.org/content/stormy-days-skybox' target='_blank' rel='noopener'>Jockum Skoglund (hipshot)</a>.",
            },
            {
              // Miramar
              name: "Miramar",
              texturePath: "./cube_textures/red-eclipse-skyboxes/skyboxes/",
              texturePositiveXUrl: "miramar_ft.jpg",
              textureNegativeXUrl: "miramar_bk.jpg",
              texturePositiveYUrl: "miramar_up.jpg",
              textureNegativeYUrl: "miramar_dn.jpg",
              texturePositiveZUrl: "miramar_rt.jpg",
              textureNegativeZUrl: "miramar_lf.jpg",
              credits:
                "Skybox created by <a href='https://opengameart.org/content/red-eclipse-skyboxes' target='_blank' rel='noopener'>Red Eclipse</a>.",
            },
            {
              // Flat sunset
              name: "Flat sunset",
              texturePath: "./cube_textures/red-eclipse-skyboxes/skyboxes/",
              texturePositiveXUrl: "sunsetflat_ft.jpg",
              textureNegativeXUrl: "sunsetflat_bk.jpg",
              texturePositiveYUrl: "sunsetflat_up.jpg",
              textureNegativeYUrl: "sunsetflat_dn.jpg",
              texturePositiveZUrl: "sunsetflat_rt.jpg",
              textureNegativeZUrl: "sunsetflat_lf.jpg",
              credits:
                "Skybox created by <a href='https://opengameart.org/content/red-eclipse-skyboxes' target='_blank' rel='noopener'>Red Eclipse</a>.",
            },
            {
              // Calm sea
              name: "Calm sea",
              texturePath:
                "./cube_textures/xonotic-skyboxes/skyboxes/calm_sea/",
              texturePositiveXUrl: "calm_sea_ft.jpg",
              textureNegativeXUrl: "calm_sea_bk.jpg",
              texturePositiveYUrl: "calm_sea_up.jpg",
              textureNegativeYUrl: "calm_sea_dn.jpg",
              texturePositiveZUrl: "calm_sea_rt.jpg",
              textureNegativeZUrl: "calm_sea_lf.jpg",
              credits:
                "Skybox created by <a href='https://opengameart.org/content/xonotic-skyboxes' target='_blank' rel='noopener'>Xonotic</a>.",
            },
            {
              // Distant sunset
              name: "Distant sunset",
              texturePath:
                "./cube_textures/xonotic-skyboxes/skyboxes/distant_sunset/",
              texturePositiveXUrl: "distant_sunset_ft.jpg",
              textureNegativeXUrl: "distant_sunset_bk.jpg",
              texturePositiveYUrl: "distant_sunset_up.jpg",
              textureNegativeYUrl: "distant_sunset_dn.jpg",
              texturePositiveZUrl: "distant_sunset_rt.jpg",
              textureNegativeZUrl: "distant_sunset_lf.jpg",
              credits:
                "Skybox created by <a href='https://opengameart.org/content/xonotic-skyboxes' target='_blank' rel='noopener'>Xonotic</a>.",
            },
            {
              // Exosystem
              name: "Exosystem",
              texturePath:
                "./cube_textures/xonotic-skyboxes/skyboxes/exosystem/",
              texturePositiveXUrl: "exosystem_ft.jpg",
              textureNegativeXUrl: "exosystem_bk.jpg",
              texturePositiveYUrl: "exosystem_up.jpg",
              textureNegativeYUrl: "exosystem_dn.jpg",
              texturePositiveZUrl: "exosystem_rt.jpg",
              textureNegativeZUrl: "exosystem_lf.jpg",
              credits:
                "Skybox created by <a href='https://opengameart.org/content/xonotic-skyboxes' target='_blank' rel='noopener'>Xonotic</a>.",
            },
            {
              // Heaven
              name: "Heaven",
              texturePath: "./cube_textures/xonotic-skyboxes/skyboxes/heaven/",
              texturePositiveXUrl: "heaven_ft.jpg",
              textureNegativeXUrl: "heaven_bk.jpg",
              texturePositiveYUrl: "heaven_up.jpg",
              textureNegativeYUrl: "heaven_dn.jpg",
              texturePositiveZUrl: "heaven_rt.jpg",
              textureNegativeZUrl: "heaven_lf.jpg",
              credits:
                "Skybox created by <a href='https://opengameart.org/content/xonotic-skyboxes' target='_blank' rel='noopener'>Xonotic</a>.",
            },
          ],
          selected: 1,
        }, // Cube texture parameters
        {
          mazes: maps.map((map) => ({
            name: map,
            url: "./mazes/" + map,
            designCredits:
              "Maze designed by <a href='https://www.123rf.com/profile_ckarzx' target='_blank' rel='noopener'>ckarzx</a>.",
            texturesCredits:
              "Maze textures downloaded from <a href='https://www.texturecan.com/' target='_blank' rel='noopener'>TextureCan</a>.",
            helpersColor: new THREE.Color(0xff0077),
          })),
          selected: 0,
        }, // Maze parameters
        { helpersColor: new THREE.Color(0x0055ff) }, // Player parameters
        {
          intensity: 0.1,
        }, // Ambient light parameters
        {
          intensity: 0.5,
          distance: 20.0,
          orientation: new Orientation(-38.7, 53.1),
          castShadow: true,
          shadow: {
            mapSize: new THREE.Vector2(2048, 2048),
            camera: {
              left: -20.0,
              right: 20.0,
              top: 20.0,
              bottom: -20.0,
              near: 0.0,
              far: 40.0,
            },
          },
        }, // Directional light parameters
        {
          visible: false,
          intensity: 90.0,
          distance: 40.0,
          angle: 4.0,
          position: new THREE.Vector3(0.0, 10.0, 0.0),
          castShadow: true,
          shadow: {
            camera: {
              near: 5.0,
              far: 30.0,
            },
          },
        }, // Spotlight parameters
        {
          color: new THREE.Color(0xffffa0),
          visible: false,
          intensity: 2.0,
          distance: 5.0,
          angle: 20.0,
          orientation: new Orientation(0.0, -20.0),
          castShadow: true,
          shadow: {
            camera: {
              near: 0.01,
              far: 10.0,
            },
          },
        }, // Flashlight parameters
        { type: THREE.PCFSoftShadowMap }, // Shadows parameters
        {}, // Fog parameters
        {}, // Collision detection parameters
        {
          view: "fixed",
          initialViewport: new THREE.Vector4(0.0, 1.0, 0.45, 0.5),
          initialDistance: 16.0,
          distanceMin: 8.0,
          distanceMax: 32.0,
          initialFogDensity: 0.05,
        }, // Fixed view camera parameters
        {
          view: "first-person",
          initialViewport: new THREE.Vector4(1.0, 1.0, 0.55, 0.5),
          initialOrientation: new Orientation(0.0, -10.0),
          orientationMax: new Orientation(180.0, 90.0),
          initialFogDensity: 0.7,
        }, // First-person view camera parameters
        {
          view: "third-person",
          initialViewport: new THREE.Vector4(0.0, 0.0, 0.55, 0.5),
          initialOrientation: new Orientation(0.0, -20.0),
          initialDistance: 2.0,
          distanceMin: 1.0,
          distanceMax: 4.0,
          initialFogDensity: 0.3,
        }, // Third-person view camera parameters
        {
          view: "top",
          initialViewport: new THREE.Vector4(1.0, 0.0, 0.45, 0.5),
          initialOrientation: new Orientation(0.0, -90.0),
          initialDistance: 4.0,
          distanceMin: 1.0,
          distanceMax: 16.0,
          initialFogDensity: 0.2,
        }, // Top view camera parameters
        {
          view: "mini-map",
          initialViewport: new THREE.Vector4(0.5, 0.5, 0.4, 0.4),
          initialOrientation: new Orientation(180.0, -90.0),
          initialZoom: 0.32,
          zoomMin: 0.32,
          zoomMax: 2.56,
        } // Mini-map view camera parameters
      );
    }

    function animate() {
      requestAnimationFrame(animate);
      // Update the game
      thumbRaiser.update();
    }

    initialize();
    animate();
  }, []);

  return (
    <>
      <div id="container">
        <div id="views-panel">
          <table className="views">
            <tbody>
              <tr>
                <td>
                  View:
                  <select id="view">
                    <option value="fixed">Fixed</option>
                    <option value="first">First-person</option>
                    <option value="third">Third-person</option>
                    <option value="top">Top</option>
                  </select>
                </td>
                <td>
                  Orientation (h):
                  <input type="number" id="horizontal" required />
                </td>
                <td>
                  Orientation (v):
                  <input type="number" id="vertical" required />
                </td>
                <td>
                  <input type="button" id="reset" value="Reset view" />
                </td>
              </tr>
              <tr>
                <td>
                  Projection:
                  <select id="projection">
                    <option value="perspective">Perspective</option>
                    <option value="orthographic">Orthographic</option>
                  </select>
                </td>
                <td>
                  Distance:
                  <input type="number" id="distance" required />
                </td>
                <td>
                  Zoom:
                  <input type="number" id="zoom" required />
                </td>
                <td>
                  <input type="button" id="reset-all" value="Reset all views" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div id="maps-panel">
          <table className="views">
            <tbody>
              <tr>
                <td>
                  Map:
                  <select id="maze">
                    {maps.map((map, i) => (
                      <option key={map} value={i}>
                        {map}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div id="mouse-help-panel">
          <table className="mouse-help" id="mouse-help-table">
            <thead>
              <tr>
                <th colSpan={5} style={{ fontSize: "2.0vmin" }}>
                  Help - Mouse
                </th>
              </tr>
              <tr>
                <th>View</th>
                <th>Primary button</th>
                <th>Secondary button</th>
                <th>Shift-wheel</th>
                <th>Wheel</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Fixed</td>
                <td>Drag / resize</td>
                <td>Orbit</td>
                <td>Dolly</td>
                <td>Zoom</td>
              </tr>
              <tr>
                <td>First-person</td>
                <td>Drag / resize</td>
                <td>Orbit</td>
                <td>n/a</td>
                <td>Zoom</td>
              </tr>
              <tr>
                <td>Third-person</td>
                <td>Drag / resize</td>
                <td>Orbit</td>
                <td>Dolly</td>
                <td>Zoom</td>
              </tr>
              <tr>
                <td>Top</td>
                <td>Drag / resize</td>
                <td>Orbit</td>
                <td>Dolly</td>
                <td>Zoom</td>
              </tr>
              <tr>
                <td>Mini-map</td>
                <td>Drag / resize</td>
                <td>Pan</td>
                <td>n/a</td>
                <td>Zoom</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div id="keyboard-help-panel">
          <table className="keyboard-help" id="keyboard-help-table">
            <thead>
              <tr>
                <th colSpan={2} style={{ fontSize: "2.0vmin" }}>
                  Help - Keyboard
                </th>
              </tr>
              <tr>
                <th colSpan={2} style={{ textAlign: "left" }}>
                  Set view mode
                </th>
              </tr>
              <tr>
                <td></td>
                <td>Stabilized view mode / realistic view mode</td>
              </tr>
              <tr>
                <th colSpan={2} style={{ textAlign: "left" }}>
                  Display / select / hide views
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td>Fixed view</td>
              </tr>
              <tr>
                <td></td>
                <td>First-person view</td>
              </tr>
              <tr>
                <td></td>
                <td>Third-person view</td>
              </tr>
              <tr>
                <td></td>
                <td>Top view</td>
              </tr>
              <tr>
                <th colSpan={2} style={{ textAlign: "left" }}>
                  Display / hide subwindows and bounding volumes
                </th>
              </tr>
              <tr>
                <td></td>
                <td>Mini-map</td>
              </tr>
              <tr>
                <td></td>
                <td>Statistics</td>
              </tr>
              <tr>
                <td></td>
                <td>User interface</td>
              </tr>
              <tr>
                <td></td>
                <td>Help and credits</td>
              </tr>
              <tr>
                <td></td>
                <td>Bounding volumes</td>
              </tr>
              <tr>
                <th colSpan={2} style={{ textAlign: "left" }}>
                  Turn on / off lights, shadows and fog
                </th>
              </tr>
              <tr>
                <td></td>
                <td>Ambient light</td>
              </tr>
              <tr>
                <td></td>
                <td>Directional light</td>
              </tr>
              <tr>
                <td></td>
                <td>Spotlight</td>
              </tr>
              <tr>
                <td></td>
                <td>Flashlight</td>
              </tr>
              <tr>
                <td></td>
                <td>Shadows</td>
              </tr>
              <tr>
                <td></td>
                <td>Fog</td>
              </tr>
              <tr>
                <th colSpan={2} style={{ textAlign: "left" }}>
                  Move character
                </th>
              </tr>
              <tr>
                <td></td>
                <td>Turn left slowly / quickly (with shift key)</td>
              </tr>
              <tr>
                <td></td>
                <td>Turn right slowly / quickly (with shift key)</td>
              </tr>
              <tr>
                <td></td>
                <td>Walk / run (with shift key) backward</td>
              </tr>
              <tr>
                <td></td>
                <td>Walk / run (with shift key) forward</td>
              </tr>
              <tr>
                <th colSpan={2} style={{ textAlign: "left" }}>
                  Emote character
                </th>
              </tr>
              <tr>
                <td></td>
                <td>Jump</td>
              </tr>
              <tr>
                <td></td>
                <td>Yes</td>
              </tr>
              <tr>
                <td></td>
                <td>No</td>
              </tr>
              <tr>
                <td></td>
                <td>Wave</td>
              </tr>
              <tr>
                <td></td>
                <td>Punch</td>
              </tr>
              <tr>
                <td></td>
                <td>Thumbs up</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div id="credits-panel">
          <table className="credits" id="credits-table">
            <thead>
              <tr>
                <th style={{ fontSize: "2.0vmin" }}>Credits</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div id="subwindows-panel">
          <table className="subwindows">
            <tbody>
              <tr>
                <td>
                  Realistic view mode:
                  <input type="checkbox" id="realistic" />
                </td>
              </tr>
              <tr>
                <td>
                  Fixed view:
                  <input type="checkbox" id="fixed" />
                </td>
              </tr>
              <tr>
                <td>
                  First-person view:
                  <input type="checkbox" id="first-person" />
                </td>
              </tr>
              <tr>
                <td>
                  Third-person view:
                  <input type="checkbox" id="third-person" />
                </td>
              </tr>
              <tr>
                <td>
                  Top view:
                  <input type="checkbox" id="top" />
                </td>
              </tr>
              <tr>
                <td>
                  Mini-map:
                  <input type="checkbox" id="mini-map" />
                </td>
              </tr>
              <tr>
                <td>
                  Statistics:
                  <input type="checkbox" id="statistics" />
                </td>
              </tr>
              <tr>
                <td>
                  User interface:
                  <input type="checkbox" id="user-interface" />
                </td>
              </tr>
              <tr>
                <td>
                  Help and credits:
                  <input type="checkbox" id="help" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default FloorEditor;
