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
    cy.intercept("GET", BASE_URL + "/tasks", {
      statusCode: 200,
      body: {},
    });

    cy.get("main").get("a").click();
    cy.url().should("include", "/task-requests");
  });

  it("should have all devices in select", () => {
    cy.intercept("GET", BASE_URL + "/devices/robots", {
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

    cy.get("main").get("select").should("have.length", 2);
    cy.get("main").get("select").eq(0).should("contain", "b1");
  });
});
