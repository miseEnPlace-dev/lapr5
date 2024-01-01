// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// Thumb Raiser - JPP 2021, 2022, 2023
// Audio
// 3D modeling and importing
// Animation
// Perspective and orthographic projections
// Viewing
// Viewport manipulation
// Linear and affine transformations
// Lighting and materials
// Shadows
// Fog
// Multitexturing
// Collision detection
// User interaction

import * as THREE from "three";

import Animations from "./animations.ts";
import Audio from "./audio.ts";
import Camera from "./camera.ts";
import CubeTexture from "./cubetexture.ts";
import {
  ambientLightData,
  audioData,
  automatedData,
  cameraData,
  collisionDetectionData,
  cubeTextureData,
  directionalLightData,
  flashLightData,
  fogData,
  generalData,
  mazeData,
  playerData,
  shadowsData,
  spotLightData,
} from "./default_data.ts";
import Fog from "./fog.ts";
import {
  AmbientLight,
  DirectionalLight,
  FlashLight,
  SpotLight,
} from "./lights.ts";
import Maze from "./maze.ts";
import { merge } from "./merge.ts";
import Orientation from "./orientation.ts";
import Player from "./player.ts";
import UserInterface from "./user_interface.ts";

import Stats from "three/addons/libs/stats.module.js";

/*
 * generalParameters = {
 *  setDevicePixelRatio: Boolean
 * }
 *
 * audioParameters = {
 *  enabled: Boolean,
 *  volume: Float,
 *  volumeMin: Float,
 *  volumeMax: Float,
 *  volumeStep: Float,
 *  introductionClips: [{ url: String, position: String, referenceDistance: Float, loop: Boolean, volume: Float }],
 *  idleClips: [{ url: String, position: String, referenceDistance: Float, loop: Boolean, volume: Float }],
 *  jumpClips: [{ url: String, position: String, referenceDistance: Float, loop: Boolean, volume: Float }],
 *  deathClips: [{ url: String, position: String, referenceDistance: Float, loop: Boolean, volume: Float }],
 *  danceClips: [{ url: String, position: String, referenceDistance: Float, loop: Boolean, volume: Float }],
 *  endClips: [{ url: String, position: String, referenceDistance: Float, loop: Boolean, volume: Float }],
 *  credits: String
 * }
 *
 * cubeTexturesParameters = {
 *  skyboxes: [{
 *   name: String,
 *   texturePath: String,
 *   texturePositiveXUrl: String,
 *   textureNegativeXUrl: String,
 *   texturePositiveYUrl: String,
 *   textureNegativeYUrl: String,
 *   texturePositiveZUrl: String,
 *   textureNegativeZUrl: String,
 *   credits: String
 *  }],
 *  selected: Integer
 * }
 *
 * mazeParameters = {
 *  url: String,
 *  designCredits: String,
 *  texturesCredits: String,
 *  scale: Vector3,
 *  helpersColor: Color
 * }
 *
 * playerParameters = {
 *  url: String,
 *  credits: String,
 *  scale: Vector3,
 *  helpersColor: Color,
 *  walkingSpeed: Float,
 *  defaultDirection: Float,
 *  turningSpeed: Float,
 *  runningFactor: Float,
 *  keyCodes: { realisticViewMode: String, fixedView: String, firstPersonView: String, thirdPersonView: String, topView: String, miniMap: String, statistics: String, userInterface: String, help: String, boundingVolumes: String, ambientLight: String, directionalLight: String, spotLight: String, flashLight: String, shadows: String, fog: String, left: String, right: String, backward: String, forward: String, jump: String, yes: String, no: String, wave: String, punch: String, thumbsUp: String }
 * }
 *
 * ambientLightParameters = {
 *  visible: Boolean,
 *  color: Color,
 *  intensity: Float,
 *  intensityMin: Float,
 *  intensityMax: Float,
 *  intensityStep: Float
 * }
 *
 * directionalLightParameters = {
 *  visible: Boolean,
 *  color: Color,
 *  intensity: Float,
 *  intensityMin: Float,
 *  intensityMax: Float,
 *  intensityStep: Float,
 *  distance: Float,
 *  orientation: Orientation,
 *  orientationMin: Orientation,
 *  orientationMax: Orientation,
 *  orientationStep: Orientation,
 *  castShadow: Boolean,
 *  shadow: {
 *   mapSize: Vector2,
 *   camera: {
 *    left: Float,
 *    right: Float,
 *    top: Float,
 *    bottom: Float,
 *    near: Float,
 *    far: Float
 *   }
 *  }
 * }
 *
 * spotLightParameters = {
 *  visible: Boolean,
 *  color: Color,
 *  intensity: Float,
 *  intensityMin: Float,
 *  intensityMax: Float,
 *  intensityStep: Float,
 *  distance: Float,
 *  distanceMin: Float,
 *  distanceMax: Float,
 *  distanceStep: Float,
 *  angle: Float,
 *  angleMin: Float,
 *  angleMax: Float,
 *  angleStep: Float,
 *  penumbra: Float,
 *  penumbraMin: Float,
 *  penumbraMax: Float,
 *  penumbraStep: Float,
 *  position: Vector3,
 *  positionMin: Vector3,
 *  positionMax: Vector3,
 *  positionStep: Vector3,
 *  castShadow: Boolean,
 *  shadow: {
 *   mapSize: Vector2,
 *   camera: {
 *    near: Float,
 *    far: Float
 *   },
 *   focus: Float
 *  }
 * }
 *
 * flashLightParameters = {
 *  visible: Boolean,
 *  color: Color,
 *  intensity: Float,
 *  intensityMin: Float,
 *  intensityMax: Float,
 *  intensityStep: Float,
 *  distance: Float,
 *  distanceMin: Float,
 *  distanceMax: Float,
 *  distanceStep: Float,
 *  angle: Float,
 *  angleMin: Float,
 *  angleMax: Float,
 *  angleStep: Float,
 *  penumbra: Float,
 *  penumbraMin: Float,
 *  penumbraMax: Float,
 *  penumbraStep: Float,
 *  orientation: Orientation,
 *  orientationMin: Orientation,
 *  orientationMax: Orientation,
 *  orientationStep: Orientation,
 *  castShadow: Boolean,
 *  shadow: {
 *   mapSize: Vector2,
 *   camera: {
 *    near: Float,
 *    far: Float
 *   },
 *   focus: Float
 *  }
 * }
 *
 * shadowsParameters = {
 *  enabled: Boolean,
 *  type: Integer
 * }
 *
 * fogParameters = {
 *  enabled: Boolean,
 *  color: Color,
 *  densityMin: Float,
 *  densityMax: Float,
 *  densityStep: Float
 * }
 *
 * collisionDetectionParameters = {
 *  method: String,
 *  boundingVolumes: { visible: Boolean }
 * }
 *
 * fixedViewCameraParameters = {
 *  view: String,
 *  backgroundColor: Color,
 *  frameColor: Color,
 *  initialViewport: Vector4,
 *  viewportSizeMin: Float,
 *  dragOrResizeThreshold: Float,
 *  snapThreshold: Float,
 *  snapPositions: [Float],
 *  initialTarget: Vector3,
 *  initialOrientation: Orientation,
 *  orientationMin: Orientation,
 *  orientationMax: Orientation,
 *  orientationStep: Orientation,
 *  initialDistance: Float,
 *  distanceMin: Float,
 *  distanceMax: Float,
 *  distanceStep: Float,
 *  initialZoom: Float,
 *  zoomMin: Float,
 *  zoomMax: Float,
 *  zoomStep: Float,
 *  initialFov: Float,
 *  near: Float,
 *  far: Float,
 *  initialFogDensity: Float
 * }
 *
 * firstPersonViewCameraParameters = {
 *  view: String,
 *  backgroundColor: Color,
 *  frameColor: Color,
 *  initialViewport: Vector4,
 *  viewportSizeMin: Float,
 *  dragOrResizeThreshold: Float,
 *  snapThreshold: Float,
 *  snapPositions: [Float],
 *  initialTarget: Vector3,
 *  initialOrientation: Orientation,
 *  orientationMin: Orientation,
 *  orientationMax: Orientation,
 *  orientationStep: Orientation,
 *  initialDistance: Float,
 *  distanceMin: Float,
 *  distanceMax: Float,
 *  distanceStep: Float,
 *  initialZoom: Float,
 *  zoomMin: Float,
 *  zoomMax: Float,
 *  zoomStep: Float,
 *  initialFov: Float,
 *  near: Float,
 *  far: Float,
 *  initialFogDensity: Float
 * }
 *
 * thirdPersonViewCameraParameters = {
 *  view: String,
 *  backgroundColor: Color,
 *  frameColor: Color,
 *  initialViewport: Vector4,
 *  viewportSizeMin: Float,
 *  dragOrResizeThreshold: Float,
 *  snapThreshold: Float,
 *  snapPositions: [Float],
 *  initialTarget: Vector3,
 *  initialOrientation: Orientation,
 *  orientationMin: Orientation,
 *  orientationMax: Orientation,
 *  orientationStep: Orientation,
 *  initialDistance: Float,
 *  distanceMin: Float,
 *  distanceMax: Float,
 *  distanceStep: Float,
 *  initialZoom: Float,
 *  zoomMin: Float,
 *  zoomMax: Float,
 *  zoomStep: Float,
 *  initialFov: Float,
 *  near: Float,
 *  far: Float,
 *  initialFogDensity: Float
 * }
 *
 * topViewCameraParameters = {
 *  view: String,
 *  backgroundColor: Color,
 *  frameColor: Color,
 *  initialViewport: Vector4,
 *  viewportSizeMin: Float,
 *  dragOrResizeThreshold: Float,
 *  snapThreshold: Float,
 *  snapPositions: [Float],
 *  initialTarget: Vector3,
 *  initialOrientation: Orientation,
 *  orientationMin: Orientation,
 *  orientationMax: Orientation,
 *  orientationStep: Orientation,
 *  initialDistance: Float,
 *  distanceMin: Float,
 *  distanceMax: Float,
 *  distanceStep: Float,
 *  initialZoom: Float,
 *  zoomMin: Float,
 *  zoomMax: Float,
 *  zoomStep: Float,
 *  initialFov: Float,
 *  near: Float,
 *  far: Float,
 *  initialFogDensity: Float
 * }
 *
 * miniMapCameraParameters = {
 *  view: String,
 *  backgroundColor: Color,
 *  frameColor: Color,
 *  initialViewport: Vector4,
 *  viewportSizeMin: Float,
 *  dragOrResizeThreshold: Float,
 *  snapThreshold: Float,
 *  snapPositions: [Float],
 *  initialTarget: Vector3,
 *  initialOrientation: Orientation,
 *  orientationMin: Orientation,
 *  orientationMax: Orientation,
 *  orientationStep: Orientation,
 *  initialDistance: Float,
 *  distanceMin: Float,
 *  distanceMax: Float,
 *  distanceStep: Float,
 *  initialZoom: Float,
 *  zoomMin: Float,
 *  zoomMax: Float,
 *  zoomStep: Float,
 *  initialFov: Float,
 *  near: Float,
 *  far: Float,
 *  initialFogDensity: Float // Doesn't apply to this camera
 * }
 */

export const LOCAL_STORAGE_PREFIX = "@thumb-raiser:";

const CELL_TO_CARTESIAN_OFFSET = { x: 1.5, y: 1.25 };

export default class ThumbRaiser {
  constructor(
    generalParameters,
    audioParameters,
    cubeTexturesParameters,
    mazeParameters,
    playerParameters,
    ambientLightParameters,
    directionalLightParameters,
    spotLightParameters,
    flashLightParameters,
    shadowsParameters,
    fogParameters,
    collisionDetectionParameters,
    fixedViewCameraParameters,
    firstPersonViewCameraParameters,
    thirdPersonViewCameraParameters,
    topViewCameraParameters,
    miniMapCameraParameters,
    automatedParameters
  ) {
    this.currentCamera = -1;
    this.generalParameters = merge({}, generalData, generalParameters);
    this.audioParameters = merge({}, audioData, audioParameters);
    this.cubeTexturesParameters = merge(
      {},
      cubeTextureData,
      cubeTexturesParameters
    );
    this.mazeData = mazeData;
    this.mazeParameters = mazeParameters;
    this.mazeParameters.mazes = this.mazeParameters.mazes.map((maze) =>
      merge({}, this.mazeData, maze)
    );
    this.playerParameters = merge({}, playerData, playerParameters);
    this.ambientLightParameters = merge(
      {},
      ambientLightData,
      ambientLightParameters
    );
    this.directionalLightParameters = merge(
      {},
      directionalLightData,
      directionalLightParameters
    );
    this.spotLightParameters = merge({}, spotLightData, spotLightParameters);
    this.flashLightParameters = merge({}, flashLightData, flashLightParameters);
    this.shadowsParameters = merge({}, shadowsData, shadowsParameters);
    this.fogParameters = merge({}, fogData, fogParameters);
    this.collisionDetectionParameters = merge(
      {},
      collisionDetectionData,
      collisionDetectionParameters
    );
    this.fixedViewCameraParameters = merge(
      {},
      cameraData,
      fixedViewCameraParameters
    );
    this.firstPersonViewCameraParameters = merge(
      {},
      cameraData,
      firstPersonViewCameraParameters
    );
    this.thirdPersonViewCameraParameters = merge(
      {},
      cameraData,
      thirdPersonViewCameraParameters
    );
    this.topViewCameraParameters = merge(
      {},
      cameraData,
      topViewCameraParameters
    );
    this.miniMapCameraParameters = merge(
      {},
      cameraData,
      miniMapCameraParameters
    );

    this.automatedParameters = merge({}, automatedData, automatedParameters);
    this.currRouteIndex = 0;

    this.startAutomated = false;
    setTimeout(() => (this.startAutomated = true), 3000);

    // Set the game state
    this.gameRunning = false;

    // Create the audio listener, the audio sources and load the sound clips
    this.audio = new Audio(this.audioParameters);

    // Create two 2D scenes (the viewports' background and frame)
    this.background = new THREE.Scene();
    this.frame = new THREE.Scene();

    // Create the background (a square)
    const geometry = new THREE.PlaneGeometry(1.0, 1.0);
    let material = new THREE.MeshBasicMaterial();
    let square = new THREE.Mesh(geometry, material);
    square.position.set(0.5, 0.5, 0.0);
    this.background.add(square);

    // Create the frame (the edges of the same square)
    const edges = new THREE.EdgesGeometry(geometry);
    material = new THREE.LineBasicMaterial();
    square = new THREE.LineSegments(edges, material);
    square.position.set(0.5, 0.5, 0.0);
    this.frame.add(square);

    // Create the camera corresponding to the 2D scenes
    this.camera2D = new THREE.OrthographicCamera(0.0, 1.0, 1.0, 0.0, 0.0, 1.0);

    // Create a 3D scene (the game itself)
    this.scene = new THREE.Scene();

    // Create the cube texture
    this.cubeTexture = new CubeTexture(
      this.cubeTexturesParameters.skyboxes[this.cubeTexturesParameters.selected]
    );

    // Create the maze
    this.maze = new Maze(
      this.mazeParameters.mazes[this.mazeParameters.selected]
    );

    const floors = this.mazeParameters.mazes[0].maze.maze.elevator.floors;
    const mazeSelect = document.getElementById("maze") as HTMLSelectElement;
    const floorName = this.mazeParameters.mazes[0].name;
    if (mazeSelect)
      mazeSelect.innerHTML =
        `<option key=${floorName} value=${this.mazeParameters.mazes.findIndex(
          (m) => m.name === floorName
        )}>${floorName}</option>` +
        floors.map(
          (floor) =>
            `<option key=${floor} value=${this.mazeParameters.mazes.findIndex(
              (m) => m.name === floor
            )}>${floor}</option>`
        );

    const currentMaze = document.getElementById("mazeSelected");
    if (currentMaze) currentMaze.innerHTML = floorName;

    // Create the player
    this.player = new Player(this.playerParameters);

    // Create the lights
    this.ambientLight = new AmbientLight(this.ambientLightParameters);
    this.directionalLight = new DirectionalLight(
      this.directionalLightParameters
    );
    this.spotLight = new SpotLight(this.spotLightParameters);
    this.flashLight = new FlashLight(this.flashLightParameters);

    // Create the fog
    this.fog = new Fog(this.fogParameters);

    // Create the cameras corresponding to the four different views: fixed view, first-person view, third-person view and top view
    this.fixedViewCamera = new Camera(this.fixedViewCameraParameters);
    this.firstPersonViewCamera = new Camera(
      this.firstPersonViewCameraParameters
    );
    this.thirdPersonViewCamera = new Camera(
      this.thirdPersonViewCameraParameters
    );
    this.topViewCamera = new Camera(this.topViewCameraParameters);

    // Create the mini-map camera
    this.miniMapCamera = new Camera(this.miniMapCameraParameters);

    // Create the statistics and make its node invisible
    this.statistics = new Stats();
    this.statistics.dom.style.display = "none";
    this.statistics.dom.style.left = "0.5vw";
    this.statistics.dom.style.top = "1.0vh";
    this.statistics.dom.id = "statistics";
    document.body.appendChild(this.statistics.dom);

    // Create a renderer and turn on shadows in the renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    if (this.generalParameters.setDevicePixelRatio) {
      this.renderer.setPixelRatio(window.devicePixelRatio);
    }
    this.renderer.autoClear = false;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = this.shadowsParameters.type;
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.domElement.id = "canvas";
    document.body.appendChild(this.renderer.domElement);

    // Get and configure the panels' <div> elements (with the exception of the user interface checkbox, which will be addressed later)
    this.viewsPanel = document.getElementById("views-panel");
    this.view = document.getElementById("view");
    this.projection = document.getElementById("projection");
    this.horizontal = document.getElementById("horizontal");
    this.vertical = document.getElementById("vertical");
    this.distance = document.getElementById("distance");
    this.zoom = document.getElementById("zoom");
    this.reset = document.getElementById("reset");
    this.resetAll = document.getElementById("reset-all");
    this.mouseHelpPanel = document.getElementById("mouse-help-panel");
    this.keyboardHelpPanel = document.getElementById("keyboard-help-panel");
    this.creditsPanel = document.getElementById("credits-panel");
    this.subwindowsPanel = document.getElementById("subwindows-panel");
    this.realisticViewModeCheckBox = document.getElementById("realistic");
    this.realisticViewModeCheckBox.checked = false;
    this.fixedViewCamera.checkBox = document.getElementById("fixed");
    this.fixedViewCamera.checkBox.checked = localStorage.getItem(
      LOCAL_STORAGE_PREFIX + "fixedViewCamera"
    )
      ? JSON.parse(
          localStorage.getItem(LOCAL_STORAGE_PREFIX + "fixedViewCamera")
        )
      : true;
    this.firstPersonViewCamera.checkBox =
      document.getElementById("first-person");
    this.firstPersonViewCamera.checkBox.checked = localStorage.getItem(
      LOCAL_STORAGE_PREFIX + "firstPersonViewCamera"
    )
      ? JSON.parse(
          localStorage.getItem(LOCAL_STORAGE_PREFIX + "firstPersonViewCamera")
        )
      : true;
    this.thirdPersonViewCamera.checkBox =
      document.getElementById("third-person");
    this.thirdPersonViewCamera.checkBox.checked = localStorage.getItem(
      LOCAL_STORAGE_PREFIX + "thirdPersonViewCamera"
    )
      ? JSON.parse(
          localStorage.getItem(LOCAL_STORAGE_PREFIX + "thirdPersonViewCamera")
        )
      : true;
    this.topViewCamera.checkBox = document.getElementById("top");
    this.topViewCamera.checkBox.checked = localStorage.getItem(
      LOCAL_STORAGE_PREFIX + "topViewCamera"
    )
      ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_PREFIX + "topViewCamera"))
      : true;
    this.miniMapCamera.checkBox = document.getElementById("mini-map");
    this.miniMapCamera.checkBox.checked = localStorage.getItem(
      LOCAL_STORAGE_PREFIX + "miniMapCamera"
    )
      ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_PREFIX + "miniMapCamera"))
      : true;
    this.statistics.checkBox = document.getElementById("statistics");
    this.statistics.checkBox.checked = false;
    this.help = { checkBox: document.getElementById("help") };
    this.mazeSelect = document.getElementById("maze");
    this.help.checkBox.checked = false;

    // Create an ordered list containing the cameras whose viewports are currently visible
    // There must always be at least one visible viewport
    // The first element in the list corresponds to the topmost visible viewport; it will be the first viewport being selected (with the mouse pointer) and the last being rendered
    // The list applies to the primary viewports only; the secondary (mini-map) viewport will be selected and rendered separately
    this.visibleViewportCameras = [
      this.fixedViewCamera,
      this.firstPersonViewCamera,
      this.thirdPersonViewCamera,
      this.topViewCamera,
    ];

    // Set the active view camera (first-person view)
    this.setActiveViewCamera(this.firstPersonViewCamera);

    // Set the mouse related information
    this.mouse = {
      initialPosition: new THREE.Vector2(), // Mouse position when a button is pressed
      previousPosition: new THREE.Vector2(), // Previous mouse position
      currentPosition: new THREE.Vector2(), // Current mouse position
      actionInProgress: false, // Dragging, resizing, orbiting around a target or panning the mini-map camera: true; otherwise: false
      camera: "none", // Camera whose viewport is currently being pointed
      frame: "none", // Viewport frame currently being pointed
    };

    // Build the help panels
    this.buildHelpPanels();

    // Build the credits panel
    this.buildCreditsPanel();

    this.tooltip = document.getElementById("tooltip");
  }

  buildHelpPanels() {
    // Mouse help panel is static; so, it doesn't need to be built

    // Keyboard help panel
    const table = document.getElementById("keyboard-help-table");
    let i = 0;
    for (const key in this.player.keyCodes) {
      while (table.rows[i].cells.length < 2) {
        i++;
      }
      table.rows[i++].cells[0].innerHTML = this.player.keyCodes[key];
    }
  }

  buildCreditsPanel() {
    const table = document.getElementById("credits-table");
    while (table.rows.length > 1) {
      table.deleteRow(-1);
    }
    [
      this.audio.credits,
      this.cubeTexture.credits,
      this.maze.designCredits,
      this.maze.texturesCredits,
      this.player.credits,
    ].forEach((element) => {
      if (element !== "") {
        const row = table.insertRow(-1);
        const cell = row.insertCell(-1);
        cell.innerHTML = element;
      }
    });
  }

  updateMaze(index: number, exit: boolean) {
    if (!exit) {
      const transitionOverlay = document.createElement("div");
      transitionOverlay.classList.add("transition-overlay");
      document.body.appendChild(transitionOverlay);

      const interval = setInterval(() => {
        this.player.position.y += 0.02;
        this.maze.elevator.position.y += 0.02;
      }, 100);

      setTimeout(() => {
        transitionOverlay.style.opacity = "1";
      }, 0);

      // Wait for the duration of the transition
      const transitionTimeout = setTimeout(() => {
        clearInterval(interval);
        this.changeMaze(index);
      }, 5000);

      setTimeout(() => {
        if (document.body.contains(transitionOverlay)) {
          transitionOverlay.style.opacity = "0";
          document.body.removeChild(transitionOverlay);
        }
        clearTimeout(transitionTimeout);
      }, 5000);
    } else {
      this.changeMaze(index, true);
    }
  }

  changeMaze(index: number, exit?: boolean) {
    // Clear any existing timeouts or intervals that might be pending
    clearTimeout();
    clearInterval();

    // The cache must be enabled; additional information available at https://threejs.org/docs/api/en/loaders/FileLoader.html
    THREE.Cache.enabled = true;

    // Create a new maze object
    const newMaze = new Maze(this.mazeParameters.mazes[index]);

    // Remove the old maze from the scene
    this.scene.remove(this.maze);

    const oldFloor = this.maze.name;

    // Update the reference to the new maze
    this.maze = newMaze;

    // Add the new maze to the scene
    this.scene.add(this.maze);

    let cellPos;
    // Update player position and direction
    if (exit) {
      const e = this.maze.exits.find((e) => e.floorCode === oldFloor);
      if (e.x == -1) cellPos = this.maze.cellToCartesian([e.x + 1, e.y]);
      else if (e.y == -1) cellPos = this.maze.cellToCartesian([e.x, e.y + 1]);
      else if (e.x == this.maze.maze.maze.size.depth)
        cellPos = this.maze.cellToCartesian([e.x - 1, e.y]);
      else if (e.y == this.maze.maze.maze.size.width)
        cellPos = this.maze.cellToCartesian([e.x, e.y - 1]);
      else cellPos = this.maze.cellToCartesian([e.x, e.y]);
    } else
      cellPos = this.maze.cellToCartesian(
        this.mazeParameters.mazes[index].maze.player.initialPosition
      );

    this.player.position.set(cellPos.x, cellPos.y, cellPos.z);
    this.player.direction =
      this.mazeParameters.mazes[index].maze.player.initialDirection;

    // Update UI elements
    const mazeSelect = document.getElementById("maze") as HTMLSelectElement;
    const floorName = this.mazeParameters.mazes[index].name;

    if (mazeSelect) {
      mazeSelect.innerHTML =
        `<option key=${
          this.maze.name
        } value=${this.mazeParameters.mazes.findIndex(
          (m) => m.name === this.maze.name
        )}>
          ${this.maze.name}
        </option>` +
        this.mazeParameters.mazes[index].maze.maze.elevator.floors.map(
          (floor) =>
            `<option key=${floor} value=${this.mazeParameters.mazes.findIndex(
              (m) => m.name === floor
            )}>
              ${floor}
            </option>`
        );
    }

    const currentMaze = document.getElementById("mazeSelected");
    if (currentMaze) currentMaze.innerHTML = this.maze.name;

    // Hide the maps-panel
    document
      .getElementById("maps-panel")
      ?.setAttribute("style", "display:none");

    // Make sure the renderer is updated
    this.renderer.render(this.scene, this.camera);
  }

  updateViewsPanel() {
    this.view.options.selectedIndex = [
      "fixed",
      "first-person",
      "third-person",
      "top",
    ].indexOf(this.activeViewCamera.view);
    this.projection.options.selectedIndex = [
      "perspective",
      "orthographic",
    ].indexOf(this.activeViewCamera.projection);
    this.horizontal.value = this.activeViewCamera.orientation.h.toFixed(0);
    this.vertical.value = this.activeViewCamera.orientation.v.toFixed(0);
    if (this.activeViewCamera.view === "first-person") {
      this.distance.value = "";
      this.distance.disabled = true;
    } else {
      this.distance.disabled = false;
      this.distance.value = this.activeViewCamera.distance.toFixed(1);
    }
    this.zoom.value = this.activeViewCamera.zoom.toFixed(1);
  }

  setCursor(action) {
    let cursor;
    switch (action) {
      case "drag":
        cursor = "grab";
        break;
      case "dragging":
        cursor = "grabbing";
        break;
      case "southwest":
        cursor = "nesw-resize";
        break;
      case "northwest":
        cursor = "nwse-resize";
        break;
      case "west":
        cursor = "ew-resize";
        break;
      case "southeast":
        cursor = "nwse-resize";
        break;
      case "northeast":
        cursor = "nesw-resize";
        break;
      case "east":
        cursor = "ew-resize";
        break;
      case "south":
        cursor = "ns-resize";
        break;
      case "north":
        cursor = "ns-resize";
        break;
      case "dolly-in":
        cursor = "url('./cursors/dolly-in_16.png') 8 8, n-resize"; // Custom cursor plus a mandatory fallback cursor in case the icon fails to load
        break;
      case "dolly-out":
        cursor = "url('./cursors/dolly-out_16.png') 8 8, s-resize"; // Custom cursor plus a mandatory fallback cursor in case the icon fails to load
        break;
      case "zoom-in":
        cursor = "zoom-in";
        break;
      case "zoom-out":
        cursor = "zoom-out";
        break;
      case "orbit":
        cursor = "url('./cursors/orbit_32.png') 16 16, crosshair"; // Custom cursor plus a mandatory fallback cursor in case the icon fails to load
        break;
      case "pan":
        cursor = "all-scroll";
        break;
      case "not-allowed":
        cursor = "not-allowed";
        break;
      case "auto":
        cursor = "auto";
        break;
    }
    document.body.style.cursor = cursor;
  }

  getPointedFrame(mouse, camera) {
    const deltaX = camera.dragOrResizeThreshold * window.innerWidth;
    const deltaY = camera.dragOrResizeThreshold * window.innerHeight;
    const west = mouse.currentPosition.x - camera.viewport.x <= deltaX;
    const south = mouse.currentPosition.y - camera.viewport.y <= deltaY;
    const east =
      camera.viewport.x + camera.viewport.width - mouse.currentPosition.x <=
      deltaX;
    const north =
      camera.viewport.y + camera.viewport.height - mouse.currentPosition.y <=
      deltaY;
    if (west) {
      if (south) {
        mouse.frame = "southwest"; // Southwest corner
      } else if (north) {
        mouse.frame = "northwest"; // Northwest corner
      } else {
        mouse.frame = "west"; // West edge
      }
    } else if (east) {
      if (south) {
        mouse.frame = "southeast"; // Southeast corner
      } else if (north) {
        mouse.frame = "northeast"; // Northeast corner
      } else {
        mouse.frame = "east"; // East edge
      }
    } else if (south) {
      mouse.frame = "south"; // South / north edge
    } else if (north) {
      mouse.frame = "north"; // South / north edge
    } else {
      mouse.frame = "none"; // No frame corner or edge is being pointed
    }
  }

  getPointedViewport(mouse) {
    const cameras = (
      this.miniMapCamera.checkBox.checked ? [this.miniMapCamera] : []
    ).concat(this.visibleViewportCameras);
    for (const camera of cameras) {
      if (
        mouse.currentPosition.x >= camera.viewport.x &&
        mouse.currentPosition.x < camera.viewport.x + camera.viewport.width &&
        mouse.currentPosition.y >= camera.viewport.y &&
        mouse.currentPosition.y < camera.viewport.y + camera.viewport.height
      ) {
        mouse.camera = camera;
        this.getPointedFrame(mouse, camera);
        this.setCursor(this.mouse.frame === "none" ? "drag" : this.mouse.frame);
        return;
      }
    }
    // No viewport is being pointed
    mouse.camera = "none";
    mouse.frame = "none";
    this.setCursor("auto");
  }

  // Update the order by which the primary camera viewports will be selected and rendered and set the color of the corresponding checkboxes accordingly
  updateVisibleViewportCameras() {
    const newVisibleViewportCameras = [this.activeViewCamera];
    this.activeViewCamera.checkBox.setAttribute("class", "checkbox-red"); // Topmost viewport: in the subwindows panel set the corresponding checkbox color to red
    this.visibleViewportCameras.forEach((camera) => {
      if (camera !== this.activeViewCamera && camera.checkBox.checked) {
        newVisibleViewportCameras.push(camera);
        camera.checkBox.setAttribute("class", null); // Not the topmost viewport: in the subwindows panel set the corresponding checkbox color to its default
      }
    });
    this.visibleViewportCameras = newVisibleViewportCameras;
    // The active view camera is always the first element in the list of cameras whose viewports are currently visible
    this.activeViewCamera = this.visibleViewportCameras[0];
  }

  // Set the active view camera
  setActiveViewCamera(camera) {
    if (this.activeViewCamera !== undefined) {
      this.activeViewCamera.activeProjection.remove(this.audio.listener);
    }
    this.activeViewCamera = camera;
    this.activeViewCamera.activeProjection.add(this.audio.listener); // The audio listener is always a child of the active view camera
    this.horizontal.min = this.activeViewCamera.orientationMin.h.toFixed(0);
    this.horizontal.max = this.activeViewCamera.orientationMax.h.toFixed(0);
    this.horizontal.step = this.activeViewCamera.orientationStep.h.toFixed(0);
    this.vertical.min = this.activeViewCamera.orientationMin.v.toFixed(0);
    this.vertical.max = this.activeViewCamera.orientationMax.v.toFixed(0);
    this.vertical.step = this.activeViewCamera.orientationStep.v.toFixed(0);
    this.distance.min = this.activeViewCamera.distanceMin.toFixed(1);
    this.distance.max = this.activeViewCamera.distanceMax.toFixed(1);
    this.distance.step = this.activeViewCamera.distanceStep.toFixed(1);
    this.zoom.min = this.activeViewCamera.zoomMin.toFixed(1);
    this.zoom.max = this.activeViewCamera.zoomMax.toFixed(1);
    this.zoom.step = this.activeViewCamera.zoomStep.toFixed(1);
    this.updateViewsPanel();
    this.updateVisibleViewportCameras();
    if (this.userInterface !== undefined) {
      this.userInterface.fogParameters.density =
        this.activeViewCamera.fogDensity;
    }
  }

  setRealisticViewMode(mode) {
    // Stabilized view mode: false; realistic view mode: true
    this.realisticViewModeCheckBox.checked = mode;
  }

  setViewportVisibility(camera) {
    // Primary viewports only; the secondary (mini-map) viewport visibility is set separately

    /* Visibility will be set according to the following criteria:
     *
     *    Current state   |     New state
     * -------------------+-------------------
     *  Topmost | Visible | Topmost | Visible
     * ---------+---------+---------+---------
     *     No   |    No   |   Yes   |   Yes
     *     No   |   Yes   |   Yes   |   Yes
     *    Yes   |    No   |   ---   |   ---    This situation will never occur
     *    Yes   |   Yes   |    No   |    No    Note, however, that there must always be at least one visible viewport (see below)
     *    Yes   |   Yes   |    No   |   Yes    If this is the only visible viewport, keep it visible
     */

    if (camera !== this.activeViewCamera) {
      // Currently not the topmost viewport
      camera.checkBox.checked = true; // Make it visible
      this.setActiveViewCamera(camera); // Set it as the topmost viewport
    } else {
      if (this.visibleViewportCameras.length === 1) {
        // This is the only visible viewport
        camera.checkBox.checked = true; // Keep it visible
      } else {
        // At least two viewports are currently visible
        camera.checkBox.checked = false; // Make the viewport invisible
        // Find the next visible viewport
        let i = 1;
        while (!this.visibleViewportCameras[i].checkBox.checked) {
          i++;
        }
        this.setActiveViewCamera(this.visibleViewportCameras[i]); // Set it as the topmost viewport
      }
    }
  }

  setStatisticsVisibility(visible) {
    this.statistics.checkBox.checked = visible;
    this.statistics.dom.style.display = visible ? "block" : "none";
  }

  setUserInterfaceVisibility(visible) {
    this.userInterface.checkBox.checked = visible;
    this.viewsPanel.style.display = visible ? "block" : "none";
    this.subwindowsPanel.style.display = visible ? "block" : "none";
    this.userInterface.setVisibility(visible);
  }

  setHelpVisibility(visible) {
    if (visible) {
      this.help.checkBox.checked = true;
      this.mouseHelpPanel.style.display = "block";
    } else {
      if (this.mouseHelpPanel.style.display !== "none") {
        this.help.checkBox.checked = true;
        this.mouseHelpPanel.style.display = "none";
        this.keyboardHelpPanel.style.display = "block";
      } else if (this.keyboardHelpPanel.style.display !== "none") {
        this.help.checkBox.checked = true;
        this.keyboardHelpPanel.style.display = "none";
        this.creditsPanel.style.display = "block";
      } else {
        this.help.checkBox.checked = false;
        this.creditsPanel.style.display = "none";
      }
    }
  }

  setCollisionDetectionMethod(method) {
    if (this.collisionDetectionParameters.method !== method) {
      const visible = this.collisionDetectionParameters.boundingVolumes.visible;
      if (visible) {
        this.setBoundingVolumesVisibility(false);
      }
      this.collisionDetectionParameters.method = method;
      if (visible) {
        this.setBoundingVolumesVisibility(true);
      }
    }
  }

  setBoundingVolumesVisibility(visible) {
    if (visible) {
      this.scene.add(this.maze.helper);
      if (this.collisionDetectionParameters.method !== "obb-aabb") {
        this.player.body.add(this.player.cylinderHelper);
      } else {
        this.player.body.add(this.player.boxHelper);
      }
    } else {
      this.scene.remove(this.maze.helper);
      if (this.collisionDetectionParameters.method !== "obb-aabb") {
        this.player.body.remove(this.player.cylinderHelper);
      } else {
        this.player.body.remove(this.player.boxHelper);
      }
    }
  }

  enableShadows(enabled) {
    this.directionalLight.castShadow = enabled;
    this.spotLight.castShadow = enabled;
    this.flashLight.castShadow = enabled;
  }

  enableFog(enabled) {
    if (enabled) {
      this.scene.background = null;
      this.scene.fog = this.fog;
    } else {
      this.scene.background = this.cubeTexture.textures;
      this.scene.fog = null;
    }
  }

  windowResize() {
    [
      this.fixedViewCamera,
      this.firstPersonViewCamera,
      this.thirdPersonViewCamera,
      this.topViewCamera,
      this.miniMapCamera,
    ].forEach((camera) => {
      camera.setViewport();
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  togglePerspective() {
    const cameras = [
      this.fixedViewCamera,
      this.firstPersonViewCamera,
      this.thirdPersonViewCamera,
      this.topViewCamera,
    ];
    this.currentCamera = (this.currentCamera + 1) % cameras.length;

    cameras.forEach((camera) => {
      camera.checkBox.checked = false;
    });
    cameras[this.currentCamera].setViewport(
      new THREE.Vector4(0.0, 0.0, 1.0, 1.0)
    );
    // Make the viewport visible and set it as the topmost viewport
    cameras[this.currentCamera].checkBox.checked = true;
    this.setActiveViewCamera(cameras[this.currentCamera]);

    this.miniMapCamera.setViewport(
      new THREE.Vector4(1, 0, 0.3, 0.3),
      cameras[this.currentCamera]
    );
  }

  keyChange(event, state) {
    if (document.activeElement == document.body) {
      // Prevent the "Space" and "Arrow" keys from scrolling the document's content
      if (
        event.code === "Space" ||
        event.code === "ArrowLeft" ||
        event.code === "ArrowRight" ||
        event.code === "ArrowDown" ||
        event.code === "ArrowUp"
      ) {
        event.preventDefault();
      }
      if (event.code === this.player.keyCodes.realisticViewMode && state) {
        // Stabilized view mode / realistic view mode
        this.setRealisticViewMode(!this.realisticViewModeCheckBox.checked);
      } else if (event.code === this.player.keyCodes.fixedView && state) {
        // Display / select / hide fixed view
        this.setViewportVisibility(this.fixedViewCamera);
      } else if (event.code === this.player.keyCodes.firstPersonView && state) {
        // Display / select / hide first-person view
        this.setViewportVisibility(this.firstPersonViewCamera);
      } else if (
        event.code === this.player.keyCodes.changePerspective &&
        state
      ) {
        this.togglePerspective();
      } else if (event.code === this.player.keyCodes.thirdPersonView && state) {
        // Display / select / hide third-person view
        this.setViewportVisibility(this.thirdPersonViewCamera);
      } else if (event.code === this.player.keyCodes.topView && state) {
        // Display / select / hide top view
        this.setViewportVisibility(this.topViewCamera);
      } else if (event.code === this.player.keyCodes.miniMap && state) {
        // Display / hide mini-map
        this.miniMapCamera.checkBox.checked =
          !this.miniMapCamera.checkBox.checked;
      } else if (event.code === this.player.keyCodes.statistics && state) {
        // Display / hide statistics
        this.setStatisticsVisibility(!this.statistics.checkBox.checked);
      } else if (event.code === this.player.keyCodes.userInterface && state) {
        // Display / hide user interface
        this.setUserInterfaceVisibility(!this.userInterface.checkBox.checked);
      } else if (event.code === this.player.keyCodes.help && state) {
        // Display / hide help
        this.setHelpVisibility(!this.help.checkBox.checked);
      } else if (event.code === this.player.keyCodes.boundingVolumes && state) {
        // Display / hide bounding volumes
        this.collisionDetectionParameters.boundingVolumes.visible =
          !this.collisionDetectionParameters.boundingVolumes.visible;
        this.setBoundingVolumesVisibility(
          this.collisionDetectionParameters.boundingVolumes.visible
        );
      } else if (event.code === this.player.keyCodes.ambientLight && state) {
        // Turn on / off ambient light
        this.ambientLight.visible = !this.ambientLight.visible;
      } else if (
        event.code === this.player.keyCodes.directionalLight &&
        state
      ) {
        // Turn on / off directional light
        this.directionalLight.visible = !this.directionalLight.visible;
      } else if (event.code === this.player.keyCodes.spotLight && state) {
        // Turn on / off spotlight
        this.spotLight.visible = !this.spotLight.visible;
      } else if (event.code === this.player.keyCodes.flashLight && state) {
        // Turn on / off flashlight
        this.flashLight.visible = !this.flashLight.visible;
      } else if (event.code === this.player.keyCodes.shadows && state) {
        // Turn on / off shadows
        this.shadowsParameters.enabled = !this.shadowsParameters.enabled;
      } else if (event.code === this.player.keyCodes.fog && state) {
        // Turn on / off fog
        this.fog.enabled = !this.fog.enabled;
      } else if (event.code === this.player.keyCodes.left) {
        this.player.keyStates.left = state;
      } else if (event.code === this.player.keyCodes.right) {
        this.player.keyStates.right = state;
      } else if (event.code === this.player.keyCodes.backward) {
        this.player.keyStates.backward = state;
      } else if (event.code === this.player.keyCodes.forward) {
        this.player.keyStates.forward = state;
      } else if (event.code === this.player.keyCodes.jump) {
        this.player.keyStates.jump = state;
      } else if (event.code === this.player.keyCodes.yes) {
        this.player.keyStates.yes = state;
      } else if (event.code === this.player.keyCodes.no) {
        this.player.keyStates.no = state;
      } else if (event.code === this.player.keyCodes.wave) {
        this.player.keyStates.wave = state;
      } else if (event.code === this.player.keyCodes.punch) {
        this.player.keyStates.punch = state;
      } else if (event.code === this.player.keyCodes.thumbsUp) {
        this.player.keyStates.thumbsUp = state;
      }
      this.player.shiftKey = event.shiftKey;
    }
  }

  mouseDown(event) {
    if (event.target.id === "canvas") {
      event.preventDefault();
      if (event.buttons === 1 || event.buttons === 2) {
        // Primary or secondary button down
        // Store initial mouse position in window coordinates (mouse coordinate system: origin in the top-left corner; window coordinate system: origin in the bottom-left corner)
        this.mouse.initialPosition = new THREE.Vector2(
          event.clientX,
          window.innerHeight - event.clientY - 1
        );
        if (this.mouse.camera !== "none") {
          // A viewport is being pointed
          this.mouse.actionInProgress = true;
          if (event.buttons === 1) {
            // Primary button down
            this.mouse.camera.previousViewport =
              this.mouse.camera.viewport.clone();
            if (this.mouse.frame === "none") {
              // No frame is being pointed; so, it is not a resizing event. It must be a dragging event
              this.setCursor("dragging"); // Change the cursor from "grab" to "grabbing"
            }
            // Otherwise it is a resizing event, but no action is needed here; so, no else {} here
          } else {
            // Secondary button down
            if (this.mouse.camera !== this.miniMapCamera) {
              // Start orbiting around a target
              this.setCursor("orbit"); // Change the cursor to "orbit"
            } else {
              // Start panning the mini-map camera
              this.setCursor("pan"); // Change the cursor to "all-scroll"
            }
          }
          if (this.mouse.camera !== this.miniMapCamera) {
            this.view.options.selectedIndex = [
              this.fixedViewCamera,
              this.firstPersonViewCamera,
              this.thirdPersonViewCamera,
              this.topViewCamera,
            ].indexOf(this.mouse.camera);
            this.setActiveViewCamera(this.mouse.camera);
          }
        }
        this.mouse.previousPosition = this.mouse.initialPosition;
      }
    }
  }

  mouseMove(event) {
    if (event.target.id === "canvas") {
      document.activeElement.blur();
      if (event.buttons === 0 || event.buttons === 1 || event.buttons === 2) {
        // Store current mouse position in window coordinates (mouse coordinate system: origin in the top-left corner; window coordinate system: origin in the bottom-left corner)
        this.mouse.currentPosition = new THREE.Vector2(
          event.clientX,
          window.innerHeight - event.clientY - 1
        );

        if (this.mouse.camera) {
          // const raycaster = new THREE.Raycaster();
          const mouseCoords = new THREE.Vector2();

          mouseCoords.x = (event.clientX / window.innerWidth) * 2 - 1;
          mouseCoords.y = -(event.clientY / window.innerHeight) * 2 + 1;

          // const projection = this.mouse.camera.projection;
          // raycaster.setFromCamera(
          //   mouseCoords.clone(),
          //   this.mouse.camera[projection]
          // );
          // const objects = raycaster.intersectObjects(this.scene.children);
          // console.log(objects);
        }

        if (event.buttons === 0) {
          // No button down
          this.getPointedViewport(this.mouse);
        } else if (this.mouse.actionInProgress) {
          // Primary or secondary button down and action in progress
          if (this.mouse.camera !== "none") {
            // Mouse action in progress
            // Compute mouse movement and update mouse position
            const mouseIncrement = this.mouse.currentPosition
              .clone()
              .sub(this.mouse.previousPosition);

            if (event.buttons === 1) {
              // Primary button down
              if (this.mouse.frame === "none") {
                // Dragging the viewport
                this.mouse.camera.dragViewport(this.mouse);
              } else {
                // Resizing the viewport
                this.mouse.camera.resizeViewport(this.mouse.frame, this.mouse);
              }
            } else {
              // Secondary button down
              if (this.mouse.camera !== this.miniMapCamera) {
                // Orbiting around a target
                this.mouse.camera.updateOrientation(
                  mouseIncrement.multiply(new THREE.Vector2(-0.5, 0.5))
                );
                this.updateViewsPanel();
              } else {
                // Panning the mini-map camera
                const targetIncrement = new THREE.Vector3(
                  ((mouseIncrement.x / this.miniMapCamera.viewport.width) *
                    (this.miniMapCamera.orthographic.left -
                      this.miniMapCamera.orthographic.right)) /
                    this.miniMapCamera.orthographic.zoom,
                  0.0,
                  ((mouseIncrement.y / this.miniMapCamera.viewport.height) *
                    (this.miniMapCamera.orthographic.top -
                      this.miniMapCamera.orthographic.bottom)) /
                    this.miniMapCamera.orthographic.zoom
                );
                this.miniMapCamera.updateTarget(targetIncrement);
              }
            }
            this.mouse.previousPosition = this.mouse.currentPosition;
          }
        }
      }

      const pos = { x: 0, y: 0 };
      const rect = canvas.getBoundingClientRect();
      pos.x =
        (((event.clientX - rect.left) * canvas.width) /
          rect.width /
          canvas.width) *
          2 -
        1;
      pos.y =
        (((event.clientY - rect.top) * canvas.height) /
          rect.height /
          canvas.height) *
          -2 +
        1;

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(pos, this.activeViewCamera.activeProjection);

      const groupsToCheck = this.maze.children.filter(
        (child) => child.type === "Group"
      );

      let showTooltip = false;
      let name = "";
      groupsToCheck.forEach((group) => {
        name = group.name;
        const intersectedObjects = raycaster.intersectObject(
          group,
          true
        ) as THREE.Object3D[];

        if (intersectedObjects.length > 0) {
          this.tooltip.innerText = name.toString();
          showTooltip = true;
        }
      });

      if (showTooltip) {
        this.tooltip.style.left = (event.pageX + 5).toString() + "px";
        this.tooltip.style.top = (event.pageY - 50).toString() + "px";
        this.tooltip.style.setProperty("display", "block", "important");
      } else {
        this.tooltip.style.setProperty("display", "none", "important");
      }
    } else {
      this.setCursor("auto");
    }
  }

  mouseUp(event) {
    if (event.button === 0 || event.button === 2) {
      // Primary or secondary button up (do not confuse event.button with event.buttons: https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button and https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/buttons)
      this.mouse.actionInProgress = false;
      // Check if a mini-map viewport resizing event is finished; if so, make sure that the viewport's width and height are the same
      if (
        event.button === 0 && // Primary button up
        this.mouse.camera === this.miniMapCamera && // Mini-map viewport
        this.mouse.frame !== "none"
      ) {
        // The frame was being pointed; so, it was a resizing event
        this.miniMapCamera.adjustViewport(); // Make sure that the viewport's width and height are the same
      }
      // Store current mouse position in window coordinates (mouse coordinate system: origin in the top-left corner; window coordinate system: origin in the bottom-left corner)
      this.mouse.currentPosition = new THREE.Vector2(
        event.clientX,
        window.innerHeight - event.clientY - 1
      );
      // Reset the cursor
      this.getPointedViewport(this.mouse);
    }
  }

  mouseWheel(event) {
    // Prevent the mouse wheel from scrolling the document's content
    event.preventDefault();
    if (this.mouse.camera !== "none") {
      // A viewport is being pointed
      if (event.shiftKey) {
        // The shift key is being pressed
        if (
          this.mouse.camera !== this.firstPersonViewCamera &&
          this.mouse.camera !== this.miniMapCamera
        ) {
          // Dollying is not allowed in first-person view or in mini-map
          this.setCursor(event.deltaY < 0 ? "dolly-in" : "dolly-out"); // Change the cursor to "dolly-in" or "dolly-out"
          this.mouse.camera.updateDistance(0.005 * event.deltaY); // Dollying
        } else {
          this.setCursor("not-allowed"); // Dollying not allowed
        }
      } else {
        // The shift key is not being pressed
        this.setCursor(event.deltaY < 0 ? "zoom-in" : "zoom-out"); // Change the cursor to "zoom-in" or "zoom-out"
        this.mouse.camera.updateZoom(-0.001 * event.deltaY); // Zooming
      }
      if (this.mouse.camera !== this.miniMapCamera) {
        this.view.options.selectedIndex = [
          this.fixedViewCamera,
          this.firstPersonViewCamera,
          this.thirdPersonViewCamera,
          this.topViewCamera,
        ].indexOf(this.mouse.camera);
        this.setActiveViewCamera(this.mouse.camera);
      }
    }
  }

  contextMenu(event) {
    // Prevent the context menu from appearing when the secondary mouse button is clicked
    event.preventDefault();
  }

  elementChange(event) {
    switch (event.target.id) {
      case "view":
        this.setViewportVisibility(
          [
            this.fixedViewCamera,
            this.firstPersonViewCamera,
            this.thirdPersonViewCamera,
            this.topViewCamera,
          ][this.view.options.selectedIndex]
        );
        break;
      case "projection":
        this.activeViewCamera.activeProjection.remove(this.audio.listener);
        this.activeViewCamera.setActiveProjection(
          ["perspective", "orthographic"][this.projection.options.selectedIndex]
        );
        this.activeViewCamera.activeProjection.add(this.audio.listener);
        break;
      case "horizontal":
      case "vertical":
      case "distance":
      case "zoom":
        if (event.target.checkValidity()) {
          switch (event.target.id) {
            case "horizontal":
            case "vertical":
              this.activeViewCamera.setOrientation(
                new Orientation(this.horizontal.value, this.vertical.value)
              );
              break;
            case "distance":
              this.activeViewCamera.setDistance(this.distance.value);
              break;
            case "zoom":
              this.activeViewCamera.setZoom(this.zoom.value);
              break;
          }
        }
        break;
      case "fixed":
        this.setViewportVisibility(this.fixedViewCamera);
        break;
      case "first-person":
        this.setViewportVisibility(this.firstPersonViewCamera);
        break;
      case "third-person":
        this.setViewportVisibility(this.thirdPersonViewCamera);
        break;
      case "top":
        this.setViewportVisibility(this.topViewCamera);
        break;
      case "statistics":
        this.setStatisticsVisibility(event.target.checked);
        break;
      case "user-interface":
        this.setUserInterfaceVisibility(event.target.checked);
        break;
      case "help":
        this.setHelpVisibility(event.target.checked);
        break;
      case "maze":
        this.updateMaze(event.target.value, false);
        break;
    }
  }

  buttonClick(event) {
    switch (event.target.id) {
      case "reset":
        this.activeViewCamera.initialize();
        break;
      case "reset-all":
        [
          this.fixedViewCamera,
          this.firstPersonViewCamera,
          this.thirdPersonViewCamera,
          this.topViewCamera,
          this.miniMapCamera,
        ].forEach((camera) => {
          camera.initialize();
        });
        break;
    }
    this.updateViewsPanel();
  }

  finalSequence() {
    // Enable ambient light
    this.ambientLight.visible = true;
    // Enable directional light
    this.directionalLight.visible = true;
    // Enable spotlight
    this.spotLight.visible = true;
    // Disable flashlight
    this.flashLight.visible = false;
    // Disable fog
    this.fog.enabled = false;
    // Make camera viewports invisible
    this.fixedViewCamera.checkBox.checked = false;
    this.firstPersonViewCamera.checkBox.checked = false;
    this.topViewCamera.checkBox.checked = false;
    this.miniMapCamera.checkBox.checked = false;
    // Reconfigure the third-person view camera and maximize its viewport
    this.thirdPersonViewCamera.setOrientation(
      new Orientation(-180.0, this.thirdPersonViewCamera.initialOrientation.v)
    );
    this.thirdPersonViewCamera.setDistance(
      this.thirdPersonViewCamera.initialDistance
    );
    this.thirdPersonViewCamera.setZoom(2.0);
    this.thirdPersonViewCamera.setViewport(
      new THREE.Vector4(0.0, 0.0, 1.0, 1.0)
    );
    // Make the viewport visible and set it as the topmost viewport
    this.thirdPersonViewCamera.checkBox.checked = true;
    this.setActiveViewCamera(this.thirdPersonViewCamera);
    // Make bounding volumes invisible
    if (this.collisionDetectionParameters.boundingVolumes.visible) {
      this.collisionDetectionParameters.boundingVolumes.visible = false;
      this.setBoundingVolumesVisibility(false);
    }
    // Set the final action
    this.animations.fadeToAction("Dance", 0.2);
  }

  update() {
    if (!this.gameRunning) {
      if (this.audio.loaded() && this.maze.loaded && this.player.loaded) {
        // If all resources have been loaded
        // Add positional audio sources to objects
        const types = [
          this.audio.introductionClips,
          this.audio.idleClips,
          this.audio.jumpClips,
          this.audio.deathClips,
          this.audio.danceClips,
          this.audio.endClips,
        ];
        types.forEach((type) => {
          type.forEach((clip) => {
            let position = clip.position.split(" ");
            if (position.length === 4 && position[0] === "scene") {
              // Positional audio object (scene specific position in cartesian coordinates)
              position = position.slice(1).map(Number);
              if (
                !Number.isNaN(position[0]) &&
                !Number.isNaN(position[1]) &&
                !Number.isNaN(position[2])
              ) {
                this.scene.add(clip.source);
                clip.source.position.set(position[0], position[1], position[2]);
              }
            } else if (position.length === 3 && position[0] === "maze") {
              // Positional audio object (maze specific position in cell coordinates)
              position = position.slice(1).map(Number);
              if (!Number.isNaN(position[0]) && !Number.isNaN(position[1])) {
                this.scene.add(clip.source);
                position = this.maze.cellToCartesian(position);
                clip.source.position.set(position.x, position.y, position.z);
              }
            } else if (clip.position === "exit") {
              // Positional audio object (maze exit location)
              this.scene.add(clip.source);
              clip.source.position.set(
                this.maze.exitLocation.x,
                this.maze.exitLocation.y,
                this.maze.exitLocation.z
              );
            } else if (clip.position === "initial") {
              // Positional audio object (player initial position)
              this.scene.add(clip.source);
              clip.source.position.set(
                this.maze.initialPosition.x,
                this.maze.initialPosition.y,
                this.maze.initialPosition.z
              );
            } else if (clip.position === "player") {
              // Positional audio object (player current position)
              this.player.add(clip.source);
            } else if (clip.position === "spotlight") {
              // Positional audio object (spotlight current position)
              this.spotLight.add(clip.source);
            }
          });
        });

        // Add the maze, the player and the lights to the scene
        this.scene.add(this.maze);
        this.scene.add(this.player);
        this.scene.add(this.ambientLight);
        this.scene.add(this.directionalLight);
        this.scene.add(this.spotLight);
        this.scene.add(this.flashLight);
        this.scene.add(this.flashLight.target);

        // Create model animations (states, emotes and expressions)
        this.animations = new Animations(this.player);

        // Set the player's position and direction
        // if automated set to the first pos of the route
        if (!this.automatedParameters.isAutomated) {
          this.player.position.set(
            this.maze.initialPosition.x,
            this.maze.initialPosition.y,
            this.maze.initialPosition.z
          );
        } else {
          const route = this.automatedParameters.route;
          const pos = this.maze.cellToCartesian([
            route[0].x - CELL_TO_CARTESIAN_OFFSET.x,
            route[0].y - CELL_TO_CARTESIAN_OFFSET.y,
          ]);
          this.player.position.set(pos.x, this.maze.initialPosition.y, pos.z);
        }
        this.player.direction = this.maze.initialDirection;

        // Set the spotlight target
        this.spotLight.target = this.player;

        // Report the player radius to the flashlight and to the first-person view camera
        this.firstPersonViewCamera.playerRadius = this.playerRadius =
          this.player.radius;

        // Initialize the bounding volumes visibility
        if (this.collisionDetectionParameters.boundingVolumes.visible) {
          this.setBoundingVolumesVisibility(true);
        }

        // Create the user interface
        this.userInterface = new UserInterface(this);

        // Get and configure the user interface checkbox
        this.userInterface.checkBox = document.getElementById("user-interface");
        this.userInterface.checkBox.checked = true;

        // Register the event handler to be called on window resize
        window.addEventListener("resize", (event) => this.windowResize(event));

        // Register the event handler to be called on key down
        document.addEventListener("keydown", (event) =>
          this.keyChange(event, true)
        );

        // Register the event handler to be called on key release
        document.addEventListener("keyup", (event) =>
          this.keyChange(event, false)
        );

        // Register the event handler to be called on mouse down
        document.addEventListener("mousedown", (event) =>
          this.mouseDown(event)
        );

        // Register the event handler to be called on mouse move
        document.addEventListener("mousemove", (event) =>
          this.mouseMove(event)
        );

        // Register the event handler to be called on mouse up
        document.addEventListener("mouseup", (event) => this.mouseUp(event));

        // Register the event handler to be called on mouse wheel
        this.renderer.domElement.addEventListener("wheel", (event) =>
          this.mouseWheel(event)
        );

        // Register the event handler to be called on context menu
        document.addEventListener("contextmenu", (event) =>
          this.contextMenu(event)
        );

        // Register the event handler to be called on select, input number, or input checkbox change
        this.view.addEventListener("change", (event) =>
          this.elementChange(event)
        );
        this.projection.addEventListener("change", (event) =>
          this.elementChange(event)
        );
        this.horizontal.addEventListener("change", (event) =>
          this.elementChange(event)
        );
        this.vertical.addEventListener("change", (event) =>
          this.elementChange(event)
        );
        this.distance.addEventListener("change", (event) =>
          this.elementChange(event)
        );
        this.zoom.addEventListener("change", (event) =>
          this.elementChange(event)
        );
        this.fixedViewCamera.checkBox.addEventListener("change", (event) => {
          localStorage.setItem(
            LOCAL_STORAGE_PREFIX + "fixedViewCamera",
            event.target.checked
          );
          this.elementChange(event);
        });
        this.firstPersonViewCamera.checkBox.addEventListener(
          "change",
          (event) => {
            localStorage.setItem(
              LOCAL_STORAGE_PREFIX + "firstPersonViewCamera",
              event.target.checked
            );
            this.elementChange(event);
          }
        );
        this.thirdPersonViewCamera.checkBox.addEventListener(
          "change",
          (event) => {
            localStorage.setItem(
              LOCAL_STORAGE_PREFIX + "thirdPersonViewCamera",
              event.target.checked
            );
            this.elementChange(event);
          }
        );
        this.topViewCamera.checkBox.addEventListener("change", (event) => {
          localStorage.setItem(
            LOCAL_STORAGE_PREFIX + "topViewCamera",
            event.target.checked
          );
          this.elementChange(event);
        });
        this.statistics.checkBox.addEventListener("change", (event) =>
          this.elementChange(event)
        );
        this.userInterface.checkBox.addEventListener("change", (event) =>
          this.elementChange(event)
        );
        this.help.checkBox.addEventListener("change", (event) =>
          this.elementChange(event)
        );
        this.mazeSelect.addEventListener("change", (event) =>
          this.elementChange(event)
        );

        // Register the event handler to be called on input button click
        this.reset.addEventListener("click", (event) =>
          this.buttonClick(event)
        );
        this.resetAll.addEventListener("click", (event) =>
          this.buttonClick(event)
        );

        // Create the clock
        this.clock = new THREE.Clock();

        // Play an introduction clip
        this.audio.play(this.audio.introductionClips, false);

        // Start the game
        this.gameRunning = true;
      }
    } else {
      // Update the model animations
      const deltaT = this.clock.getDelta();
      this.animations.update(deltaT);

      // Update the player
      if (!this.animations.actionInProgress) {
        // Check if the player found the exit
        const f = this.maze.foundExit(this.player.position);
        if (f) {
          //this.finalSequence();
          const mazeIndex = this.mazeParameters.mazes.findIndex(
            (maze) => maze.name === f
          );
          this.updateMaze(mazeIndex, true);
        } else {
          let coveredDistance = this.player.walkingSpeed * deltaT;
          let directionIncrement = this.player.turningSpeed * deltaT;
          if (this.player.shiftKey) {
            coveredDistance *= this.player.runningFactor;
            directionIncrement *= this.player.runningFactor;
          }
          let playerTurned = false;
          let directionDeg = this.player.direction;

          const directionRad = THREE.MathUtils.degToRad(directionDeg);
          let playerMoved = false;
          const position = this.player.position.clone();

          // enable player controls if automated
          if (!this.automatedParameters.isAutomated) {
            if (this.player.keyStates.left) {
              playerTurned = true;
              directionDeg += directionIncrement;
            } else if (this.player.keyStates.right) {
              playerTurned = true;
              directionDeg -= directionIncrement;
            }

            if (this.player.keyStates.backward) {
              playerMoved = true;
              position.sub(
                new THREE.Vector3(
                  coveredDistance * Math.sin(directionRad),
                  0.0,
                  coveredDistance * Math.cos(directionRad)
                )
              );
            } else if (this.player.keyStates.forward) {
              playerMoved = true;
              position.add(
                new THREE.Vector3(
                  coveredDistance * Math.sin(directionRad),
                  0.0,
                  coveredDistance * Math.cos(directionRad)
                )
              );
            }
          } else if (this.startAutomated) {
            // const position = this.player.position.clone();
            // console.log(position);

            const route = this.automatedParameters.route;

            // automate player controls
            if (this.currRouteIndex === 0) {
              this.currRouteIndex++;
            } else if (this.currRouteIndex === route.length) {
              this.automatedParameters.isAutomated = false;
              this.player.direction += 180;
              this.finalSequence();
            } else {
              const currentRoutePos = route[this.currRouteIndex];
              const goToPos = this.maze.cellToCartesian([
                currentRoutePos.x - CELL_TO_CARTESIAN_OFFSET.x,
                currentRoutePos.y - CELL_TO_CARTESIAN_OFFSET.y,
              ]);

              // advance to next route pos if close enough
              if (
                position.x < goToPos.x + 0.1 &&
                position.x > goToPos.x - 0.1 &&
                position.z < goToPos.z + 0.1 &&
                position.z > goToPos.z - 0.1
              ) {
                this.currRouteIndex++;
              } else {
                const moveX =
                  position.x < goToPos.x
                    ? 1
                    : position.x < goToPos.x + 0.1 &&
                      position.x > goToPos.x - 0.1
                    ? 0
                    : -1;

                const moveZ =
                  position.z < goToPos.z
                    ? 1
                    : position.z < goToPos.z + 0.1 &&
                      position.z > goToPos.z - 0.1
                    ? 0
                    : -1;

                // console.log("position", position.x, position.z);
                // console.log("goToPos", goToPos.x, goToPos.z);
                // console.log(moveX, moveZ);

                // fix rotation
                const shouldBeRotation = Math.atan2(moveX, moveZ);
                const rotationDiff = shouldBeRotation - directionRad;
                const rotationDiffDeg =
                  THREE.MathUtils.radToDeg(rotationDiff) % 360;
                const rotationDiffAbs = Math.abs(rotationDiffDeg);

                // console.log(rotationDiffAbs);

                if (rotationDiffAbs < 1.0 || rotationDiffAbs > 359.0) {
                  playerMoved = true;
                  position.add(
                    new THREE.Vector3(
                      coveredDistance * moveX,
                      0.0,
                      coveredDistance * moveZ
                    )
                  );
                } else {
                  playerTurned = true;
                  if (rotationDiffAbs < 180) {
                    directionDeg +=
                      rotationDiffDeg > 0
                        ? directionIncrement
                        : -directionIncrement;
                  } else {
                    directionDeg +=
                      rotationDiffDeg > 0
                        ? -directionIncrement
                        : directionIncrement;
                  }
                }
              }
            }
          }

          this.maze.models.forEach((model) => {
            model.forEach((clip) => {
              clip.mixer.update(0.01);
            });
          });
          if (
            this.maze.collision(
              this.collisionDetectionParameters.method,
              position,
              this.collisionDetectionParameters.method !== "obb-aabb"
                ? this.player.radius
                : this.player.halfSize,
              directionRad - this.player.defaultDirection
            )
          ) {
            this.audio.play(this.audio.deathClips, false);
            this.animations.fadeToAction("Death", 0.2);
          } else if (this.player.keyStates.jump) {
            this.audio.play(this.audio.jumpClips, true);
            this.animations.fadeToAction("Jump", 0.2);
          } else if (this.player.keyStates.yes) {
            this.animations.fadeToAction("Yes", 0.2);
          } else if (this.player.keyStates.no) {
            this.animations.fadeToAction("No", 0.2);
          } else if (this.player.keyStates.wave) {
            this.animations.fadeToAction("Wave", 0.2);
          } else if (this.player.keyStates.punch) {
            this.animations.fadeToAction("Punch", 0.2);
          } else if (this.player.keyStates.thumbsUp) {
            this.animations.fadeToAction("ThumbsUp", 0.2);
          } else {
            if (playerTurned) {
              this.player.direction = directionDeg;
            }
            if (playerMoved) {
              this.animations.fadeToAction(
                this.player.shiftKey ? "Running" : "Walking",
                0.2
              );
              this.player.position.set(position.x, position.y, position.z);
            } else {
              if (this.animations.idleTimeOut()) {
                this.animations.resetIdleTime();
                this.audio.play(this.audio.idleClips, false);
              }
              this.animations.fadeToAction(
                "Idle",
                this.animations.activeName !== "Death" ? 0.2 : 0.6
              );
            }
          }

          this.player.rotation.y = directionRad - this.player.defaultDirection;
        }
      }

      // Update the flashlight, first-person view, third-person view and top view camera parameters (player orientation and target)
      const orientation = new THREE.Quaternion();
      this.player.getWorldQuaternion(orientation);
      let target = new THREE.Vector3(
        this.player.position.x,
        this.player.position.y + this.player.face.worldPosition.y,
        this.player.position.z
      );
      this.topViewCamera.playerOrientation = orientation;
      this.topViewCamera.setTarget(target);
      this.thirdPersonViewCamera.playerOrientation = orientation;
      this.thirdPersonViewCamera.setTarget(target);
      const directionRad = THREE.MathUtils.degToRad(this.player.direction);
      if (!this.realisticViewModeCheckBox.checked) {
        this.firstPersonViewCamera.playerOrientation = orientation;
        this.firstPersonViewCamera.setTarget(target);
        this.flashLight.playerOrientation = orientation;
        target = new THREE.Vector3(
          this.player.position.x + this.player.radius * Math.sin(directionRad),
          this.player.position.y + this.player.size.y,
          this.player.position.z + this.player.radius * Math.cos(directionRad)
        );
        this.flashLight.setTarget(target);
      } else {
        this.player.headEnd.getWorldQuaternion(orientation);
        this.player.face.getWorldPosition(target);
        this.firstPersonViewCamera.playerOrientation = orientation;
        this.firstPersonViewCamera.setTarget(target);
        this.flashLight.playerOrientation = orientation;
        target.add(
          new THREE.Vector3(
            this.player.radius * Math.sin(directionRad),
            this.player.size.y - this.player.face.worldPosition.y,
            this.player.radius * Math.cos(directionRad)
          )
        );
        this.flashLight.setTarget(target);
      }

      // Update statistics
      this.statistics.update();

      // Render primary viewports
      this.enableShadows(this.shadowsParameters.enabled);
      this.enableFog(this.fog.enabled);
      this.renderer.clearColor();
      for (let i = this.visibleViewportCameras.length - 1; i >= 0; i--) {
        // Primary viewports must be rendered in reverse order: the topmost visible one will be rendered last
        const camera = this.visibleViewportCameras[i];
        if (this.fog.enabled) {
          this.fog.density = camera.fogDensity;
        }
        this.player.visible = camera != this.firstPersonViewCamera;
        this.renderer.setViewport(
          camera.viewport.x,
          camera.viewport.y,
          camera.viewport.width,
          camera.viewport.height
        );
        if (this.cubeTexture.name === "None" || this.fog.enabled) {
          this.background.children[0].material.color.set(
            this.fog.enabled ? this.fog.color : camera.backgroundColor
          );
          this.renderer.render(this.background, this.camera2D); // Render the background
        }
        this.renderer.clearDepth();
        this.renderer.render(this.scene, camera.activeProjection); // Render the scene
        this.frame.children[0].material.color.set(camera.frameColor);
        this.renderer.render(this.frame, this.camera2D); // Render the frame
      }

      // Render secondary viewport (mini-map)
      if (this.miniMapCamera.checkBox.checked) {
        this.enableShadows(false);
        this.scene.background = null;
        this.scene.fog = null;
        this.player.visible = true;
        this.renderer.setViewport(
          this.miniMapCamera.viewport.x,
          this.miniMapCamera.viewport.y,
          this.miniMapCamera.viewport.width,
          this.miniMapCamera.viewport.height
        );
        this.background.children[0].material.color.set(
          this.miniMapCamera.backgroundColor
        );
        this.renderer.render(this.background, this.camera2D); // Render the background
        this.renderer.clearDepth();
        this.renderer.render(this.scene, this.miniMapCamera.activeProjection); // Render the scene
        this.frame.children[0].material.color.set(
          this.miniMapCamera.frameColor
        );
        this.renderer.render(this.frame, this.camera2D); // Render the frame
      }
    }
  }

  unmount() {
    this.renderer.domElement.remove();
    this.userInterface.destroy();
    this.statistics.dom.remove();
  }
}
