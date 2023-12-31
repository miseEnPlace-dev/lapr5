const BASE_URL = "http://localhost:4000/api";

describe("Devices", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.intercept("POST", BASE_URL + "/users/login", {
      statusCode: 200,
      body: {
        userDTO: {
          firstName: "Fleet",
          lastName: "Fleet",
          role: "fleet",
        },
      },
    });
    cy.get("input[name=Email]").type("fleet@isep.ipp.pt");
    cy.get("input[name=Password]").type("fleet");
    cy.get("button[name=login]").click();
    localStorage.setItem("token", "token");
    cy.intercept("GET", BASE_URL + "/me", {
      statusCode: 200,
      body: {
        firstName: "Fleet",
        lastName: "Fleet",
        role: "fleet",
      },
    });
    cy.visit("/devices");
    cy.intercept("GET", BASE_URL + "/device-models", {
      statusCode: 200,
      body: [
        {
          brand: "DJI",
          capabilities: ["surveillance"],
          code: "SRV",
          name: "Surveillance Master",
          type: "robot",
        },
      ],
    });
  });

  it("should be able to list all devices", () => {
    cy.intercept("GET", BASE_URL + "/devices/robots", {
      statusCode: 200,
      body: [
        {
          code: "GUARD",
          nickname: "ISEP Guard",
          description: "ISEP Security Guard",
          serialNumber: "RBT1",
          modelCode: "SRV",
          isAvailable: true,
        },
      ],
    });

    cy.get("main").get("h1").should("contain", "Devices");
    cy.get("div[aria-label=devices-container")
      .children()
      .should("have.length", 4);
  });

  it("should be able to create a device", () => {
    cy.intercept("GET", BASE_URL + "/devices/robots", {
      statusCode: 200,
      body: [
        {
          code: "GUARD",
          nickname: "ISEP Guard",
          description: "ISEP Security Guard",
          serialNumber: "RBT1",
          modelCode: "SRV",
          isAvailable: true,
        },
      ],
    });
    cy.intercept("POST", BASE_URL + "/devices", {
      statusCode: 200,
      body: {
        code: "GUARD",
        nickname: "ISEP Guard",
        description: "ISEP Security Guard",
        serialNumber: "RBT1",
        modelCode: "SRV",
        isAvailable: true,
      },
    });

    cy.get("main").get("h1").should("contain", "Devices");
    cy.get("button[name=createDevice]").should("contain", "+");
    cy.get("button[name=createDevice]").click();
    cy.get("section[aria-label=modal-overlay]")
      .get("span")
      .should("contain", "Create Device");

    cy.get("input[name=Code]").type("GUARD");
    cy.get("input[name=Nickname]").type("Test Robot");
    cy.get("input[name='Serial Number']").type("RBT1");
    cy.get("select").select("SRV");
    // cy.get("textarea[name=Description]").type("description");

    cy.get("button[name=save]").click();

    cy.get("div[class=swal-modal]").should(
      "contain",
      "Device saved successfully"
    );
  });

  it("should be able to get an error when create a device fails", () => {
    cy.intercept("GET", BASE_URL + "/devices/robots", {
      statusCode: 200,
      body: [],
    });
    cy.intercept("POST", BASE_URL + "/devices", {
      statusCode: 400,
      message: "Error message",
    });

    cy.get("main").get("h1").should("contain", "Devices");
    cy.get("button[name=createDevice]").should("contain", "+");
    cy.get("button[name=createDevice]").click();
    cy.get("section[aria-label=modal-overlay]")
      .get("span")
      .should("contain", "Create Device");

    cy.get("input[name=Code]").type("GUARD");
    cy.get("input[name=Nickname]").type("Test Robot");
    cy.get("input[name='Serial Number']").type("RBT1");
    cy.get("select").select("SRV");
    // cy.get("textarea[name=Description]").type("description");

    cy.get("button[name=save]").click();

    cy.get("div[class=swal-modal]").should("contain", "Error");
  });

  it("should be able to filter by capability", () => {
    cy.intercept(
      "GET",
      BASE_URL + "/devices/robots?filter=task&value=pick_delivery",
      {
        statusCode: 200,
        body: [
          {
            code: "GUARD",
            nickname: "ISEP Guard",
            description: "ISEP Security Guard",
            serialNumber: "RBT1",
            modelCode: "SRV",
            isAvailable: true,
          },
          {
            code: "GUARD",
            nickname: "ISEP Guard",
            description: "ISEP Security Guard",
            serialNumber: "RBT1",
            modelCode: "SRV",
            isAvailable: true,
          },
        ],
      }
    );

    cy.get("button[name=filterByTask]").click();
    cy.get("select[name=Task]").select("pick_delivery");

    cy.get("button[name=listfilter]").click();

    cy.get("main").get("h1").should("contain", "Devices");
    cy.get("div[aria-label=devices-container")
      .children()
      .should("have.length", 5);
  });

  it("should be able to filter by model name", () => {
    cy.intercept("GET", BASE_URL + "/devices/robots?filter=model&value=SRV", {
      statusCode: 200,
      body: [
        {
          code: "GUARD",
          nickname: "ISEP Guard",
          description: "ISEP Security Guard",
          serialNumber: "RBT1",
          modelCode: "SRV",
          isAvailable: true,
        },
      ],
    });

    cy.get("button[name=filterByModel]").click();
    cy.get("select[name='Device Model']").select("SRV");

    cy.get("button[name=listfiltermodel]").click();

    cy.get("main").get("h1").should("contain", "Devices");
    cy.get("div[aria-label=devices-container")
      .children()
      .should("have.length", 4);
  });
});
