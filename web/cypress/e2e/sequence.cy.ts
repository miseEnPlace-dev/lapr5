const BASE_URL = "http://localhost:4000/api";

describe("Task Sequece", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.intercept("POST", BASE_URL + "/users/login", {
      statusCode: 200,
      body: {
        userDTO: {
          firstName: "Task",
          lastName: "Manager",
          role: "task",
        },
      },
    });
    cy.get("input[name=Email]").type("task@isep.ipp.pt");
    cy.get("input[name=Password]").type("task");
    cy.get("button[name=login]").click();
    localStorage.setItem("token", "token");
    cy.intercept("GET", BASE_URL + "/me", {
      statusCode: 200,
      body: {
        firstName: "Task",
        lastName: "Manager",
        role: "task",
      },
    });
    cy.visit("/task-sequence");
  });

  it("should see no approved tasks message", () => {
    cy.intercept("GET", BASE_URL + "/tasks", {
      statusCode: 200,
      body: {},
    });

    cy.get("main")
      .get("p")
      .should(
        "contain",
        "There are no approved tasks to generate a valid sequence..."
      );
  });

  it("should be able to navigate to requests page", () => {
    cy.intercept("GET", BASE_URL + "/devices/robots?limit=1000&page=1", {
      statusCode: 200,
      body: { data: [] },
    });

    cy.get("main").get("a").contains("go back");
  });

  it("should have all devices in select", () => {
    cy.intercept("GET", BASE_URL + "/devices/robots?limit=1000&page=1", {
      statusCode: 200,
      body: {
        data: [
          {
            id: "9ca683d6-178f-4991-9b90-6c7a3bdb9659",
            code: "guard",
            nickname: "ISEP Guard",
            description: "ISEP Security Guard",
            serialNumber: "RBT1",
            modelCode: "SRV",
            isAvailable: true,
            initialCoordinates: {
              width: 7,
              depth: 21,
              floorCode: "b1",
            },
          },
          {
            id: "1d18a4f0-1982-4a7f-9227-8b70473c64af",
            code: "deliver",
            nickname: "ISEP Delivery Guy",
            description: "ISEP Pick and Delivery Robot",
            serialNumber: "RBT2",
            modelCode: "DLV",
            isAvailable: true,
            initialCoordinates: {
              width: 7,
              depth: 21,
              floorCode: "b1",
            },
          },
        ],
      },
    });

    cy.get("main").get("select").get("option").should("have.length", 3);
    cy.get("main").get("select").get("option").contains("ISEP Guard");
    cy.get("main").get("select").get("option").contains("ISEP Delivery Guy");
  });

  it("should be able to select a device", () => {
    cy.intercept("GET", BASE_URL + "/devices/robots?limit=1000&page=1", {
      statusCode: 200,
      body: {
        data: [
          {
            id: "9ca683d6-178f-4991-9b90-6c7a3bdb9659",
            code: "guard",
            nickname: "ISEP Guard",
            description: "ISEP Security Guard",
            serialNumber: "RBT1",
            modelCode: "SRV",
            isAvailable: true,
            initialCoordinates: {
              width: 7,
              depth: 21,
              floorCode: "b1",
            },
          },
        ],
      },
    });

    cy.get("main").get("select").get("option").should("have.length", 2);
    cy.get("main").get("select").get("option").contains("ISEP Guard");

    cy.get("main").get("select").select("ISEP Guard");

    cy.get("main")
      .get("select")
      .should("have.value", "9ca683d6-178f-4991-9b90-6c7a3bdb9659");
  });

  it("should update with device tasks on select", () => {
    cy.intercept(
      "GET",
      BASE_URL + "/tasks?deviceId=9ca683d6-178f-4991-9b90-6c7a3bdb9659",
      {
        statusCode: 200,
        body: {
          data: [
            {
              userName: "User Example",
              phoneNumber: "912345678",
              floorId: "b2",
              description: "dd",
              id: "2b1bc720-9591-48f0-b6fb-664fa4d06d3e",
              createdAt: "12/31/2023 6:40:44PM",
              requestId: "87670624-074c-4067-94e6-ded442b4a785",
              deviceId: "9ca683d6-178f-4991-9b90-6c7a3bdb9659",
              type: "surveillance",
              startCoordinateX: 5,
              startCoordinateY: 21,
              endCoordinateX: 6,
              endCoordinateY: 13,
              userId: "09fff705-5635-41ea-a5f8-a841b707406d",
              user: {
                id: "09fff705-5635-41ea-a5f8-a841b707406d",
                firstName: "Admin",
                lastName: "Admin",
                email: "admin@isep.ipp.pt",
                phoneNumber: "912345678",
                password: "",
                role: "admin",
                state: "active",
              },
              device: {
                id: "9ca683d6-178f-4991-9b90-6c7a3bdb9659",
                code: "guard",
                nickname: "ISEP Guard",
                description: "ISEP Security Guard",
                serialNumber: "RBT1",
                modelCode: "SRV",
                isAvailable: true,
                initialCoordinates: {
                  width: 7,
                  depth: 21,
                  floorCode: "b1",
                },
              },
            },
            {
              description: "fads",
              pickupUserName: "User Example",
              deliveryUserName: "dd",
              pickupUserPhoneNumber: "912345678",
              deliveryUserPhoneNumber: "ff",
              pickupRoomId: "B103",
              deliveryRoomId: "B105",
              confirmationCode: "1234",
              startFloorCode: "b1",
              endFloorCode: "b1",
              id: "87df9b39-d8c5-483a-9b42-8ead9fdcf247",
              createdAt: "12/31/2023 6:40:49PM",
              requestId: "44cf1632-7cde-4210-96ba-a53c535521f0",
              deviceId: "9ca683d6-178f-4991-9b90-6c7a3bdb9659",
              type: "pick_delivery",
              startCoordinateX: 7,
              startCoordinateY: 17,
              endCoordinateX: 5,
              endCoordinateY: 20,
              userId: "09fff705-5635-41ea-a5f8-a841b707406d",
              user: {
                id: "09fff705-5635-41ea-a5f8-a841b707406d",
                firstName: "Admin",
                lastName: "Admin",
                email: "admin@isep.ipp.pt",
                phoneNumber: "912345678",
                password: "",
                role: "admin",
                state: "active",
              },
              device: {
                id: "9ca683d6-178f-4991-9b90-6c7a3bdb9659",
                code: "guard",
                nickname: "ISEP Guard",
                description: "ISEP Security Guard",
                serialNumber: "RBT1",
                modelCode: "SRV",
                isAvailable: true,
                initialCoordinates: {
                  width: 7,
                  depth: 21,
                  floorCode: "b1",
                },
              },
            },
          ],
        },
      }
    );

    cy.intercept("GET", BASE_URL + "/devices/robots?limit=1000&page=1", {
      statusCode: 200,
      body: {
        data: [
          {
            id: "9ca683d6-178f-4991-9b90-6c7a3bdb9659",
            code: "guard",
            nickname: "ISEP Guard",
            description: "ISEP Security Guard",
            serialNumber: "RBT1",
            modelCode: "SRV",
            isAvailable: true,
            initialCoordinates: {
              width: 7,
              depth: 21,
              floorCode: "b1",
            },
          },
        ],
      },
    });

    cy.get("main").get("select").get("option").should("have.length", 2);
    cy.get("main").get("select").get("option").contains("ISEP Guard");

    cy.get("main").get("select").select("ISEP Guard");

    cy.get("main").get("section#tasks").get("article").should("have.length", 2);
  });

  it("should not be able to generate sequence with 2 tasks", () => {
    cy.intercept(
      "GET",
      BASE_URL + "/tasks?deviceId=9ca683d6-178f-4991-9b90-6c7a3bdb9659",
      {
        statusCode: 200,
        body: {
          data: [
            {
              userName: "User Example",
              phoneNumber: "912345678",
              floorId: "b2",
              description: "dd",
              id: "2b1bc720-9591-48f0-b6fb-664fa4d06d3e",
              createdAt: "12/31/2023 6:40:44PM",
              requestId: "87670624-074c-4067-94e6-ded442b4a785",
              deviceId: "9ca683d6-178f-4991-9b90-6c7a3bdb9659",
              type: "surveillance",
              startCoordinateX: 5,
              startCoordinateY: 21,
              endCoordinateX: 6,
              endCoordinateY: 13,
              userId: "09fff705-5635-41ea-a5f8-a841b707406d",
              user: {
                id: "09fff705-5635-41ea-a5f8-a841b707406d",
                firstName: "Admin",
                lastName: "Admin",
                email: "admin@isep.ipp.pt",
                phoneNumber: "912345678",
                password: "",
                role: "admin",
                state: "active",
              },
              device: {
                id: "9ca683d6-178f-4991-9b90-6c7a3bdb9659",
                code: "guard",
                nickname: "ISEP Guard",
                description: "ISEP Security Guard",
                serialNumber: "RBT1",
                modelCode: "SRV",
                isAvailable: true,
                initialCoordinates: {
                  width: 7,
                  depth: 21,
                  floorCode: "b1",
                },
              },
            },
            {
              description: "fads",
              pickupUserName: "User Example",
              deliveryUserName: "dd",
              pickupUserPhoneNumber: "912345678",
              deliveryUserPhoneNumber: "ff",
              pickupRoomId: "B103",
              deliveryRoomId: "B105",
              confirmationCode: "1234",
              startFloorCode: "b1",
              endFloorCode: "b1",
              id: "87df9b39-d8c5-483a-9b42-8ead9fdcf247",
              createdAt: "12/31/2023 6:40:49PM",
              requestId: "44cf1632-7cde-4210-96ba-a53c535521f0",
              deviceId: "9ca683d6-178f-4991-9b90-6c7a3bdb9659",
              type: "pick_delivery",
              startCoordinateX: 7,
              startCoordinateY: 17,
              endCoordinateX: 5,
              endCoordinateY: 20,
              userId: "09fff705-5635-41ea-a5f8-a841b707406d",
              user: {
                id: "09fff705-5635-41ea-a5f8-a841b707406d",
                firstName: "Admin",
                lastName: "Admin",
                email: "admin@isep.ipp.pt",
                phoneNumber: "912345678",
                password: "",
                role: "admin",
                state: "active",
              },
              device: {
                id: "9ca683d6-178f-4991-9b90-6c7a3bdb9659",
                code: "guard",
                nickname: "ISEP Guard",
                description: "ISEP Security Guard",
                serialNumber: "RBT1",
                modelCode: "SRV",
                isAvailable: true,
                initialCoordinates: {
                  width: 7,
                  depth: 21,
                  floorCode: "b1",
                },
              },
            },
          ],
        },
      }
    );

    cy.intercept("GET", BASE_URL + "/devices/robots?limit=1000&page=1", {
      statusCode: 200,
      body: {
        data: [
          {
            id: "9ca683d6-178f-4991-9b90-6c7a3bdb9659",
            code: "guard",
            nickname: "ISEP Guard",
            description: "ISEP Security Guard",
            serialNumber: "RBT1",
            modelCode: "SRV",
            isAvailable: true,
            initialCoordinates: {
              width: 7,
              depth: 21,
              floorCode: "b1",
            },
          },
        ],
      },
    });

    cy.get("main").get("select").get("option").should("have.length", 2);
    cy.get("main").get("select").get("option").contains("ISEP Guard");

    cy.get("main").get("select").select("ISEP Guard");
    cy.get("main").get("button[name=generate]").should("be.disabled");
  });

  it("should be able to generate sequence with 3 tasks", () => {
    cy.intercept(
      "GET",
      BASE_URL + "/tasks?deviceId=9ca683d6-178f-4991-9b90-6c7a3bdb9659",
      {
        statusCode: 200,
        body: {
          data: [
            {
              userName: "User Example",
              phoneNumber: "912345678",
              floorId: "b2",
              description: "dd",
              id: "2b1bc720-9591-48f0-b6fb-664fa4d06d3e",
              createdAt: "12/31/2023 6:40:44PM",
              requestId: "87670624-074c-4067-94e6-ded442b4a785",
              deviceId: "9ca683d6-178f-4991-9b90-6c7a3bdb9659",
              type: "surveillance",
              startCoordinateX: 5,
              startCoordinateY: 21,
              endCoordinateX: 6,
              endCoordinateY: 13,
              userId: "09fff705-5635-41ea-a5f8-a841b707406d",
              user: {
                id: "09fff705-5635-41ea-a5f8-a841b707406d",
                firstName: "Admin",
                lastName: "Admin",
                email: "admin@isep.ipp.pt",
                phoneNumber: "912345678",
                password: "",
                role: "admin",
                state: "active",
              },
              device: {
                id: "9ca683d6-178f-4991-9b90-6c7a3bdb9659",
                code: "guard",
                nickname: "ISEP Guard",
                description: "ISEP Security Guard",
                serialNumber: "RBT1",
                modelCode: "SRV",
                isAvailable: true,
                initialCoordinates: {
                  width: 7,
                  depth: 21,
                  floorCode: "b1",
                },
              },
            },
            {
              userName: "User Example",
              phoneNumber: "912345678",
              floorId: "b2",
              description: "dd",
              id: "2b1bc720-9591-48f0-b6fb-664fa4d06d3e",
              createdAt: "12/31/2023 6:40:44PM",
              requestId: "87670624-074c-4067-94e6-ded442b4a785",
              deviceId: "9ca683d6-178f-4991-9b90-6c7a3bdb9659",
              type: "surveillance",
              startCoordinateX: 5,
              startCoordinateY: 21,
              endCoordinateX: 6,
              endCoordinateY: 13,
              userId: "09fff705-5635-41ea-a5f8-a841b707406d",
              user: {
                id: "09fff705-5635-41ea-a5f8-a841b707406d",
                firstName: "Admin",
                lastName: "Admin",
                email: "admin@isep.ipp.pt",
                phoneNumber: "912345678",
                password: "",
                role: "admin",
                state: "active",
              },
              device: {
                id: "9ca683d6-178f-4991-9b90-6c7a3bdb9659",
                code: "guard",
                nickname: "ISEP Guard",
                description: "ISEP Security Guard",
                serialNumber: "RBT1",
                modelCode: "SRV",
                isAvailable: true,
                initialCoordinates: {
                  width: 7,
                  depth: 21,
                  floorCode: "b1",
                },
              },
            },
            {
              description: "fads",
              pickupUserName: "User Example",
              deliveryUserName: "dd",
              pickupUserPhoneNumber: "912345678",
              deliveryUserPhoneNumber: "ff",
              pickupRoomId: "B103",
              deliveryRoomId: "B105",
              confirmationCode: "1234",
              startFloorCode: "b1",
              endFloorCode: "b1",
              id: "87df9b39-d8c5-483a-9b42-8ead9fdcf247",
              createdAt: "12/31/2023 6:40:49PM",
              requestId: "44cf1632-7cde-4210-96ba-a53c535521f0",
              deviceId: "9ca683d6-178f-4991-9b90-6c7a3bdb9659",
              type: "pick_delivery",
              startCoordinateX: 7,
              startCoordinateY: 17,
              endCoordinateX: 5,
              endCoordinateY: 20,
              userId: "09fff705-5635-41ea-a5f8-a841b707406d",
              user: {
                id: "09fff705-5635-41ea-a5f8-a841b707406d",
                firstName: "Admin",
                lastName: "Admin",
                email: "admin@isep.ipp.pt",
                phoneNumber: "912345678",
                password: "",
                role: "admin",
                state: "active",
              },
              device: {
                id: "9ca683d6-178f-4991-9b90-6c7a3bdb9659",
                code: "guard",
                nickname: "ISEP Guard",
                description: "ISEP Security Guard",
                serialNumber: "RBT1",
                modelCode: "SRV",
                isAvailable: true,
                initialCoordinates: {
                  width: 7,
                  depth: 21,
                  floorCode: "b1",
                },
              },
            },
          ],
        },
      }
    );

    cy.intercept("GET", BASE_URL + "/devices/robots?limit=1000&page=1", {
      statusCode: 200,
      body: {
        data: [
          {
            id: "9ca683d6-178f-4991-9b90-6c7a3bdb9659",
            code: "guard",
            nickname: "ISEP Guard",
            description: "ISEP Security Guard",
            serialNumber: "RBT1",
            modelCode: "SRV",
            isAvailable: true,
            initialCoordinates: {
              width: 7,
              depth: 21,
              floorCode: "b1",
            },
          },
        ],
      },
    });

    cy.get("main").get("select").get("option").should("have.length", 2);
    cy.get("main").get("select").get("option").contains("ISEP Guard");

    cy.get("main").get("select").select("ISEP Guard");
    cy.get("main").get("button[name=generate]").should("not.be.disabled");
  });

  it("should generate sequence", () => {
    cy.intercept("GET", BASE_URL + "/devices/robots?limit=1000&page=1", {
      statusCode: 200,
      body: {
        data: [
          {
            id: "9ca683d6-178f-4991-9b90-6c7a3bdb9659",
            code: "guard",
            nickname: "ISEP Guard",
            description: "ISEP Security Guard",
            serialNumber: "RBT1",
            modelCode: "SRV",
            isAvailable: true,
            initialCoordinates: {
              width: 7,
              depth: 21,
              floorCode: "b1",
            },
          },
        ],
      },
    });

    cy.intercept(
      "GET",
      BASE_URL +
        "/tasks/sequence?deviceId=9ca683d6-178f-4991-9b90-6c7a3bdb9659",
      {
        statusCode: 200,
        body: {
          tasks: [
            {
              id: "87df9b39-d8c5-483a-9b42-8ead9fdcf247",
              startCoordinateX: 7,
              startCoordinateY: 17,
              endCoordinateX: 5,
              endCoordinateY: 20,
              description: "fads",
              type: "pick_delivery",
              endFloorCode: "b1",
              startFloorCode: "b1",
              userId: "09fff705-5635-41ea-a5f8-a841b707406d",
              deviceId: "9ca683d6-178f-4991-9b90-6c7a3bdb9659",
              requestedAt: "12/31/2023 6:40:49PM",
              user: {
                id: "09fff705-5635-41ea-a5f8-a841b707406d",
                firstName: "Admin",
                lastName: "Admin",
                email: "admin@isep.ipp.pt",
                phoneNumber: "912345678",
                password: "",
                role: "admin",
                state: "active",
              },
              device: {
                id: "9ca683d6-178f-4991-9b90-6c7a3bdb9659",
                code: "guard",
                nickname: "ISEP Guard",
                description: "ISEP Security Guard",
                serialNumber: "RBT1",
                modelCode: "SRV",
                isAvailable: true,
                initialCoordinates: {
                  width: 7,
                  depth: 21,
                  floorCode: "b1",
                },
              },
            },
            {
              id: "2b1bc720-9591-48f0-b6fb-664fa4d06d3e",
              startCoordinateX: 5,
              startCoordinateY: 21,
              endCoordinateX: 6,
              endCoordinateY: 13,
              description: "dd",
              type: "surveillance",
              endFloorCode: "b2",
              startFloorCode: "b2",
              userId: "09fff705-5635-41ea-a5f8-a841b707406d",
              deviceId: "9ca683d6-178f-4991-9b90-6c7a3bdb9659",
              requestedAt: "12/31/2023 6:40:44PM",
              user: {
                id: "09fff705-5635-41ea-a5f8-a841b707406d",
                firstName: "Admin",
                lastName: "Admin",
                email: "admin@isep.ipp.pt",
                phoneNumber: "912345678",
                password: "",
                role: "admin",
                state: "active",
              },
              device: {
                id: "9ca683d6-178f-4991-9b90-6c7a3bdb9659",
                code: "guard",
                nickname: "ISEP Guard",
                description: "ISEP Security Guard",
                serialNumber: "RBT1",
                modelCode: "SRV",
                isAvailable: true,
                initialCoordinates: {
                  width: 7,
                  depth: 21,
                  floorCode: "b1",
                },
              },
            },
            {
              id: "99be70bf-5551-401d-ab5f-da9b1a98f18b",
              startCoordinateX: 6,
              startCoordinateY: 13,
              endCoordinateX: 5,
              endCoordinateY: 21,
              description: "dad",
              type: "surveillance",
              endFloorCode: "b2",
              startFloorCode: "b2",
              userId: "09fff705-5635-41ea-a5f8-a841b707406d",
              deviceId: "9ca683d6-178f-4991-9b90-6c7a3bdb9659",
              requestedAt: "12/31/2023 6:40:41PM",
              user: {
                id: "09fff705-5635-41ea-a5f8-a841b707406d",
                firstName: "Admin",
                lastName: "Admin",
                email: "admin@isep.ipp.pt",
                phoneNumber: "912345678",
                password: "",
                role: "admin",
                state: "active",
              },
              device: {
                id: "9ca683d6-178f-4991-9b90-6c7a3bdb9659",
                code: "guard",
                nickname: "ISEP Guard",
                description: "ISEP Security Guard",
                serialNumber: "RBT1",
                modelCode: "SRV",
                isAvailable: true,
                initialCoordinates: {
                  width: 7,
                  depth: 21,
                  floorCode: "b1",
                },
              },
            },
          ],
          time: 77.48528137423857,
          path: {
            "87df9b39-d8c5-483a-9b42-8ead9fdcf247": [
              {
                floor: "b1",
                x: 7,
                y: 17,
              },
              {
                floor: "b1",
                x: 6,
                y: 17,
              },
              {
                floor: "b1",
                x: 6,
                y: 18,
              },
              {
                floor: "b1",
                x: 6,
                y: 19,
              },
              {
                floor: "b1",
                x: 6,
                y: 20,
              },
              {
                floor: "b1",
                x: 5,
                y: 20,
              },
            ],
          },
        },
      }
    );

    cy.intercept(
      "GET",
      BASE_URL + "/tasks?deviceId=9ca683d6-178f-4991-9b90-6c7a3bdb9659",
      {
        statusCode: 200,
        body: {
          data: [
            {
              userName: "User Example",
              phoneNumber: "912345678",
              floorId: "b2",
              description: "dd",
              id: "2b1bc720-9591-48f0-b6fb-664fa4d06d3e",
              createdAt: "12/31/2023 6:40:44PM",
              requestId: "87670624-074c-4067-94e6-ded442b4a785",
              deviceId: "9ca683d6-178f-4991-9b90-6c7a3bdb9659",
              type: "surveillance",
              startCoordinateX: 5,
              startCoordinateY: 21,
              endCoordinateX: 6,
              endCoordinateY: 13,
              userId: "09fff705-5635-41ea-a5f8-a841b707406d",
              user: {
                id: "09fff705-5635-41ea-a5f8-a841b707406d",
                firstName: "Admin",
                lastName: "Admin",
                email: "admin@isep.ipp.pt",
                phoneNumber: "912345678",
                password: "",
                role: "admin",
                state: "active",
              },
              device: {
                id: "9ca683d6-178f-4991-9b90-6c7a3bdb9659",
                code: "guard",
                nickname: "ISEP Guard",
                description: "ISEP Security Guard",
                serialNumber: "RBT1",
                modelCode: "SRV",
                isAvailable: true,
                initialCoordinates: {
                  width: 7,
                  depth: 21,
                  floorCode: "b1",
                },
              },
            },
            {
              userName: "User Example",
              phoneNumber: "912345678",
              floorId: "b2",
              description: "dd",
              id: "2b1bc720-9591-48f0-b6fb-664fa4d06d3e",
              createdAt: "12/31/2023 6:40:44PM",
              requestId: "87670624-074c-4067-94e6-ded442b4a785",
              deviceId: "9ca683d6-178f-4991-9b90-6c7a3bdb9659",
              type: "surveillance",
              startCoordinateX: 5,
              startCoordinateY: 21,
              endCoordinateX: 6,
              endCoordinateY: 13,
              userId: "09fff705-5635-41ea-a5f8-a841b707406d",
              user: {
                id: "09fff705-5635-41ea-a5f8-a841b707406d",
                firstName: "Admin",
                lastName: "Admin",
                email: "admin@isep.ipp.pt",
                phoneNumber: "912345678",
                password: "",
                role: "admin",
                state: "active",
              },
              device: {
                id: "9ca683d6-178f-4991-9b90-6c7a3bdb9659",
                code: "guard",
                nickname: "ISEP Guard",
                description: "ISEP Security Guard",
                serialNumber: "RBT1",
                modelCode: "SRV",
                isAvailable: true,
                initialCoordinates: {
                  width: 7,
                  depth: 21,
                  floorCode: "b1",
                },
              },
            },
            {
              description: "fads",
              pickupUserName: "User Example",
              deliveryUserName: "dd",
              pickupUserPhoneNumber: "912345678",
              deliveryUserPhoneNumber: "ff",
              pickupRoomId: "B103",
              deliveryRoomId: "B105",
              confirmationCode: "1234",
              startFloorCode: "b1",
              endFloorCode: "b1",
              id: "87df9b39-d8c5-483a-9b42-8ead9fdcf247",
              createdAt: "12/31/2023 6:40:49PM",
              requestId: "44cf1632-7cde-4210-96ba-a53c535521f0",
              deviceId: "9ca683d6-178f-4991-9b90-6c7a3bdb9659",
              type: "pick_delivery",
              startCoordinateX: 7,
              startCoordinateY: 17,
              endCoordinateX: 5,
              endCoordinateY: 20,
              userId: "09fff705-5635-41ea-a5f8-a841b707406d",
              user: {
                id: "09fff705-5635-41ea-a5f8-a841b707406d",
                firstName: "Admin",
                lastName: "Admin",
                email: "admin@isep.ipp.pt",
                phoneNumber: "912345678",
                password: "",
                role: "admin",
                state: "active",
              },
              device: {
                id: "9ca683d6-178f-4991-9b90-6c7a3bdb9659",
                code: "guard",
                nickname: "ISEP Guard",
                description: "ISEP Security Guard",
                serialNumber: "RBT1",
                modelCode: "SRV",
                isAvailable: true,
                initialCoordinates: {
                  width: 7,
                  depth: 21,
                  floorCode: "b1",
                },
              },
            },
          ],
        },
      }
    );

    cy.get("main").get("select").get("option").should("have.length", 2);
    cy.get("main").get("select").get("option").contains("ISEP Guard");

    cy.get("main").get("select").select("ISEP Guard");
    cy.get("main").get("button[name=generate]").click();
    cy.get("button.swal-button--confirm").click();

    cy.get("main")
      .get("section#sequence")
      .get("article")
      .should("have.length", 6);
  });
});
