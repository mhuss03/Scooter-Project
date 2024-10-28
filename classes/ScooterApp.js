const Scooter = require("./Scooter.js");
const User = require("./User.js");

class ScooterApp {
  constructor() {
    this.stations = {
      "Station A": [],
      "Station B": [],
      "Station C": [],
    };
    this.registeredUsers = {};
  }

  registerUser(username, password, age) {
    if (this.registeredUsers[username]) {
      throw new Error("already registered");
    }
    if (age < 18) {
      throw new Error("too young to register");
    }
    const user = new User(username, password, age);
    this.registeredUsers[username] = user;
    console.log("User has been registered");
    return user;
  }

  loginUser(username, password) {
    const user = this.registeredUsers[username];
    if (!user) {
      throw new Error("Username or password is incorrect");
    }
    try {
      user.login(password);
      console.log("User has been logged in");
    } catch (error) {
      throw new Error("Username or password is incorrect");
    }
  }

  logoutUser(username) {
    const user = this.registeredUsers[username];
    if (!user || !user.loggedIn) {
      throw new Error("no such user is logged in");
    }
    user.logout();
    console.log("User is logged out");
  }

  createScooter(station) {
    if (!this.stations[station]) {
      throw new Error("no such station");
    }
    const scooter = new Scooter(station);
    this.stations[station].push(scooter);
    console.log("Created new scooter");
    return scooter;
  }

  dockScooter(scooter, station) {
    if (!this.stations[station]) {
      throw new Error("no such station");
    }
    if (this.stations[station].includes(scooter)) {
      throw new Error("scooter already at station");
    }
    scooter.dock(station);
    this.stations[station].push(scooter);
    console.log("Scooter is docked");
  }

  rentScooter(scooter, user) {
    for (const station in this.stations) {
      const index = this.stations[station].indexOf(scooter);
      if (index !== -1) {
        if (scooter.user) {
          throw new Error("scooter already rented");
        }
        this.stations[station].splice(index, 1);
        scooter.rent(user);
        console.log("Scooter is rented");
        return;
      }
    }
    throw new Error("scooter already rented");
  }

  print() {
    console.log("Registered Users:");
    console.log(Object.keys(this.registeredUsers).join(", "));

    console.log("\nStations and Scooters:");
    for (const [station, scooters] of Object.entries(this.stations)) {
      console.log(`${station}: ${scooters.length} scooter(s)`);
    }
  }
}

module.exports = ScooterApp;
