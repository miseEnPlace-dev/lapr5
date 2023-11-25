// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import * as THREE from "three";

import Ground from "./ground.ts";
import { merge } from "./merge.ts";
import Wall from "./wall.ts";

import { OBB } from "three/addons/math/OBB.js";
import * as BufferGeometryUtils from "three/addons/utils/BufferGeometryUtils.js";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

/*
 * parameters = {
 *  url: String,
 *  designCredits: String,
 *  texturesCredits: String,
 *  scale: Vector3,
 *  helpersColor: Color
 * }
 */

export default class Maze extends THREE.Group {
  constructor(parameters) {
    super();
    merge(this, parameters);
    this.loaded = false;
    this.models = Array.from(Array(100), () => new Array(100));

    this.onLoad = function (description) {
      const normalMapTypes = [
        THREE.TangentSpaceNormalMap,
        THREE.ObjectSpaceNormalMap,
      ];
      const wrappingModes = [
        THREE.ClampToEdgeWrapping,
        THREE.RepeatWrapping,
        THREE.MirroredRepeatWrapping,
      ];
      const magnificationFilters = [THREE.NearestFilter, THREE.LinearFilter];
      const minificationFilters = [
        THREE.NearestFilter,
        THREE.NearestMipmapNearestFilter,
        THREE.NearestMipmapLinearFilter,
        THREE.LinearFilter,
        THREE.LinearMipmapNearestFilter,
        THREE.LinearMipmapLinearFilter,
      ];

      // Store the maze's size, map and exit location
      console.log({ description });
      this.size = description.maze.size;
      this.halfSize = {
        width: this.size.width / 2.0,
        depth: this.size.depth / 2.0,
      };
      this.map = description.maze.map;
      this.exitLocation = this.cellToCartesian(description.maze.exitLocation);

      // Create the helpers
      this.helper = new THREE.Group();

      // Create the ground
      const ground = new Ground({
        size: new THREE.Vector3(
          description.ground.size.width,
          description.ground.size.height,
          description.ground.size.depth
        ),
        segments: new THREE.Vector3(
          description.ground.segments.width,
          description.ground.segments.height,
          description.ground.segments.depth
        ),
        materialParameters: {
          color: new THREE.Color(parseInt(description.ground.primaryColor, 16)),
          mapUrl: description.ground.maps.color.url,
          aoMapUrl: description.ground.maps.ao.url,
          aoMapIntensity: description.ground.maps.ao.intensity,
          displacementMapUrl: description.ground.maps.displacement.url,
          displacementScale: description.ground.maps.displacement.scale,
          displacementBias: description.ground.maps.displacement.bias,
          normalMapUrl: description.ground.maps.normal.url,
          normalMapType: normalMapTypes[description.ground.maps.normal.type],
          normalScale: new THREE.Vector2(
            description.ground.maps.normal.scale.x,
            description.ground.maps.normal.scale.y
          ),
          bumpMapUrl: description.ground.maps.bump.url,
          bumpScale: description.ground.maps.bump.scale,
          roughnessMapUrl: description.ground.maps.roughness.url,
          roughness: description.ground.maps.roughness.rough,
          wrapS: wrappingModes[description.ground.wrapS],
          wrapT: wrappingModes[description.ground.wrapT],
          repeat: new THREE.Vector2(
            description.ground.repeat.u,
            description.ground.repeat.v
          ),
          magFilter: magnificationFilters[description.ground.magFilter],
          minFilter: minificationFilters[description.ground.minFilter],
        },
        secondaryColor: new THREE.Color(
          parseInt(description.ground.secondaryColor, 16)
        ),
      });
      this.add(ground);

      // Create a wall
      const wall = new Wall({
        groundHeight: description.ground.size.height,
        segments: new THREE.Vector2(
          description.wall.segments.width,
          description.wall.segments.height
        ),
        materialParameters: {
          color: new THREE.Color(parseInt(description.wall.primaryColor, 16)),
          mapUrl: description.wall.maps.color.url,
          aoMapUrl: description.wall.maps.ao.url,
          aoMapIntensity: description.wall.maps.ao.intensity,
          displacementMapUrl: description.wall.maps.displacement.url,
          displacementScale: description.wall.maps.displacement.scale,
          displacementBias: description.wall.maps.displacement.bias,
          normalMapUrl: description.wall.maps.normal.url,
          normalMapType: normalMapTypes[description.wall.maps.normal.type],
          normalScale: new THREE.Vector2(
            description.wall.maps.normal.scale.x,
            description.wall.maps.normal.scale.y
          ),
          bumpMapUrl: description.wall.maps.bump.url,
          bumpScale: description.wall.maps.bump.scale,
          roughnessMapUrl: description.wall.maps.roughness.url,
          roughness: description.wall.maps.roughness.rough,
          wrapS: wrappingModes[description.wall.wrapS],
          wrapT: wrappingModes[description.wall.wrapT],
          repeat: new THREE.Vector2(
            description.wall.repeat.u,
            description.wall.repeat.v
          ),
          magFilter: magnificationFilters[description.wall.magFilter],
          minFilter: minificationFilters[description.wall.minFilter],
        },
        secondaryColor: new THREE.Color(
          parseInt(description.wall.secondaryColor, 16)
        ),
      });

      // Build the maze
      let geometry;
      const geometries = [];
      geometries[0] = [];
      geometries[1] = [];
      this.aabb = [];
      for (let i = 0; i <= this.size.depth; i++) {
        // In order to represent the southmost walls, the map depth is one row greater than the actual maze depth
        this.aabb[i] = [];
        for (let j = 0; j <= this.size.width; j++) {
          // In order to represent the eastmost walls, the map width is one column greater than the actual maze width
          this.aabb[i][j] = [];
          /*
           *  this.map[][] | North wall | West wall
           * --------------+------------+-----------
           *       0       |     No     |     No
           *       1       |     No     |    Yes
           *       2       |    Yes     |     No
           *       3       |    Yes     |    Yes
           */
          if (this.map[i][j] === 2 || this.map[i][j] === 3) {
            this.aabb[i][j][0] = new THREE.Box3();
            for (let k = 0; k < 2; k++) {
              geometry = wall.geometries[k].clone();
              geometry.applyMatrix4(
                new THREE.Matrix4().makeTranslation(
                  j - this.halfSize.width + 0.5,
                  0.25,
                  i - this.halfSize.depth
                )
              );

              geometry.computeBoundingBox();
              geometry.boundingBox.applyMatrix4(
                new THREE.Matrix4().makeScale(
                  this.scale.x,
                  this.scale.y,
                  this.scale.z
                )
              );
              geometries[k].push(geometry);
              this.aabb[i][j][0].union(geometry.boundingBox);
            }
            this.helper.add(
              new THREE.Box3Helper(this.aabb[i][j][0], this.helpersColor)
            );
          }
          if (this.map[i][j] === 1 || this.map[i][j] === 3) {
            this.aabb[i][j][1] = new THREE.Box3();
            for (let k = 0; k < 2; k++) {
              geometry = wall.geometries[k].clone();
              geometry.applyMatrix4(
                new THREE.Matrix4().makeRotationY(Math.PI / 2.0)
              );
              geometry.applyMatrix4(
                new THREE.Matrix4().makeTranslation(
                  j - this.halfSize.width,
                  0.25,
                  i - this.halfSize.depth + 0.5
                )
              );

              geometry.computeBoundingBox();
              geometry.boundingBox.applyMatrix4(
                new THREE.Matrix4().makeScale(
                  this.scale.x,
                  this.scale.y,
                  this.scale.z
                )
              );
              geometries[k].push(geometry);
              this.aabb[i][j][1].union(geometry.boundingBox);
            }
            this.helper.add(
              new THREE.Box3Helper(this.aabb[i][j][1], this.helpersColor)
            );
          }
          if (this.map[i][j] === 4 || this.map[i][j] === 5) {
            // load a glTF resource
            const loader = new GLTFLoader();
            const half = this.halfSize;

            loader.load(
              // resource URL
              description.elevator.url,
              // called when the resource is loaded
              (gltf) => {
                gltf.scene.scale.set(
                  description.elevator.scale.x,
                  description.elevator.scale.y,
                  description.elevator.scale.z
                );
                gltf.scene.position.set(j - half.width, 0.5, i - half.depth);
                if (this.map[i][j] === 4) {
                  gltf.scene.rotation.y = Math.PI / 2;
                } else if (this.map[i][j] === 5) {
                  gltf.scene.rotation.y = -Math.PI / 2;
                }
                this.models[i][j] = {
                  mixer: new THREE.AnimationMixer(gltf.scene),
                  clips: gltf.animations,
                };
                this.add(gltf.scene);
              },
              // called while loading is progressing
              function (xhr) {
                console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
              },
              // called when loading has errors
              function (error) {
                console.log("An error happened", error);
              }
            );
          }

          if (this.map[i][j] === 11 || this.map[i][j] === 12) {
            this.aabb[i][j][0] = new THREE.Box3();
            for (let k = 0; k < 2; k++) {
              geometry = wall.geometries[k].clone();
              if (this.map[i][j] === 11) {
                geometry.applyMatrix4(
                  new THREE.Matrix4().makeRotationY(Math.PI / 2.0)
                );
              } else if (this.map[i][j] === 12) {
                geometry.applyMatrix4(
                  new THREE.Matrix4().makeRotationY(-Math.PI)
                );
              }

              if (this.map[i][j] === 11) {
                geometry.applyMatrix4(
                  new THREE.Matrix4().makeTranslation(
                    j - this.halfSize.width,
                    0.25,
                    (i - this.halfSize.depth) * 2 + 1.5
                  )
                );
              } else if (this.map[i][j] === 12) {
                geometry.applyMatrix4(
                  new THREE.Matrix4().makeTranslation(
                    j - this.halfSize.width + 1,
                    0.25,
                    (i - this.halfSize.depth) * 2
                  )
                );
              }

              geometry.computeBoundingBox();
              geometry.boundingBox.applyMatrix4(
                new THREE.Matrix4().makeScale(
                  this.scale.x,
                  this.scale.y,
                  this.scale.z
                )
              );
              geometry.scale(1, 1, 0.5);
              geometries[k].push(geometry);
              this.aabb[i][j][0].union(geometry.boundingBox);
            }
            this.helper.add(
              new THREE.Box3Helper(this.aabb[i][j][0], this.helpersColor)
            );

            // load a glTF resource
            const loader = new GLTFLoader();
            const half = this.halfSize;

            loader.load(
              // resource URL
              description.door.url,
              // called when the resource is loaded
              (gltf) => {
                gltf.scene.scale.set(
                  description.door.scale.x,
                  description.door.scale.y,
                  description.door.scale.z
                );
                if (this.map[i][j] === 11) {
                  gltf.scene.rotation.y = Math.PI / 2;
                  gltf.scene.position.set(
                    j - half.width,
                    0,
                    i - half.depth + 0.25
                  );
                } else if (this.map[i][j] === 12) {
                  gltf.scene.rotation.y = -Math.PI;
                  gltf.scene.position.set(
                    j - half.width + 0.25,
                    0,
                    i - half.depth
                  );
                }

                this.models[i][j] = {
                  mixer: new THREE.AnimationMixer(gltf.scene),
                  clips: gltf.animations,
                };
                this.add(gltf.scene);
              },
              // called while loading is progressing
              function (xhr) {
                console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
              },
              // called when loading has errors
              function (error) {
                console.log("An error happened", error);
              }
            );
          }
        }
      }

      let mergedGeometry, mesh;
      for (let i = 0; i < 2; i++) {
        mergedGeometry = BufferGeometryUtils.mergeGeometries(
          geometries[i],
          false
        );
        mesh = new THREE.Mesh(mergedGeometry, wall.materials[i]);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        this.add(mesh);
      }

      // Store the player's initial position and direction
      this.initialPosition = this.cellToCartesian(
        description.player.initialPosition
      );
      this.initialDirection = description.player.initialDirection;

      this.loaded = true;
    };

    // The cache must be enabled; additional information available at https://threejs.org/docs/api/en/loaders/FileLoader.html
    THREE.Cache.enabled = true;

    console.log({ parameters: parameters.mazes[parameters.selected] })
    this.onLoad(parameters.mazes[parameters.selected].maze);
  }

  // Convert cell [row, column] coordinates to cartesian (x, y, z) coordinates
  cellToCartesian(position) {
    return new THREE.Vector3(
      (position[1] - this.halfSize.width + 0.5) * this.scale.x,
      0.0,
      (position[0] - this.halfSize.depth + 0.5) * this.scale.z
    );
  }

  // Convert cartesian (x, y, z) coordinates to cell [row, column] coordinates
  cartesianToCell(position) {
    return [
      Math.floor(position.z / this.scale.z + this.halfSize.depth),
      Math.floor(position.x / this.scale.x + this.halfSize.width),
    ];
  }

  // Detect collision with corners (method: BC/AABB)
  cornerCollision(
    indices,
    offsets,
    orientation,
    position,
    delta,
    radius,
    name
  ) {
    const row = indices[0] + offsets[0];
    const column = indices[1] + offsets[1];
    if (
      this.map[row][column] === 2 - orientation ||
      this.map[row][column] === 3
    ) {
      const x =
        position.x -
        (this.cellToCartesian([row, column]).x + delta.x * this.scale.x);
      const z =
        position.z -
        (this.cellToCartesian([row, column]).z + delta.z * this.scale.z);
      if (x * x + z * z < radius * radius) {
        console.log("Collision with " + name + ".");
        return true;
      }
    }
    return false;
  }

  // Detect collision with walls (method: BC/AABB)
  wallCollision(indices, offsets, orientation, position, delta, radius, name) {
    const row = indices[0] + offsets[0];
    const column = indices[1] + offsets[1];
    if (
      this.map[row][column] === 2 - orientation ||
      this.map[row][column] === 3
    ) {
      if (orientation !== 0) {
        if (
          Math.abs(
            position.x -
            (this.cellToCartesian([row, column]).x + delta.x * this.scale.x)
          ) < radius
        ) {
          console.log("Collision with " + name + ".");
          return true;
        }
      } else {
        if (
          Math.abs(
            position.z -
            (this.cellToCartesian([row, column]).z + delta.z * this.scale.z)
          ) < radius
        ) {
          console.log("Collision with " + name + ".");
          return true;
        }
      }
    }

    if (this.map[row][column] === 4 || this.map[row][column] === 5) {
      if (orientation === 0) {
        if (
          Math.abs(
            position.z -
            (this.cellToCartesian([row, column]).z + delta.z * this.scale.z)
          ) < radius
        ) {
          document
            .getElementById("maps-panel")
            ?.setAttribute("style", "display: block");
          console.log("dentro do elevador");
          return false;
        }
        document
          .getElementById("maps-panel")
          ?.setAttribute("style", "display: none");
      }
    }

    if (this.map[row][column] === 11) {
      if (orientation !== 0) {
        if (
          Math.abs(
            position.x -
            (this.cellToCartesian([row, column]).x + delta.x * this.scale.x)
          ) < radius
        ) {
          console.log("Collision with " + name + ".");
          this.playOpenDoorAnimation(row, column);

          return false;
        }
      }
    }
    if (this.map[row][column] === 12) {
      if (orientation === 0) {
        if (
          Math.abs(
            position.z -
            (this.cellToCartesian([row, column]).z + delta.z * this.scale.z)
          ) < radius
        ) {
          this.playOpenDoorAnimation(row, column);
          console.log("Collision with " + name + ".");

          return false;
        }
      }
    }
    return false;
  }

  playOpenDoorAnimation(x, y) {
    const action = this.models[x][y].mixer.clipAction(
      this.models[x][y].clips[6]
    );
    action.reset().setEffectiveTimeScale(3).setLoop(THREE.LoopOnce, 1).play();
  }

  // Detect collision with walls and corners (method: OBB/AABB)
  wallAndCornerCollision(indices, offsets, orientation, obb, name) {
    const row = indices[0] + offsets[0];
    const column = indices[1] + offsets[1];
    if (
      this.map[row][column] === 2 - orientation ||
      this.map[row][column] === 3 ||
      this.map[row][column] === 11 ||
      this.map[row][column] === 12
    ) {
      if (obb.intersectsBox3(this.aabb[row][column][orientation])) {
        console.log("Collision with " + name + ".");
        return true;
      }
    }
    return false;
  }

  // Detect collisions
  collision(method, position, halfSize, direction) {
    const indices = this.cartesianToCell(position);
    if (method !== "obb-aabb") {
      if (
        this.wallCollision(
          indices,
          [0, 0],
          0,
          position,
          { x: 0.0, z: -0.475 },
          halfSize,
          "north wall"
        ) || // Collision with north wall
        this.wallCollision(
          indices,
          [0, 0],
          1,
          position,
          { x: -0.475, z: 0.0 },
          halfSize,
          "west wall"
        ) || // Collision with west wall
        this.wallCollision(
          indices,
          [1, 0],
          0,
          position,
          { x: 0.0, z: -0.525 },
          halfSize,
          "south wall"
        ) || // Collision with south wall
        this.wallCollision(
          indices,
          [0, 1],
          1,
          position,
          { x: -0.525, z: 0.0 },
          halfSize,
          "east wall"
        ) || // Collision with east wall
        this.cornerCollision(
          indices,
          [1, 0],
          1,
          position,
          { x: -0.475, z: -0.5 },
          halfSize,
          "southwest corner (NS-oriented wall)"
        ) || // Collision with southwest corner (NS-oriented wall)
        this.cornerCollision(
          indices,
          [1, 1],
          0,
          position,
          { x: -0.5, z: -0.525 },
          halfSize,
          "southeast corner (WE-oriented wall)"
        ) || // Collision with southeast corner (WE-oriented wall)
        this.cornerCollision(
          indices,
          [1, 1],
          1,
          position,
          { x: -0.525, z: -0.5 },
          halfSize,
          "southeast corner (NS-oriented wall)"
        ) || // Collision with southeast corner (NS-oriented wall)
        this.cornerCollision(
          indices,
          [0, 1],
          0,
          position,
          { x: -0.5, z: -0.475 },
          halfSize,
          "northeast corner (WE-oriented wall)"
        ) || // Collision with northeast corner (WE-oriented wall)
        (indices[0] > 0 &&
          (this.cornerCollision(
            indices,
            [-1, 1],
            1,
            position,
            { x: -0.525, z: 0.5 },
            halfSize,
            "northeast corner (NS-oriented wall)"
          ) || // Collision with northeast corner (NS-oriented wall)
            this.cornerCollision(
              indices,
              [-1, 0],
              1,
              position,
              { x: -0.475, z: 0.5 },
              halfSize,
              "northwest corner (NS-oriented wall)"
            ))) || // Collision with northwest corner (NS-oriented wall)
        (indices[1] > 0 &&
          (this.cornerCollision(
            indices,
            [0, -1],
            0,
            position,
            { x: 0.5, z: -0.475 },
            halfSize,
            "northwest corner (WE-oriented wall)"
          ) || // Collision with northwest corner (WE-oriented wall)
            this.cornerCollision(
              indices,
              [1, -1],
              0,
              position,
              { x: 0.5, z: -0.525 },
              halfSize,
              "southwest corner (WE-oriented wall)"
            ))) // Collision with southwest corner (WE-oriented wall)
      ) {
        return true;
      }
      // No collision
      return false;
    } else {
      // Create the object's oriented bounding box (OBB) in 3D space and set its orientation
      const obb = new OBB(position, halfSize);
      obb.applyMatrix4(new THREE.Matrix4().makeRotationY(direction));
      if (
        this.wallAndCornerCollision(indices, [0, 0], 0, obb, "north wall") || // Collision with north wall
        this.wallAndCornerCollision(indices, [0, 0], 1, obb, "west wall") || // Collision with west wall
        this.wallAndCornerCollision(indices, [1, 0], 0, obb, "south wall") || // Collision with south wall
        this.wallAndCornerCollision(indices, [0, 1], 1, obb, "east wall") || // Collision with east wall
        this.wallAndCornerCollision(
          indices,
          [1, 0],
          1,
          obb,
          "southwest corner (NS-oriented wall)"
        ) || // Collision with southwest corner (NS-oriented wall)
        this.wallAndCornerCollision(
          indices,
          [1, 1],
          0,
          obb,
          "southeast corner (WE-oriented wall)"
        ) || // Collision with southeast corner (WE-oriented wall)
        this.wallAndCornerCollision(
          indices,
          [1, 1],
          1,
          obb,
          "southeast corner (NS-oriented wall)"
        ) || // Collision with southeast corner (NS-oriented wall)
        this.wallAndCornerCollision(
          indices,
          [0, 1],
          0,
          obb,
          "northeast corner (WE-oriented wall)"
        ) || // Collision with northeast corner (WE-oriented wall)
        (indices[0] > 0 &&
          (this.wallAndCornerCollision(
            indices,
            [-1, 1],
            1,
            obb,
            "northeast corner (NS-oriented wall)"
          ) || // Collision with northeast corner (NS-oriented wall)
            this.wallAndCornerCollision(
              indices,
              [-1, 0],
              1,
              obb,
              "northwest corner (NS-oriented wall)"
            ))) || // Collision with northwest corner (NS-oriented wall)
        (indices[1] > 0 &&
          (this.wallAndCornerCollision(
            indices,
            [0, -1],
            0,
            obb,
            "northwest corner (WE-oriented wall)"
          ) || // Collision with northwest corner (WE-oriented wall)
            this.wallAndCornerCollision(
              indices,
              [1, -1],
              0,
              obb,
              "southwest corner (WE-oriented wall)"
            ))) // Collision with southwest corner (WE-oriented wall)
      ) {
        return true;
      }
      // No collision
      return false;
    }
  }

  foundExit(position) {
    return (
      Math.abs(position.x - this.exitLocation.x) < 0.5 * this.scale.x &&
      Math.abs(position.z - this.exitLocation.z) < 0.5 * this.scale.z
    );
  }
}
