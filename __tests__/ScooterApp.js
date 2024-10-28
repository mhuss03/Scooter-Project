const { describe, expect, it, beforeEach } = require("@jest/globals");
const ScooterApp = require("../classes/ScooterApp.js");

let scooterApp;

beforeEach(() => {
  scooterApp = new ScooterApp();
});

describe("ScooterApp.registerUser(username, password, age)", () => {
  it("registers a new user if old enough", () => {
    const user = scooterApp.registerUser("testUser", "password123", 18);
    expect(scooterApp.registeredUsers["testUser"]).toBe(user);
    expect(user.username).toBe("testUser");
    expect(user.age).toBe(18);
  });

  it("throws an error if too young or already registered", () => {
    expect(() =>
      scooterApp.registerUser("youngUser", "password123", 17)
    ).toThrow("too young to register");
    scooterApp.registerUser("existingUser", "password123", 20);
    expect(() =>
      scooterApp.registerUser("existingUser", "newPassword", 25)
    ).toThrow("already registered");
  });
});

describe("ScooterApp.loginUser(username, password)", () => {
  it("logs in a registered user", () => {
    scooterApp.registerUser("testUser", "password123", 20);
    scooterApp.loginUser("testUser", "password123");
    expect(scooterApp.registeredUsers["testUser"].loggedIn).toBe(true);
  });

  it("throws an error if user not found or password incorrect", () => {
    expect(() =>
      scooterApp.loginUser("nonExistentUser", "password123")
    ).toThrow("Username or password is incorrect");
    scooterApp.registerUser("testUser", "password123", 20);
    expect(() => scooterApp.loginUser("testUser", "wrongPassword")).toThrow(
      "Username or password is incorrect"
    );
  });
});

describe("ScooterApp.logoutUser(username)", () => {
  it("logs out a registered user", () => {
    scooterApp.registerUser("testUser", "password123", 20);
    scooterApp.loginUser("testUser", "password123");
    scooterApp.logoutUser("testUser");
    expect(scooterApp.registeredUsers["testUser"].loggedIn).toBe(false);
  });

  it("throws an error if user not found", () => {
    expect(() => scooterApp.logoutUser("nonExistentUser")).toThrow(
      "no such user is logged in"
    );
  });
});

describe("ScooterApp.createScooter(station)", () => {
  it("creates a new scooter and adds it to ScooterApp.stations", () => {
    const scooter = scooterApp.createScooter("Station A");
    expect(scooterApp.stations["Station A"]).toContain(scooter);
    expect(scooter.station).toBe("Station A");
  });

  it("throws an error if a station does not exist", () => {
    expect(() => scooterApp.createScooter("Non-existent Station")).toThrow(
      "no such station"
    );
  });
});

describe("ScooterApp.dockScooter(scooter, station)", () => {
  it("docks a scooter at a station", () => {
    const scooter = scooterApp.createScooter("Station A");
    scooterApp.dockScooter(scooter, "Station B");
    expect(scooterApp.stations["Station B"]).toContain(scooter);
    expect(scooter.station).toBe("Station B");
  });

  it("throws an error if a station does not exist", () => {
    const scooter = scooterApp.createScooter("Station A");
    expect(() =>
      scooterApp.dockScooter(scooter, "Non-existent Station")
    ).toThrow("no such station");
  });

  it("throws an error if a scooter is already at a station", () => {
    const scooter = scooterApp.createScooter("Station A");
    expect(() => scooterApp.dockScooter(scooter, "Station A")).toThrow(
      "scooter already at station"
    );
  });
});

describe("ScooterApp.rentScooter(scooter, user)", () => {
  it("rents a scooter out to a user", () => {
    const user = scooterApp.registerUser("testUser", "password123", 20);
    const scooter = scooterApp.createScooter("Station A");
    scooterApp.rentScooter(scooter, user);
    expect(scooter.user).toBe(user);
    expect(scooterApp.stations["Station A"]).not.toContain(scooter);
  });

  it("throws an error if a scooter is already rented", () => {
    const user1 = scooterApp.registerUser("user1", "password123", 20);
    const user2 = scooterApp.registerUser("user2", "password456", 25);
    const scooter = scooterApp.createScooter("Station A");
    scooterApp.rentScooter(scooter, user1);
    expect(() => scooterApp.rentScooter(scooter, user2)).toThrow(
      "scooter already rented"
    );
  });
});
