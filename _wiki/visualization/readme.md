# Visualization Module

The visualization module is a module that allows the user to visualize the simulations in a 3D environment. It is a module that is not part of the core of the system, but it is a module that can be used to visualize the simulations in a more user-friendly way.

In this document we will not enter in great detail about the implementation of the visualization module, but we will explain the main concepts and how to use it.

## How to use

To use the visualization module, you must first have the `md-management` module running. To do this, run the following command:

```bash
cd md-management; pnpm dev
```

Then, you must have the `web` module running. To do this, run the following command:

```bash
cd web; pnpm dev
```

After this, you can open the web application in your browser at the following address: `http://localhost:3000`.

Then, authenticate with your user and password. After this, if you have a role that allows you to access the visualization module **(Admin & Campus)**, you will see a new card in the main frame called `Campus Explorer`. Click on it and you will be redirected to the visualization module. You can also access the visualization module directly by going to the following address: `http://localhost:3000/floor-editor`.

Other users will not be able to access the visualization module.

## How it works

The visualization module is a module that is based on the `web` module. It is a module that is not part of the core of the system, but it is a module that can be used to visualize the simulations in a more user-friendly way.

It fetches all the floor data from the `md-management` module and renders it in a 3D environment.

In this module, the user can see the floor plan, the doors, the rooms, the elevators & the corridors. By going near an elevator or a door, the user can change the current floor using the menu that appears.

## Automatic Navigation

**WRITE HERE ABOUT THE AUTOMATIC NAVIGATION**

## Manual Navigation

### Controls

The user can navigate through the 3D environment using the following controls:

- `UP ARROW` - Move forward
- `DOWN ARROW` - Move backward
- `LEFT ARROW` - Move left
- `RIGHT ARROW` - Move right
- `V` - Toggle between the 4 available cameras in fullscreen mode
- `Mouse Wheel` - Zoom in/out
- `Mouse Left Button` - Rotate the camera
- `Mouse Right Button` - Move the viewport

### Menus

The left side menu controls the available viewport cameras. The user can click on the camera icon to change what cameras are available at a given time. This decision persists between sessions.

The top menu controls the current camera. The user can adjust some fields using manual controls, like zoom, height, etc.
