const BASE_URL = "http://localhost:4000/api";

describe("Task Request", () => {
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
    cy.intercept("GET", BASE_URL + "/task-requests?limit=3&page=1", {
      statusCode: 200,
      body: {
        meta: {
          page: 1,
          limit: 3,
          total: 2,
          totalPages: 1,
        },
        data: [
          {
            userName: "User Example",
            phoneNumber: "912345678",
            floorId: "b2",
            description: "Make it in time",
            id: "bbe96647-0d6c-44d2-b4d3-1cd3f624c4ed",
            type: "surveillance",
            userId: "c7dcd734-66f7-4d9c-8ba2-887923d41401",
            state: "Accepted",
            requestedAt: "1/2/2024 1:33:18 AM",
            startCoordinateX: 6,
            startCoordinateY: 19,
            endCoordinateX: 5,
            endCoordinateY: 21,
            user: {
              id: "c7dcd734-66f7-4d9c-8ba2-887923d41401",
              firstName: "User",
              lastName: "Example",
              email: "user@isep.ipp.pt",
              phoneNumber: "912345678",
              nif: "123456789",
              password: "",
              role: "user",
              state: "active",
            },
          },
          {
            description: "Fragil!",
            pickupUserName: "User Example",
            deliveryUserName: "Joao",
            pickupUserPhoneNumber: "912345678",
            deliveryUserPhoneNumber: "932165487",
            pickupRoomId: "C104",
            deliveryRoomId: "D102",
            confirmationCode: "4826",
            startFloorCode: "c1",
            endFloorCode: "d1",
            id: "b10998eb-dcb4-4ffe-9b1d-0b09c864f7a1",
            type: "pick_delivery",
            userId: "c7dcd734-66f7-4d9c-8ba2-887923d41401",
            state: "Rejected",
            requestedAt: "1/2/2024 1:34:06 AM",
            startCoordinateX: 6,
            startCoordinateY: 7,
            endCoordinateX: 3,
            endCoordinateY: 8,
            user: {
              id: "c7dcd734-66f7-4d9c-8ba2-887923d41401",
              firstName: "User",
              lastName: "Example",
              email: "user@isep.ipp.pt",
              phoneNumber: "912345678",
              nif: "123456789",
              password: "",
              role: "user",
              state: "active",
            },
          },
        ],
      },
    });

    cy.intercept(
      "GET",
      BASE_URL +
        "/devices/robots?filter=task&value=undefined&limit=1000&page=1",
      {
        statusCode: 200,
        body: {
          meta: { total: 0, limit: 1000, page: 1, totalPages: 0 },
          data: [],
        },
      }
    );

    cy.intercept("GET", BASE_URL + "/device-models?limit=1000&page=1", {
      statusCode: 200,
      body: {
        meta: {
          page: 1,
          limit: 1000,
          total: 3,
          totalPages: 1,
        },
        data: [
          {
            brand: "DJI",
            capabilities: ["pick_delivery", "surveillance"],
            code: "ALL",
            name: "All in One Robot",
            type: "robot",
          },
          {
            brand: "DJI",
            capabilities: ["pick_delivery"],
            code: "DLV",
            name: "Delivery Expert",
            type: "robot",
          },
          {
            brand: "DJI",
            capabilities: ["surveillance"],
            code: "SRV",
            name: "Surveillance Master",
            type: "robot",
          },
        ],
      },
    });

    cy.intercept("GET", BASE_URL + "/users?limit=1000&page=1", {
      statusCode: 200,
      body: {
        meta: {
          page: 1,
          limit: 1000,
          total: 5,
          totalPages: 1,
        },
        data: [
          {
            id: "a6f85eed-e222-4d4c-933e-f969885d127f",
            firstName: "Admin",
            lastName: "Admin",
            email: "admin@isep.ipp.pt",
            phoneNumber: "912345678",
            password: "",
            role: "admin",
            state: "active",
          },
          {
            id: "905f8ccc-3f75-4323-aa4a-d73aa2ec2e4a",
            firstName: "Campus",
            lastName: "Manager",
            email: "campus@isep.ipp.pt",
            phoneNumber: "912345678",
            password: "",
            role: "campus",
            state: "active",
          },
          {
            id: "a3c89095-a43f-4860-b6ee-a0d2e18e03b6",
            firstName: "Fleet",
            lastName: "Manager",
            email: "fleet@isep.ipp.pt",
            phoneNumber: "912345678",
            password: "",
            role: "fleet",
            state: "active",
          },
          {
            id: "5102da1c-e507-4d11-b45e-92132d58d925",
            firstName: "Task",
            lastName: "Manager",
            email: "task@isep.ipp.pt",
            phoneNumber: "912345678",
            password: "",
            role: "task",
            state: "active",
          },
          {
            id: "c7dcd734-66f7-4d9c-8ba2-887923d41401",
            firstName: "User",
            lastName: "Example",
            email: "user@isep.ipp.pt",
            phoneNumber: "912345678",
            nif: "123456789",
            password: "",
            role: "user",
            state: "active",
          },
        ],
      },
    });

    cy.visit("/task-requests");
  });

  it("should list requests by state", () => {
    cy.intercept(
      "GET",
      BASE_URL + "/task-requests?filter=state&value=Accepted&limit=3&page=1",
      {
        statusCode: 200,
        body: {
          meta: {
            page: 1,
            limit: 3,
            total: 1,
            totalPages: 1,
          },
          data: [
            {
              userName: "User Example",
              phoneNumber: "912345678",
              floorId: "b2",
              description: "Make it in time",
              id: "bbe96647-0d6c-44d2-b4d3-1cd3f624c4ed",
              type: "surveillance",
              userId: "c7dcd734-66f7-4d9c-8ba2-887923d41401",
              state: "Accepted",
              requestedAt: "1/2/2024 1:33:18 AM",
              startCoordinateX: 6,
              startCoordinateY: 19,
              endCoordinateX: 5,
              endCoordinateY: 21,
              user: {
                id: "c7dcd734-66f7-4d9c-8ba2-887923d41401",
                firstName: "User",
                lastName: "Example",
                email: "user@isep.ipp.pt",
                phoneNumber: "912345678",
                nif: "123456789",
                password: "",
                role: "user",
                state: "active",
              },
            },
          ],
        },
      }
    );

    cy.get("button[name=filterByState]").click();
    cy.get("select[name=State]").select("Accepted");
    cy.get("button[name=listFilter]").click();

    cy.get("div[aria-label=tasks-container").should("have.length", 1);
  });

  it("should show message when there are no requests by state", () => {
    cy.intercept(
      "GET",
      BASE_URL + "/task-requests?filter=state&value=Accepted&limit=3&page=1",
      {
        statusCode: 200,
        body: {
          meta: {
            page: 1,
            limit: 3,
            total: 0,
            totalPages: 0,
          },
          data: [],
        },
      }
    );

    cy.get("button[name=filterByState]").click();
    cy.get("select[name=State]").select("Accepted");
    cy.get("button[name=listFilter]").click();

    cy.get("p[aria-label=noResults").should(
      "contain",
      "No results were found for your search... Try to change or remove the filters."
    );
  });

  it("should list requests by userId", () => {
    cy.intercept(
      "GET",
      BASE_URL +
        "/task-requests?user=c7dcd734-66f7-4d9c-8ba2-887923d41401&limit=3&page=1",
      {
        statusCode: 200,
        body: {
          meta: {
            page: 1,
            limit: 3,
            total: 1,
            totalPages: 1,
          },
          data: [
            {
              userName: "User Example",
              phoneNumber: "912345678",
              floorId: "b2",
              description: "Make it in time",
              id: "bbe96647-0d6c-44d2-b4d3-1cd3f624c4ed",
              type: "surveillance",
              userId: "c7dcd734-66f7-4d9c-8ba2-887923d41401",
              state: "Accepted",
              requestedAt: "1/2/2024 1:33:18 AM",
              startCoordinateX: 6,
              startCoordinateY: 19,
              endCoordinateX: 5,
              endCoordinateY: 21,
              user: {
                id: "c7dcd734-66f7-4d9c-8ba2-887923d41401",
                firstName: "User",
                lastName: "Example",
                email: "user@isep.ipp.pt",
                phoneNumber: "912345678",
                nif: "123456789",
                password: "",
                role: "user",
                state: "active",
              },
            },
          ],
        },
      }
    );

    cy.get("button[name=filterByUser]").click();
    cy.get("select[name=User]").select("User Example");
    cy.get("button[name=listFilter]").click();

    cy.get("div[aria-label=tasks-container").should("have.length", 1);
  });

  it("should show message when there are no requests by state", () => {
    cy.intercept(
      "GET",
      BASE_URL +
        "/task-requests?user=5102da1c-e507-4d11-b45e-92132d58d925&limit=3&page=1",
      {
        statusCode: 200,
        body: {
          meta: {
            page: 1,
            limit: 3,
            total: 0,
            totalPages: 0,
          },
          data: [],
        },
      }
    );

    cy.get("button[name=filterByUser]").click();
    cy.get("select[name=User]").select("Task Manager");
    cy.get("button[name=listFilter]").click();

    cy.get("p[aria-label=noResults").should(
      "contain",
      "No results were found for your search... Try to change or remove the filters."
    );
  });

  it("should list requests by Device Model", () => {
    cy.intercept("GET", BASE_URL + "/device-models/DLV", {
      statusCode: 200,
      body: {
        brand: "DJI",
        capabilities: ["pick_delivery"],
        code: "DLV",
        name: "Delivery Expert",
        type: "robot",
      },
    });

    cy.intercept(
      "GET",
      BASE_URL + "/task-requests/pick-delivery?limit=3&page=1",
      {
        statusCode: 200,
        body: {
          meta: {
            page: 1,
            limit: 3,
            total: 1,
            totalPages: 1,
          },
          data: [
            {
              userName: "User Example",
              phoneNumber: "912345678",
              floorId: "b2",
              description: "Make it in time",
              id: "bbe96647-0d6c-44d2-b4d3-1cd3f624c4ed",
              type: "surveillance",
              userId: "c7dcd734-66f7-4d9c-8ba2-887923d41401",
              state: "Accepted",
              requestedAt: "1/2/2024 1:33:18 AM",
              startCoordinateX: 6,
              startCoordinateY: 19,
              endCoordinateX: 5,
              endCoordinateY: 21,
              user: {
                id: "c7dcd734-66f7-4d9c-8ba2-887923d41401",
                firstName: "User",
                lastName: "Example",
                email: "user@isep.ipp.pt",
                phoneNumber: "912345678",
                nif: "123456789",
                password: "",
                role: "user",
                state: "active",
              },
            },
          ],
        },
      }
    );

    cy.get("button[name=filterByDeviceModel]").click();
    cy.get("select[name=DeviceModel]").select("Delivery Expert");
    cy.get("button[name=listFilter]").click();

    cy.get("div[aria-label=tasks-container").should("have.length", 1);
  });

  it("should show message when there are no requests by Device Model", () => {
    cy.intercept("GET", BASE_URL + "/device-models/DLV", {
      statusCode: 200,
      body: {
        brand: "DJI",
        capabilities: ["pick_delivery"],
        code: "DLV",
        name: "Delivery Expert",
        type: "robot",
      },
    });

    cy.intercept(
      "GET",
      BASE_URL + "/task-requests/pick-delivery?limit=3&page=1",
      {
        statusCode: 200,
        body: {
          meta: {
            page: 1,
            limit: 3,
            total: 0,
            totalPages: 0,
          },
          data: [],
        },
      }
    );

    cy.get("button[name=filterByDeviceModel]").click();
    cy.get("select[name=DeviceModel]").select("Delivery Expert");
    cy.get("button[name=listFilter]").click();

    cy.get("p[aria-label=noResults").should(
      "contain",
      "No results were found for your search... Try to change or remove the filters."
    );
  });
});
