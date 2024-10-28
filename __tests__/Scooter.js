const { describe, expect, it, test } = require("@jest/globals");
const Scooter = require("../classes/Scooter.js");

describe("Scooter Class", () => {
  beforeEach(() => {
    Scooter.nextSerial = 1;
  });
  test("init", () => {
    const scooter = new Scooter("Station A");

    expect(scooter.station).toBe("Station A");
    expect(scooter.user).toBe(null);
    expect(scooter.serial).toBe(1);
    expect(scooter.charge).toBe(100);
    expect(scooter.isBroken).toBe(false);
  });

  test("increment", () => {
    const scooter1 = new Scooter("Station A");
    const scooter2 = new Scooter("Station B");

    expect(scooter1.serial).toBe(1);
    expect(scooter2.serial).toBe(2);
  });
});
