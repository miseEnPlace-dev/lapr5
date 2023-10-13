# LAPR5 Wiki - Group 52

## Domain Model

![Domain Model](./dm/dm.svg)

## Client Clarifications

You can check the client clarifications throughout the project in the following link: [Client Clarifications](./client_clarifications/readme.md)

## Use Case Diagram

The use cases of each sprint are described in [this section](./ucd/readme.md).

## Group Members

| Student Nr. | Name            |
| ----------- | --------------- |
| 1211299     | André Barros    | 5 |
| 1211277     | Carlos Lopes    | 1 |
| 1211285     | Ricardo Moreira | 3 |
| 1211289     | Tomás Lopes     | 4 |
| 1211288     | Tomás Russo     | 2 |

## Requirements

### Sprint A

| ID                                      | Assigned To               |
| --------------------------------------- | ------------------------- |
| [01 [150]](sprint-a/us01-150/readme.md) | 1211277, 1211289, 1211299 |
| [02 [160]](sprint-a/us02-160/readme.md) | 1211277                   |
| [03 [170]](sprint-a/us03-170/readme.md) | 1211277                   |
| [04 [180]](sprint-a/us04-180/readme.md) | 1211288                   |
| [05 [190]](sprint-a/us05-190/readme.md) | 1211277, 1211288, 1211299 |
| [06 [200]](sprint-a/us06-200/readme.md) | 1211288                   |
| [07 [210]](sprint-a/us07-210/readme.md) | 1211288                   |
| [08 [220]](sprint-a/us08-220/readme.md) | 1211285                   |
| [09 [230]](sprint-a/us09-230/readme.md) | 1211277                   |
| [10 [240]](sprint-a/us10-240/readme.md) | 1211277, 1211285, 1211288 |
| [11 [250]](sprint-a/us11-250/readme.md) | 1211285                   |
| [12 [260]](sprint-a/us12-260/readme.md) | 1211285, 1211289          |
| [13 [270]](sprint-a/us13-270/readme.md) | 1211285, 1211288, 1211289 |
| [14 [280]](sprint-a/us14-280/readme.md) | 1211289                   |
| [15 [290]](sprint-a/us15-290/readme.md) | 1211289                   |
| [16 [300]](sprint-a/us16-300/readme.md) | 1211299                   |
| [17 [310]](sprint-a/us17-310/readme.md) | 1211285, 1211289, 1211299 |
| [18 [350]](sprint-a/us18-350/readme.md) | 1211277, 1211288, 1211289 |
| [19 [360]](sprint-a/us19-360/readme.md) | 1211285, 1211288          |
| [20 [370]](sprint-a/us20-370/readme.md) | 1211277, 1211285          |
| [21 [380]](sprint-a/us21-380/readme.md) | 1211289, 1211299          |
| [22 [390]](sprint-a/us22-390/readme.md) | 1211299                   |
| [23 [760]](sprint-a/us23-760/readme.md) | All                       |

| ID       | Module                  | Requirement                                                                                | Obs.      | UC    | Assigned To |
| -------- | ----------------------- | ------------------------------------------------------------------------------------------ | --------- | ----- | ----------- |
| 01 [150] | 1.2 - Campus Management | Create building                                                                            | POST      | ARQSI |
| 02 [160] | 1.2 - Campus Management | Edit building                                                                              | PUT/PATCH | ARQSI |
| 03 [170] | 1.2 - Campus Management | List all buildings                                                                         | GET       | ARQSI |
| 04 [180] | 1.2 - Campus Management | List buildings w/ min & max floors                                                         | GET       | ARQSI |
| 05 [190] | 1.2 - Campus Management | Create floor                                                                               | POST      | ARQSI |
| 06 [200] | 1.2 - Campus Management | Edit floor info                                                                            | PUT/PATCH | ARQSI |
| 07 [210] | 1.2 - Campus Management | List building's floors                                                                     | GET       | ARQSI |
| 08 [220] | 1.2 - Campus Management | List floors with connectors to other buildings                                             | GET       | ARQSI |
| 09 [230] | 1.2 - Campus Management | Load floor map                                                                             | PATCH     | ARQSI |
| 10 [240] | 1.2 - Campus Management | Create connector between buildings                                                         | POST      | ARQSI |
| 11 [250] | 1.2 - Campus Management | Edit connector between buildings                                                           | PUT/PATCH | ARQSI |
| 12 [260] | 1.2 - Campus Management | List connectors between 2 buildings                                                        | GET       | ARQSI |
| 13 [270] | 1.2 - Campus Management | Create elevator in a building                                                              | POST      | ARQSI |
| 14 [280] | 1.2 - Campus Management | Edit elevator                                                                              | PUT/PATCH | ARQSI |
| 15 [290] | 1.2 - Campus Management | List building's elevators                                                                  | GET       | ARQSI |
| 16 [300] | 1.2 - Campus Management | List floors served by an elevator                                                          | GET       | ARQSI |
| 17 [310] | 1.2 - Campus Management | Create room in a floor                                                                     | POST      | ARQSI |
| 18 [350] | 1.3 - Fleet Management  | Add a new robot type with a name and assign specific tasks from a predefined list of tasks | POST      | ARQSI |
| 19 [360] | 1.3 - Fleet Management  | Add a new robot with a given type, name, etc.                                              | POST      | ARQSI |
| 20 [370] | 1.3 - Fleet Management  | Disable a robot                                                                            | PATCH     | ARQSI |
| 21 [380] | 1.3 - Fleet Management  | List all robots                                                                            | GET       | ARQSI |
| 22 [390] | 1.3 - Fleet Management  | List all robots filtering by designation or task                                           | GET       | ARQSI |
| 23 [760] | Integration             |                                                                                            |           | ARQSI |
