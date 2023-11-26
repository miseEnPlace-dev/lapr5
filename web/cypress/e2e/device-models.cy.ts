const BASE_URL = "http://localhost:4000/api";

describe("Device Models", () => {
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
    cy.get("input[name=Email]").type("fleet@fleet.com");
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
    cy.visit("/device-models");
  });

  it("should be able to list all device models", () => {
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

    cy.get("main").get("h1").should("contain", "Device Models");
    cy.get("div[aria-label=device-models-container")
      .children()
      .should("have.length", 2);
  });

  it("should be able to create a device-models", () => {
    cy.intercept("GET", BASE_URL + "/device-models", {
      statusCode: 200,
      body: [],
    });
    cy.intercept("POST", BASE_URL + "/device-models", {
      statusCode: 201,
      body: {
        building: {
          brand: "DJI",
          capabilities: ["surveillance"],
          code: "SRV",
          name: "Surveillance Master",
          type: "robot",
        },
      },
    });

    cy.get("button[name=create-device-model]").should("contain", "+");
    cy.get("button[name=create-device-model]").click();
    cy.get("section[aria-label=modal-overlay]")
      .get("span")
      .should("contain", "Create Device Model");

    cy.get("input[name=Code]").type("B1");
    cy.get("input[name=Name]").type("Device Model 1");
    cy.get("input[name=Brand]").type("brand");
    cy.get("button[name=surveillance]").click();
    cy.get("button[name=save]").click();

    cy.get("div[class=swal-modal]").should(
      "contain",
      "Device model saved successfully"
    );
  });

  it("should get error when create building fails", () => {
    cy.intercept("GET", BASE_URL + "/device-models", {
      statusCode: 200,
      body: [],
    });
    cy.intercept("POST", BASE_URL + "/device-models", {
      statusCode: 400,
      message: "Error message",
    });

    cy.get("button[name=create-device-model]").click();
    cy.get("input[name=Code]").type("B1");
    cy.get("input[name=Name]").type("Device Model 1");
    cy.get("input[name=Brand]").type("brand");
    cy.get("button[name=surveillance]").click();
    cy.get("button[name=save]").click();

    cy.get("div[class=swal-modal]").should("contain", "Error");
  });
});
