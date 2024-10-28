const { describe, expect, it } = require("@jest/globals");
const User = require("../classes/User.js");

const testUser = new User("test", "pass", 20);

describe("user.login(password)", () => {
  it("logs a user in if the password is correct", () => {
    testUser.login("pass");
    expect(testUser.loggedIn).toBeTruthy();
  });

  it("throws an error if the password is incorrect", () => {});
});

describe("user.logout()", () => {
  it("logs a user out", () => {
    testUser.logout();
    expect(testUser.loggedIn).toBeFalsy();
  });
});
