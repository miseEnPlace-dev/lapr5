const BASE_URL = "http://localhost:4000/api";

describe("Device", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.viewport(1920, 1080);
    cy.intercept("POST", BASE_URL + "/users/login", {
      statusCode: 200,
      body: {
        userDTO: {
          firstName: "Fleeet",
          lastName: "Fleeet",
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
        firstName: "Fleeet",
        lastName: "Fleeet",
        role: "fleet",
      },
    });
    cy.visit("/devices/robots/PA");
  });

  it("should be able to deactivate a device", () => {
    cy.intercept("GET", BASE_URL + "/devices/PA", {
      statusCode: 200,
      body: {
        code: "PA",
        nickname: "Nickname7",
        description: "Descricao",
        serialNumber: "9",
        modelCode: "4",
        isAvailable: true,
      },
    });

    cy.intercept("GET", BASE_URL + "/device-models", {
      statusCode: 200,
      body: [
        {
          code: "4",
          description: "Descricao",
          brand: "Marca",
          isAvailable: true,
        },
      ],
    });

    cy.intercept("PATCH", BASE_URL + "/devices/PA", {
      statusCode: 200,
      body: {
        code: "PA",
        nickname: "Nickname7",
        description: "Descricao",
        serialNumber: "9",
        modelCode: "4",
        isAvailable: false,
      },
    });

    cy.get("button[name=inhibitDevice]").click();

    cy.get("div[class=swal-modal]").should(
      "contain",
      "Status of the Device changed successfully"
    );
  });

  it("should be able to activate a device", () => {
    cy.intercept("GET", BASE_URL + "/devices/PA", {
      statusCode: 200,
      body: {
        code: "PA",
        nickname: "Nickname7",
        description: "Descricao",
        serialNumber: "9",
        modelCode: "4",
        isAvailable: false,
      },
    });
    cy.intercept("GET", BASE_URL + "/device-models", {
      statusCode: 200,
      body: [
        {
          code: "4",
          description: "Descricao",
          brand: "Marca",
          isAvailable: true,
        },
      ],
    });
    cy.intercept("PATCH", BASE_URL + "/devices/PA", {
      statusCode: 200,
      body: {
        code: "PA",
        nickname: "Nickname7",
        description: "Descricao",
        serialNumber: "9",
        modelCode: "4",
        isAvailable: true,
      },
    });

    cy.get("button[name=inhibitDevice]").click();

    cy.get("div[class=swal-modal]").should(
      "contain",
      "Status of the Device changed successfully"
    );
  });
});
